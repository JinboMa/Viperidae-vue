<template lang="jade">
.workContent(@mouseenter="hover",@mouseleave="mouseout",@click="changeClick",v-loading="loading",element-loading-text="努力加载中")
	el-button.right(type="danger",size="small",v-if="isHover",@click.stop="closeWork") 关闭
	el-button.right(type="primary",size="small",v-if="isHover",@click.stop="toWork",style="margin-right:10px") 编辑
	h3(:title="workMsg.title") {{workMsg.title}}
	span.timeDescription(v-if="isClick") 开始时间
	span.startTime(v-if="isClick") {{formData.start_time}}
	span.timeDescription(v-if="isClick") 结束时间
	span.endTime(v-if="isClick") {{formData.end_time}}
	p.description(v-if="isClick") {{formData.description}}
</template>
<script>
export default {
	props : ["workMsg","workId"],
	data(){
		return{
			isHover : false,
			isClick : false,
			closeData : [],
			loading : false,
			formData : {
				description : '',
				start_time : '',
				end_time : ''
			}
		}
	},
	watch:{
		'isClick': function(isClick){
			isClick && (this.loading = true) && this.ajax(this.setAjax("workDetails",{id : this.workId},this.getSuccess,this.getFail))
		}
	},
	methods : {
		hover(){
			this.isHover = true
		},
		mouseout(){
			this.isHover = false
		},
		toWork(){
			this.$router.push({ path: 'Work', query: { workId: this.workId }})
		},
		closeWork(){
			this.closeData.push(this.workId)
			this.$confirm('确定要关闭当前文章么?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.ajax(this.setAjax("workClose",{ids:this.closeData},this.success,this.fail))
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		success(res){
			this.$emit('resetWorkList')
		},
		fail(res){
			console.log('失败',res)
		},
		changeClick(){
			var isClick = this.isClick
			isClick ? this.isClick = false : this.isClick = true
			return ;
		},
		getSuccess(res){
			this.formData = res
		},
		getFail(res){
			console.log("fail")
		}
	}
}
</script>

<style scoped lang="stylus">
@import '../assets/styl/const.styl'
.workContent
	display block
	width 50%
	margin 0 auto
	// border-bottom 1px solid #f0f0f0
	padding 10px
	cursor pointer
	&:hover
		box-shadow 0 0 5px $LightBlue
.timeDescription
.startTime
.endTime
	color $Sliver
	font-weight bolder
	padding-left 3px
.timeDescription
	margin-right 10px
	font-size 13px
	color $Blue
.startTime
.endTime
	font-size 14px
.startTime
	margin-right 20px
h3
	width 70%
	overflow hidden
	text-overflow ellipsis
	white-space nowrap
	font-size 18px
	color $Sliver
	font-weight 700
	margin-bottom 10px
	height 24px
p.description
	width 100%
	color $ExtraLightBlack
	padding-top 10px
	display -webkit-box
	-webkit-box-orient vertical
	-webkit-line-clamp 1
	overflow hidden
	font-size 14px
</style>
