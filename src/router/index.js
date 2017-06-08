import Vue from 'vue'
import Router from 'vue-router'
import Movie from '@/components/movie/Movie'
import MovieDetail from '@/components/movie/Movie-detail'
import MovieList from '@/components/movie/Movie-list'
import Search from '@/components/search/Search'
import SearchResult from '@/components/search/SearchResult'
import Book from '@/components/Book'
import Group from '@/components/Group'
import Radio from '@/components/Radio'
import test from '@/components/test'


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/movie',
        name: 'Movie',
        component: Movie
    },{
        path:'/movie/detail/:id',
        name:'movie-detail',
        component:MovieDetail
    },{
        path:'/movie-list/:type',
        name:'movie-list',
        component:MovieList
    },{
        path: '/search',
        name: 'Search',
        component:Search
    }, {
        path:'/search-result/:tag',
        name:'search-result',
        component:SearchResult
    },{
        path: '/book',
        name: 'Book',
        component: Book
    }, {
        path: '/radio',
        name: 'Radio',
        component: Radio
    }, {
        path: '/group',
        name: 'Group',
        component:Group
    },{
        path: '/',
        redirect: '/movie'
    },{
        path: '/test',
        component:test
    }]
})
