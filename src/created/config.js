import Vue from 'vue'

export default function(){
	//this.ajax(this.setAjax("login",this.formData,this.success,this.fail))
	//全局接口配置
	Vue.prototype.ajaxConfig = {
	/* ---------------------------关于用户--------------------------- */
		login : {
			method : "POST",
			url : "login",
			successMsg : "登录成功",
			failMsg : "登录失败",
			successAlert : true,
			failAlert : true,
			md5 : true,
			// data : {
			// 	username : 用户名,
			// 	password : 密码
			// }
		},
		logout : {
			method : "GET",
			url : "logout",
			successMsg : "登出成功",
			failMsg : "登出失败",
			successAlert : true,
			failAlert : true,
			token : true,
			// data : {
			// 	token : 登陆接口返回的字符串,
			// }
		},
		registration : {
			method : "POST",
			url : "registration",
			successMsg : "注册成功",
			failMsg : "注册失败",
			successAlert : true,
			failAlert : true,
			md5 : true
		},
		userSetting : {
			method : "POST",
			url : "user/setting",
			successMsg : "设置成功",
			failMsg : "设置失败",
			successAlert : true,
			failAlert : true,
			token : true,
		},
	/* ---------------------------关于博客--------------------------- */
		blogList : {
			method : "GET",
			url : "blog",
			successMsg : "获取成功",
			failMsg : "获取失败",
			successAlert : false,
			failAlert : true,
			token : true,
			// data : {
			// 	token : 登陆接口返回的字符串,
			// }
		},
		blogAdd : {
			method : "POST",
			url : "blog/add",
			successMsg : "保存成功",
			failMsg : "保存失败",
			successAlert : true,
			failAlert : true,
			token : true,
			// data : {
			// token : 登陆接口返回的字符串,
			// title : blog标题,
			// content : blog内容
			// }
		},
		blogDetails : {
			method : "GET",
			url : "blog/details",
			successMsg : "获取成功",
			failMsg : "获取失败",
			successAlert : false,
			failAlert : true,
			token : true,
			// data : {
			// 	token : 登陆接口返回的字符串,
			// 	id : blog的id,
			// }
		},
		blogEdit : {
			method : "POST",
			url : "blog/edit",
			successMsg : "保存成功",
			failMsg : "保存失败",
			successAlert : true,
			failAlert : true,
			token : true,
			// data : {
			// 	token : 登陆接口返回的字符串,
			// 	id : blog的id,
			// 	title : blog标题,
			// 	content : blog内容,
			// }
		},
		blogDelete : {
			method : "POST",
			url : "blog/delete",
			successMsg : "删除成功",
			failMsg : "删除失败",
			successAlert : true,
			failAlert : true,
			token : true,
			// data : {
			// 	token : 登陆接口返回的字符串,
			// 	id : blog的id,
			// }
		},
	/* ---------------------------关于工作--------------------------- */
		workList : {
			method : "GET",
			url : "work",
			successMsg : "获取成功",
			failMsg : "获取失败",
			successAlert : false,
			failAlert : true,
			token : true,
		},
		workAdd : {
			method : "POST",
			url : "work/add",
			successMsg : "添加成功",
			failMsg : "添加失败",
			successAlert : true,
			failAlert : true,
			token : true,
		},
		workEdit : {
			method : "POST",
			url : "work/edit",
			successMsg : "修改成功",
			failMsg : "修改失败",
			successAlert : true,
			failAlert : true,
			token : true,
		},
		workDetails : {
			method : "GET",
			url : "work/details",
			successMsg : "获取成功",
			failMsg : "获取失败",
			successAlert : false,
			failAlert : true,
			token : true,
		},
		workClose : {
			method : "POST",
			url : "work/close",
			successMsg : "关闭成功",
			failMsg : "关闭失败",
			successAlert : true,
			failAlert : true,
			token : true,
		},
	/* ---------------------------关于聊天--------------------------- */
		chat : {
			method : "WS",
			url : "chat",
			successMsg : "关闭成功",
			failMsg : "关闭失败",
			successAlert : false,
			failAlert : false,
			token : true,
		},
	}
}