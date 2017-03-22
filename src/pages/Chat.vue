<template lang="jade">
.chat.content
	.contacts.left
		.contactList(v-for="(user,id) in friends",@click="selectFriendId = id",:class="{active:selectFriendId == id}")
			el-badge.userImg(:value="1000",:max="99")
				.div
			span {{user.username}}
	.dialogBox.right(v-for="(friend,id) in friends",v-if="selectFriendId == id")
		.dialogName {{friend.username}}
		.dialogContent
			.row(v-for="msg in friend.messages")
				div(:class="{sendChat:msg.isSend,reseiveChat:!msg.isSend}",v-text="msg.message")
		textarea.dialogEdit(spellcheck="false",v-model="friend.readyMessage.data.message",@keyup.ctrl.enter="sendMessage(id)")
		el-button.send(type='default',size="small",@click="sendMessage(id)") 发送
</template>
<script>
export default{
	data(){
		return{
			WS : {},
			friends : {},
			selectFriendId : null,
			// readyMessage : {
			// 	method : 'send',
			// 	data : {
			// 		id : null,
			// 		message : ''
			// 	}
			// },
		}
	},
	created(){
		this.getFriends()
		this.initWS()
	},
	methods:{
		getFriends(){
			this.ajax(this.setAjax("friends",{},this.getSuccess,this.getFail))
		},
		getSuccess(res){
			for(var i in res){
				res[i].readyMessage = {
					method : 'send',
					data : {
						id : i,
						message : ''
					}
				}
				res[i].messages = []
			}
			this.friends = res
		},
		getFail(res){
			console.log('fail',res)
		},
		sendMessage(id){
			//发送消息
			var todo = ()=>{
				this.friends[id].messages.push({
					isSend : true,
					message : this.friends[id].readyMessage.data.message
				})
				this.WS.send(JSON.stringify(this.friends[id].readyMessage))
				this.friends[id].readyMessage.data.message = ''
			}
			//判断长连接正常
			if(this.WS.readyState != 1){
				this.WS.close()
				this.initWS(todo)
			}else{
				todo()
			}
		},
		initWS(event){
			var token = localStorage.getItem('token')
			if(!token){
				this.$message.warning("还没有登录哦,请先登录")
				this.$router.push({ path : '/Login'})
				return ;
			}
			var WS_URL = this.WS_URL + this.ajaxConfig['chat'].url
			var ws = new WebSocket(WS_URL)
			this.WS = ws
			this.WS.onopen = (e) => {
				this.WS.send(JSON.stringify({
					method : 'online',
					data : {
						token : token
					}
				}))
				this.$message.success('开启连接')
				console.log("开启连接",e)
				event && event()
			}
			this.WS.onmessage = (e) => {
				var receivedMsg = JSON.parse(e.data),
					result = receivedMsg.result,
					message = receivedMsg.message,
					data = receivedMsg.data,
					code = receivedMsg.code
				code == 300 && (this.$message.warning('对方不在线'))
				if(code == 200){
					this.friends[this.selectFriendId].messages.push({
						isSend : false,
						message : data.content
					})
				}
			}
			this.WS.onerror = (e) => {
				this.$message.error('连接错误')
				console.log('连接错误',e)
			}
			this.WS.onclose = (e) => {
				this.$message.info('连接关闭')
				console.log("连接关闭",e)
			}
		}
	}
}
</script>
<style scoped lang="stylus">
@import '../assets/styl/const.styl'
.chat
	height 88%
	margin-top 10px
	border 1px solid $Gray
	border-radius 5px
	background-color $white
.contacts
.dialogBox
	height 100%
.contacts
	position relative
	z-index 10
	width 20%
	background-color $LightGray
	padding 20px 0
	overflow auto
.contactList
	position relative
	width 100%
	font-size 16px
	height 55px
	padding 5px
	color $Black
	cursor pointer
	&:hover
		background $Gray
	&.active
		background $Gray
	span
		display inline-block
		margin 12px 0 0 60px
.userImg
	position absolute
	top 50%
	left 10px
	transform translateY(-50%)
	width 45px
	height 45px
	background-color $Danger
.dialogBox
	width 80%
	position relative
.dialogName
.dialogContent
.dialogEdit
	width 100%
.dialogName
	height 6%
	font-size 18px
	text-align left
	text-indent 10px
	line-height 2
	background $DarkWhite
.dialogContent
	height 70%
	overflow auto
	background-color $ExtraLightGray
	padding 20px
	border-top 1px solid $LightGray
	border-bottom 1px solid $LightGray
.row
	float left
	width 100%
	padding 5px 0
.reseiveChat
.sendChat
	display inline-block
	padding 5px 10px
	max-width 80%
	border-radius 4px
	color black
.reseiveChat
	background-color $White
	float left
.sendChat
	background-color #b7ff89
	float right
textarea.dialogEdit
	padding 10px 20px
	font-size 16px
	border none
	resize none
	height 24%
	overflow auto
	background $DarkWhite
	float left
	white-space pre-wrap
.send
	position absolute
	bottom 10px
	right 20px
</style>