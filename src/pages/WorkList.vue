<template lang="jade">
.workList.content(v-loading="loading",element-loading-text="正在请求,请稍等")
	el-select.selcetWork(v-model="workType" placeholder="请选择工作类型")
		el-option(v-for="item in allWorkType",:label="item.label",:value="item.value")
	el-button.addWork(type="info",@click="toAddWork",plain) 新建
	el-button.editAllWork(type="info",@click="isEdit=true",plain) 编辑
	el-col(:span="24",v-for="(work,item) in formData")
		work-content(:workMsg="work",:workId="item",@resetWorkList="getMessage")
	el-dialog(title="编辑我的工作",v-model="isEdit")
		edit-works(:works="formData",:isEdit="isEdit",@changeDels="changeDels($event)")
		.dialog-footer(slot="footer")
			span.left.prompt 点击选择要关闭的工作
			el-button(@click="isEdit=false") 取 消
			el-button(@click="postCloseWorks") 确 定
</template>
<script>
import WorkContent from '../components/WorkContent'
import EditWorks from '../components/EditWorks'
export default {
	data(){
		return {
			loading : false,
			formData : {
			},
			isEdit : false,
			closeWorks : [],
			allWorkType : [
			{
				label : '本周未关闭',
				value : 0,
			},
			{
				label : '本周所有',
				value : 1,
			},
			{
				label : '今日上线',
				value : 2,
			}],
			workType : 0
		}
	},
	components : {
		WorkContent,
		EditWorks
	},
	created : function(){
		this.getMessage()
	},
	watch:{
		'workType':function(){
			this.getMessage()
		}
	},
	methods : {
		//发送获取博客列表请求
		getMessage(){
			this.loading = true
			this.ajax(this.setAjax("workList",{type : this.workType},this.success,this.fail))
		},
		//获取成功
		success(res){
			this.formData = JSON.parse(JSON.stringify(res))
		},
		//获取失败
		fail(res){
			console.log("失败",res)
		},
		changeDels(value){
			this.closeWorks = value
		},
		postCloseWorks(){
			this.$confirm('确定要关闭所选工作么?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.ajax(this.setAjax("workClose",{ids:this.closeWorks},this.delSuccess,this.delFail))
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消关闭'
				});
			});
		},
		delSuccess(res){
			this.closeWorks = []
			this.getMessage()
			this.isEdit = false
		},
		delFail(res){
			console.log('失败',res)
		},
		toAddWork(){
			this.$router.push({ path: 'Work'})
		}
	}
}
</script>

<style scoped lang="stylus">
.workList
	position relative
	padding 20px
	margin-top 40px
.selcetWork
	width 140px
	display inline-block
	margin 0 60px 20px
.addWork
	float right
	margin-right 60px
.editAllWork
	float right
	margin-right 10px
</style>
