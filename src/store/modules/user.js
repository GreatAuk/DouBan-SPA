import Vue from 'vue'
import * as types from "./../mutation-types"

export default {
  state: {
    loginStatus:false,
    userInfo:JSON.parse(sessionStorage.getItem('user')) || {},
  },
  mutations: {
    [types.LOGIN](state,rootState, user) {
      sessionStorage.setItem('user', JSON.stringify(user));
      Object.assign(state, user);
      state.loginStatus=true;
    },
    [types.REGISTER](state, user) {
      
    },
    [types.USER_SIGNOUT](state) {
        sessionStorage.removeItem('user')
        Object.keys(state).forEach(k => Vue.delete(state, k))
    }
  },
  actions: {
    [types.LOGIN]({commit}, data) {
      let user=data.user;
			return new Promise((resolve, reject) => {
        //使用 localStorage 模拟成后台数据库获取用户信息。
        let userFromData = JSON.parse(localStorage.getItem('user'));
        if (userFromData&&userFromData.account === user.account && userFromData.pwd === user.pwd) {
           commit(types.LOGIN, user);
           resolve('登录成功，3秒后跳转');
        } else {
          reject('用户名或者密码错误');
        }
      })
     
    },
    [types.REGISTER]({commit}, data) {
      let user=data.user;
      //使用 localStorage 模拟成后台数据库添加用户信息。
      return new Promise((resolve,reject)=>{
          localStorage.setItem('user', JSON.stringify(data.user));
          resolve('注册成功!3秒后跳转');
        });
    },
    [types.USER_SIGNOUT]({commit}) {
        commit(USER_SIGNOUT)
    }
  }
}
