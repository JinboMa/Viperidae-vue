<template lang="jade">
.userSetting.content

</template>

<script>
export default {
	data(){
		return {
			//表单提交时loading
			loading : false,
			//表单信息
			formData: {
				username: '',
				password: ''
			},
			//表单规则
			rules: {
				username: [
				{ required: false, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
				{ required: false, message: '请输入密码', trigger: 'blur' },
				{ min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
				]
			}
		}
	},
	methods : {
		//发送登录请求
		postMessage : function(){
			this.ajax(this.setAjax("login",this.formData,this.success,this.fail))
		},
		//表单验证
		submitForm : function(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.loading = true
					this.postMessage()
				} else {
					this.$message.error("请正确填写用户名和密码")
				}
			})
		},
		//提交成功
		success : function(res){
			localStorage.setItem('token',res.token)
			localStorage.setItem('username',res.username)
			this.$emit('login')
			this.$router.go(-1)
		},
		//提交失败
		fail : function(res){
			console.log("失败")
		}
	}
}
</script>

<style scoped lang="stylus">
@import '../assets/styl/const.styl'
</style>
