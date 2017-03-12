<template lang="jade">
.editWorks
	.item(v-for="(work,id) in works",@click="toggle(id)")
		i.el-icon-delete.select(v-show="isCheck(id)")
		span.author {{work.author}}
		span.time {{work.time}}
		span.title(:title="work.title") {{work.title}}
</template>
<script>
export default{
	props:['works','isEdit'],
	data(){
		return{
			delWorks : [],
			selectAll : false
		}
	},
	watch:{
		'delWorks':function(value){
			this.$emit('changeDels',value)
		},
		'isEdit':function(){
			this.delWorks = []
		}
	},
	methods:{
		isCheck(id){
			return (this.delWorks.indexOf(id) != -1)
		},
		toggle(id){
			var isChose = this.isCheck(id)
			if(isChose){
				var index = this.delWorks.indexOf(id)
				this.delWorks.splice(index, 1)
			}else{
				this.delWorks.push(id)
			}
		}
	}
}
</script>
<style scoped lang="stylus">
.editWorks
	max-height 400px
	overflow auto
.item
	cursor pointer
	padding 5px
	border-bottom 1px solid #ccc
	width 400px
	overflow hidden
	text-overflow ellipsis
	white-space nowrap
	margin 0 auto
.select
.author
.time
	margin-right 5px
.author
	color #1F2D3D
	font-weight bolder
.time
	color #F7BA2A
	font-weight bolder
.title
	color #20A0FF
	font-weight bolder
.select
	color red
	float right
.selectAll
	float right
	font-size 12px
</style>