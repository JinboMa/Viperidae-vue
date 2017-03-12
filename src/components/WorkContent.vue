<template lang="jade">
.workContent(@mouseenter="hover",@mouseleave="mouseout",@click="toWork")
	el-button.right(type="danger",size="small",v-if="isHover",@click.stop="closeWork") 关闭
	h3(:title="workMsg.title") {{workMsg.title}}
</template>
<script>
export default {
	props : ["workMsg","workId"],
	data(){
		return{
			isHover : false,
			closeData : []
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
		}
	}
}
</script>

<style scoped lang="stylus">
.workContent
	display block
	width 50%
	margin 0 auto
	border-bottom 1px solid #f0f0f0
	padding 10px
	cursor pointer
	&:hover
		box-shadow 0 0 5px #20A0FF
.authorMsg
	margin-bottom 10px
.authorMsg img
	vertical-align middle
	width 32px
	height @width
	border-radius 50%
	border 1px solid #ddd
.author
	color #333
	font-size 13px
	padding-left 3px
.createTime
	font-size 13px
	color #969696
	padding-left 3px
h3
	width 70%
	overflow hidden
	text-overflow ellipsis
	white-space nowrap
	font-size 18px
	color #969696
	font-weight 700
	margin-bottom 5px
	height 24px
.rate
	display inline-block
	vertical-align middle
	transform scale(0.7,0.7) translateX(-15px)
p
	width 100%
	display -webkit-box
	-webkit-box-orient vertical
	-webkit-line-clamp 1
	overflow hidden
	font-size 13px
</style>
