# DouBan-SPA

> The douban application built with vue + vux-cli + vue-router + axios + vux + es6



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8000
npm run dev

# build for production with minification
npm run build

```



## 路由结构

>把路由对应的组件定义成异步组件

```javascript

export default new Router({
    routes: [{
        path: '/movie',
        name: 'Movie',
        component: resolve => require(['@views/Movie'], resolve)
    },{
        path:'/movie/detail/:id',
        name:'movie-detail',
        component:resolve => require(['@views/Movie-detail'], resolve)
    },{
        path:'/movie-list/:type',
        name:'movie-list',
        component:resolve => require(['@views/Movie-list'], resolve)
    },{
        path:'/movie/:movieId/comments',
        name:'movie-comments',
        component:resolve => require(['@views/Comments'], resolve)
    },{
        path: '/search',
        name: 'Search',
        component:resolve => require(['@views/Search'], resolve)
    }, {
        path:'/search-result/:tag',
        name:'search-result',
        component:resolve => require(['@views/SearchResult'], resolve)
    },{
        path: '/book',
        name: 'Book',
        component: resolve => require(['@views/Book'], resolve)
    }, {
        path: '/radio',
        name: 'Radio',
        component: resolve => require(['@views/Group'], resolve)
    }, {
        path: '/group',
        name: 'Group',
        component:resolve => require(['@views/Radio'], resolve)
    },{
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



## 跨域访问豆瓣 API

> 修改 config/index.js 来配置代理

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



## 第三组件

* [Vux](https://github.com/airyland/vux)  是基于 Vue 和 Weui 开发的手机端页面 UI 组件库(虽然项目中使用的少，但是好在可以按需加载)。
* [Vue-infinite-loading](https://github.com/PeachScript/vue-infinite-loading) 无限加载。