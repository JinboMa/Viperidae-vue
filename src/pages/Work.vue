<template lang="jade">
.work.content(v-loading="loading",element-loading-text="正在提交,请稍等")
	el-row
		el-input.title(v-model="formData.title",placeholder="在此填写标题",:disabled="disableTitle")
	el-row
		.time
			el-date-picker.left(v-model="formData.start_time",placeholder="选择开始日期",:picker-options="startOption")
			el-date-picker.right(v-model="formData.end_time",placeholder="选择结束日期",:picker-options="endOption")
	el-row
		el-input.description(v-model="formData.description",type="textarea",:autosize="{minRows:2,maxRows:10}",placeholder="请输入内容")
	el-button.button.right(type="primary",@click="postMessage") 提交此工作
</div>
</template>

<script>
export default {
	data(){
		return {
			workId : null,
			//表单提交时loading
			disableTitle : false,
			loading : false,
			//表单信息
			formData: {
				id : null,
				title : '',
				description : '',
				start_time : '',
				end_time : ''
			},
			startOption:{
				disabledDate(time){
					return time.getTime() < Date.now() - 8.64e7
				}
			},
			endOption:{
				disabledDate(time){
					return time.getTime() < Date.now() - 8.64e7
				}
			}
		}
	},
	created: function () {
		this.workId = this.$route.query.workId
		this.getMessage()
	},
	methods : {
		//get编辑的blog的信息
		getMessage(){
			if(this.workId || this.workId === 0){
				this.loading = true
				this.disableTitle = true
				this.ajax(this.setAjax("workDetails",{id : this.workId},this.getSuccess,this.getFail))
			}
		},
		getSuccess(res){
			this.formData = res
		},
		getFail(res){
			console.log('失败',res)
		},
		//发送登录请求
		postMessage(){
			this.loading = true
			this.formData.start_time =  this.setDate(this.formData.start_time)
			this.formData.end_time =  this.setDate(this.formData.end_time)
			this.formData.id = this.workId
			if(this.workId || this.workId === 0){
				this.ajax(this.setAjax("workEdit",this.formData,this.success,this.fail))
			}else{
				this.ajax(this.setAjax("workAdd",this.formData,this.success,this.fail))
			}
		},
		setDate(time){
			if(time instanceof Date){
				var year = time.getFullYear(),
					month = time.getMonth() + 1,
					day = time.getDate()
				return `${year}-${month}-${day}`
			}else{
				return time
			}
		},
		//表单验证
		submitForm(formName) {
			
		},
		//提交成功
		success(res){
			this.$router.push('/WorkList')
		},
		//提交失败
		fail(res){
			console.log("失败")
		},
	}
}
</script>

<style scoped lang="stylus">
@import '../assets/styl/const.styl'
.work
	width 100%
	position relative
.button
	position absolute
	top 80%
	right 50%
	transition translateX(-50%)
.title
.description
.time
	display block
	width 800px
	margin 0 auto
.el-row
	padding 10px
.title:before
	content '工作标题'
	display block
	font-weight bolder
	color $LightBlack
	padding 5px
</style>
