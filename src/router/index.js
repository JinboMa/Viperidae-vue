//vue路由配置引入文件
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//路由页面引入
import Index from '../pages/Index'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import Blog from '../pages/Blog'
import Work from '../pages/Work'
import BlogList from '../pages/BlogList'
import WorkList from '../pages/WorkList'
import Chat from '../pages/Chat'
export default new Router({
		mode: "history",
		routes: [{
			path: "/",
			component: Index,
			name: "Home"
		},{
			path: "/Login",
			component: Login,
			name: "Login"
		},
		{
			path: "/Registration",
			component: Registration,
			name: "Registration"
		},
		{
			path: "/Blog",
			component: Blog,
			name: "Blog"
		},
		{
			path: "/BlogList",
			component: BlogList,
			name: "BlogList"
		},
		{
			path: "/Work",
			component: Work,
			name: "Work"
		},
		{
			path: "/WorkList",
			component: WorkList,
			name: "WorkList"
		},
		{
			path: "/Chat",
			component: Chat,
			name: "Chat"
		}]
	})