<template lang="jade">
.chat.content
	.contacts.left
		.contactList(v-for="(user,id) in friends",@click="changeChat(user.username,id)") {{user.username}}
	.dialogBox.right
		.dialogName {{dialogName}}
		.dialogContent
			.row(v-for="msg in messeges")
				div(:class="{sendChat:msg.isSend,reseiveChat:!msg.isSend}",v-text="msg.message")
		textarea.dialogEdit(spellcheck="false",v-model="readyMessage.data.message")
		el-button.send(type='default',size="small",@click="sendMessage") 发送
</template>
<script>
export default{
	data(){
		return{
			WS : {},
			friends : [],
			messeges : [],
			readyMessage : {
				method : 'send',
				data : {
					id : null,
					message : ''
				}
			},
			dialogName : ''
		}
	},
	created(){
		this.initWS()
	},
	methods:{
		sendMessage(){
			//发送消息
			var todo = ()=>{
				this.messeges.push({
					isSend : true,
					message : this.readyMessage.data.message
				})
				this.WS.send(JSON.stringify(this.readyMessage))
				this.readyMessage.data.message = ''
			}
			//判断长连接正常
			if(this.WS.readyState != 1){
				this.WS.close()
				this.initWS(todo)
			}else{
				todo()
			}
		},
		changeChat(user,id){
			this.readyMessage.data.id = id
			this.dialogName = user
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
				code == 100 && (this.friends = data)
				if(code == 200){
					this.messeges.push({
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
	width 20%
	background-color $LightGray
.contactList
	width 100%
	padding 20px
	font-size 16px
	color $black
	text-align center
	cursor pointer
	&:hover
		background $Gray
	&.active
		background $Gray
.dialogBox
	width 80%
	position relative
.dialogName
.dialogContent
.dialogEdit
	width 100%
.dialogName
	height 10%
	font-size 20px
	text-align left
	text-indent 10px
	line-height 3
.dialogContent
	height 60%
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
	height 30%
	overflow auto
	background $DarkWhite
	float left
	white-space pre-wrap
.send
	position absolute
	bottom 10px
	right 20px
</style>