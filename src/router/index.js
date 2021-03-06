import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
