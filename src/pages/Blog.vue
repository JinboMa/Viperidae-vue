<template lang="jade">
.blog(:style="{height:blogH}",@click="hide = true",v-loading="loading",element-loading-text="正在提交,请稍等")
	textarea.content(v-model="formData.content",spellcheck="false",v-show="showLeft",:style="{width:leftWidth}")
	.html(v-html="markedHtml",v-show="showRight",:style="{width:rightWidth}")
	.markTit(:class="{hide:hide}") Markdown
	.htmlTit(:class="{hide:hide}") HTML
	el-card.card(:body-style="cardStyle",:class="{toLeft: !toLeft}")
		input.title(v-model="formData.title",placeholder="在此填写标题")
		//- textarea.description(maxlength="50",placeholder="在此填写文章描述",v-model="formData.description")
		//- .tags
		//- 	el-select.tagSelect(v-model="formData.tag",multiple,filterable,allow-create,placeholder="请选择或新增文章标签")
		//- 		el-option(v-for="item in tags",:value="item")
		el-button.button.right(type="primary",@click="postMessage") 提交此篇文章
		el-button.button.left(type="text",@click="toLeft = false") 收起标题
	el-switch.titleSwitch(v-model="toLeft",on-color="#324057",on-text="标题",off-text="标题")
	el-switch.markdownSwitch(v-model="showLeft",on-color="#324057",on-text="左侧",off-text="左侧")
	el-switch.htmlSwitch(v-model="showRight",on-color="#324057",on-text="右侧",off-text="右侧")
</div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight'
export default {
	data(){
		return {
			blogH : "90%",
			blogId : null,
			hide : false,
			toLeft : true,
			showLeft : true,
			showRight : true,
			//默认标签分类
			tags : ["python","javascript","html","css","markdown","sublime"],
			//表单提交时loading
			loading : false,
			//表单信息
			formData: {
				id : null,
				content : '',
				title : '',
				tag : [],
				description : ''
			},
			cardStyle : { 
				padding: '25px 16px 16px' , 
				width: '500px' ,
				height: '100px'
			}
		}
	},
	beforeCreated(){
		this.showLeft = true
		this.showRight = true
	},
	created: function () {
		this.blogId = this.$route.query.blogId
		marked.setOptions({
			highlight: function (code) {
				return highlight.highlightAuto(code).value
			}
		})
		this.setHeight
		window.onresize = function(){
			this.blogH = this.setHeight
		}
		this.getMessage()
	},
	computed : {
		markedHtml(){
			return marked(this.formData.content)
		},
		leftWidth: function(){
			var left = '50%'
			this.showLeft && !this.showRight && (left = '100%')
			this.showLeft && this.showRight && (left = '50%')
			return left
		},
		rightWidth: function(){
			var right = '50%'
			!this.showLeft && this.showRight && (right = '100%')
			this.showLeft && this.showRight && (right = '50%')
			return right
		}
	},
	methods : {
		//get编辑的blog的信息
		getMessage : function(){
			if(this.blogId || this.blogId === 0){
				this.loading = true
				this.ajax(this.setAjax("blogDetails",{id : this.blogId},this.getSuccess,this.getFail))
			}
		},
		getSuccess(res){
			this.formData = res
		},
		getFail(res){
			console.log('失败',res)
		},
		//发送登录请求
		postMessage : function(){
			this.loading = true
			if(this.blogId || this.blogId === 0){
				this.ajax(this.setAjax("blogEdit",this.formData,this.success,this.fail))
			}else{
				this.ajax(this.setAjax("blogAdd",this.formData,this.success,this.fail))
			}
		},
		//表单验证
		submitForm : function(formName) {
			
		},
		//提交成功
		success : function(res){
			this.$router.push('/BlogList')
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
.blog
	width 100%
	height 90%
	background $Gray
	position relative
.markTit
.htmlTit
	font-size 70px
	font-weight bold
	position absolute
	top 50%
	z-index 2
.markTit
	left 25%
	transform translate(-50%,-50%)
.htmlTit
	right 25%
	transform translate(50%,-50%)
textarea.content
.html
	width 50%
	height 100%
	overflow auto
	background $DarkWhite
	padding 20px
	font-family "Inconsolata", "Monaco", "Andale Mono", "Lucida Console", "Bitstream Vera Sans Mono", "Courier New", Courier, monospace
	font-size 14px
	line-height 1.55em
	white-space pre-wrap
textarea.content
	float left
.html
	float right
textarea
	border none
	border-right 1px solid $Sliver
	resize none
.card
	position absolute
	top 2%
	left 50%
	z-index 3
	transform translateX(-50%)
	transition left .8s
.button
	margin 10px
.title
	border none
	border-bottom 1px solid $Gray
	width 100%
	font-size 20px
	color $LightBlack
	padding 0
	margin-bottom 10px
	padding-bottom 5px
textarea.description
	width 100%
	height 60px
	padding 10px
	border 1px solid $Sliver
.tags
	width 100%
	margin 10px 0
	height 60px
.tagSelect
	display block
	margin 0 auto
	overflow hidden
.titleSwitch
.markdownSwitch
.htmlSwitch
	position absolute
	right 2%

.titleSwitch
	top 20px
.markdownSwitch
	top 50px
.htmlSwitch
	top 80px
.toLeft
	left -50%
</style>
