<template lang="jade">
.editBlogs
	.item(v-for="(blog,id) in blogs",@click="toggle(id)")
		i.el-icon-delete.select(v-show="isCheck(id)")
		span.author {{blog.author}}
		span.time {{blog.time}}
		span.title(:title="blog.title") {{blog.title}}
</template>
<script>
export default{
	props:['blogs','isEdit'],
	data(){
		return{
			delBlogs : [],
			selectAll : false
		}
	},
	watch:{
		'delBlogs':function(value){
			this.$emit('changeDels',value)
		},
		'isEdit':function(){
			this.delBlogs = []
		}
	},
	methods:{
		isCheck(id){
			return (this.delBlogs.indexOf(id) != -1)
		},
		toggle(id){
			var isChose = this.isCheck(id)
			if(isChose){
				var index = this.delBlogs.indexOf(id)
				this.delBlogs.splice(index, 1)
			}else{
				this.delBlogs.push(id)
			}
		}
	}
}
</script>
<style scoped lang="stylus">
@import '../assets/styl/const.styl'
.editBlogs
	max-height 400px
	overflow auto
.item
	cursor pointer
	padding 5px
	border-bottom 1px solid $Gray
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
	color $ExtraLightBlack
	font-weight bolder
.time
	color $Warning
	font-weight bolder
.title
	color $Blue
	font-weight bolder
.select
	color $Danger
	float right
.selectAll
	float right
	font-size 12px
</style>