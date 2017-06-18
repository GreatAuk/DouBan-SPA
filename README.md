# DouBan-SPA

> The douban application built with vue + vuex + es6 + vux-cli + vue-router + axios + vux

## 预览

![](https://github.com/GreatAuk/DouBan-SPA/raw/master/review1.gif)  ![](https://github.com/GreatAuk/DouBan-SPA/raw/master/review2.gif)

------



![](https://github.com/GreatAuk/DouBan-SPA/raw/master/review3.gif)  ![](https://github.com/GreatAuk/DouBan-SPA/raw/master/review4.gif)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8000
npm run dev

# build for production with minification
npm run build
```

## 项目文件结构

```
├── App.vue							*页面入口文件
├── api
│   └── axios.config.js				*axios 配置文件
├── assets							*当前项目所有静态文件	
│   ├── image
│   └── scss
│       ├── base.scss					自己定义的一些全局样式
│       ├── helper.scss					mixin 和 function
│       ├── layouts.scss				全局的布局样式
│       ├── normalize.scss				Css Reset 库
│       ├── styles.scss					scss文件夹中所有文件的出口(模块化)
│       ├── variables.scss				定义的一些变量
│       └── vux-reset.scss				对 vux 组件样式的覆盖
├── components						*当前项目所有子组件
│   ├── common						*全局公用的组件
│   │   ├── Back-top.vue
│   │   ├── Footer.vue
│   │   └── Header.vue
│   ├── movie						*movie 模块中的子组件
│   │   ├── Comment-item.vue
│   │   └── Movie-card.vue
│   └── search						*search 模块中的子组件
│       ├── ResultItem.vue
│       ├── Search.vue
│       ├── SearchInput.vue
│       ├── SearchResult.vue
│       └── Tag.vue
├── main.js							*程序入口文件，加载各种公共组件
├── router							*路由配置
│   └── index.js
├── store							*vuex状态管理
│   ├── actions.js						配置actions
│   ├── index.js						引用vuex，创建store
│   ├── modules							store模块
│   │   ├── movie.js
│   │   └── user.js
│   ├── mutation-types.js				定义常量muations名
│   └── mutations.js					配置mutations
└── views							*页面级组件
    ├── Book.vue
    ├── Comments.vue
    ├── Group.vue
    ├── Login.vue
    ├── Movie-detail.vue
    ├── Movie-list.vue
    ├── Movie.vue
    ├── Radio.vue
    ├── Register.vue
    ├── Search.vue
    └── SearchResult.vue
```



## 路由结构

>把路由对应的组件定义成异步组件

```javascript
export default new Router({
  routes: [{
    path: '/movie',
    name: 'Movie',
    component: resolve => require(['@views/Movie'], resolve),
    meta: { keepAlive: true },
  }, {
    path: '/movie/detail/:id',
    name: 'movie-detail',
    component: resolve => require(['@views/Movie-detail'], resolve),
    beforeEnter: (to, before, next)=>{
      // document.title='Hello World';
      next();
    }
  }, {
    path: '/movie-list/:type',
    name: 'movie-list',
    component: resolve => require(['@views/Movie-list'], resolve),
  }, {
    path: '/movie/:movieId/comments',
    name: 'movie-comments',
    component: resolve => require(['@views/Comments'], resolve),
  }, {
    path: '/search',
    name: 'Search',
    component: resolve => require(['@views/Search'], resolve),
  }, {
    path: '/search-result/:tag',
    name: 'search-result',
    component: resolve => require(['@views/SearchResult'], resolve),
  }, {
    path: '/book',
    name: 'Book',
    component: resolve => require(['@views/Book'], resolve),
  }, {
    path: '/radio',
    name: 'Radio',
    component: resolve => require(['@views/Group'], resolve),
  }, {
    path: '/group',
    name: 'Group',
    component: resolve => require(['@views/Radio'], resolve),
  }, {
    path: '/login',
    name: 'Login',
    component: resolve => require(['@views/Login'], resolve),
  }, {
		path:'/register',
		name:'Register',
		component:resolve => require(['@views/Register'], resolve),
  }, {
    path: '/',
    redirect: '/movie'
  }]
})

```
> 其中『@views 』是配置的别名（`resolve.alias`）

```Javascript
 alias: {
      '@views': resolve('src/components/views')
    }
```

## 页面的缓存

> keep-alive组件和router.mate属性来缓存部分有需要的页面

```Javascript
  
<transition name="router-fade" mode="out-in">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </transition>
  <transition name="router-fade" mode="out-in">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </transition>
```

```Javascript
//路由配置
{
    path: '/movie',
    name: 'Movie',
    component: resolve => require(['@views/Movie'], resolve),
    meta: { keepAlive: true },
}
```



## 跨域访问豆瓣 API

> 修改 config/index.js 中的 proxyTable 属性来配置代理

```javascript
proxyTable: {
            '/api': {
                target: 'https://api.douban.com/v2',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
```



## axios 的配置文件

```Javascript
import axios from 'axios'
import qs from 'qs'

//最长响应时间
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = '/api';
// axios.defaults.baseURL = '真实后台 url';

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) =>{
  //对响应数据做些事
    if(!res.data.success){
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});

export default axios;

```

## 移动端的适配

[淘宝弹性布局方案*lib-flexible*](https://github.com/amfe/lib-flexible)



## 第三组件

* [Vux](https://github.com/airyland/vux)  是基于 Vue 和 Weui 开发的手机端页面 UI 组件库(虽然项目中使用的少，但是好在可以按需加载)。
* [Vue-infinite-loading](https://github.com/PeachScript/vue-infinite-loading) 无限加载。