<template lang="jade">
.chat.content
	.contacts.left
		.contactList 徐肇宁
	.dialogBox.right
		.dialogName 徐肇宁
		.dialogContent
			span.right(v-for="msg in sendMessages",v-text="msg")
			span.left(v-for="msg in getMessages",v-text="msg")
		textarea.dialogEdit(spellcheck="false",v-model="readyMessage")
		el-button.send(type='primary',size="small",@click="sendMessage(readyMessage)") 发送
</template>
<script>
export default{
	data(){
		return{
			WS : {},
			getMessages : [],
			sendMessages : [],
			readyMessage : ''
		}
	},
	created(){
		var token = localStorage.getItem('token')
		if(!token){
			this.$message.warning("还没有登录哦,请先登录")
			this.$router.push({ path : '/Login'})
			return ;
		}
		var WS_URL = this.URL + this.ajaxConfig['chat'].url
		console.log(WS_URL)
		return;
		var ws = new WebSocket(WS_URL)
		this.WS = ws
		this.WS.onopen = (e) => {
			this.WS.send({
				method : 'online',
				data : {
					token : token
				}
			})
			console.log("开启连接",e)
		}
		this.WS.onmessage = (e) => {
			var receivedMsg = e.data
			this.getMessages.push(receivedMsg)
			console.log("数据已接受:",receivedMsg)
		}
		this.WS.onerror = (e) => {
			console.log("连接错误",e)
		}
		this.WS.onclose = (e) => {
			console.log("连接关闭",e)
		}
	},
	methods:{
		sendMessage(value){
			this.WS.send({
				method : 'send',
				data : {
					message : value
				}
			})
		}
	}
}
</script>
<style scoped lang="stylus">
@import '../assets/styl/const.styl'
.chat
	height 90%
	border 1px solid $Black
	background-color $white
.contacts
.dialogBox
	height 100%
	border 1px solid $Danger
.contacts
	width 20%
.contactList
	width 100%
	padding 20px
	font-size 16px
	color $black
	text-align center
	&:hover
		background $ExtraLightGray
	&.active
		background $Gray
.dialogBox
	width 80%
	position relative
.dialogName
.dialogContent
.dialogEdit
	width 100%
	border 1px solid $Warning
.dialogName
	height 10%
	font-size 20px
	text-align left
	text-indent 10px
	line-height 3
.dialogContent
	height 60%
	overflow auto
textarea.dialogEdit
	padding 10px 20px
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