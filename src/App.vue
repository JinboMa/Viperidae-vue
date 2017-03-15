<template lang="jade">
	#app
		my-header(:headerIndex="headerIndex",:isLogin="isLogin",@logout="logout")
		put-top
		router-view(@login="login")
</template>

<script>
import MyHeader from './components/MyHeader'
import PutTop from './components/PutTop'

export default {
	name: 'app',
	components: {
		MyHeader,
		PutTop
	},
	data(){
		return {
			headerIndex : "/",
			isLogin : false
		}
	},
	watch:{
		'$route':function(to,from){
			this.headerIndex = to.path
		}
	},
	created(){
		localStorage.getItem('token') && (this.isLogin = true)
	},
	methods:{
		logout(){
			this.isLogin = false
			this.$router.push({path : '/Login'})
		},
		login(){
			this.isLogin = true
		}
	}
}
</script>

<style lang="stylus">
@import './assets/styl/init.styl'
@import './assets/styl/common.styl'
@import './assets/styl/const.styl'
@import './assets/styl/function.styl'
</style>
