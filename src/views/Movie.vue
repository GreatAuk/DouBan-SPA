<template>
	<div class="movies page">
		<v-header v-once/>
		<section>
			<header>
				<h2 v-show="!loading" class="title">影院热映</h2>
				<router-link v-show="!loading" :to="{name:'movie-list',params:{type:'in_theaters'}}" class="more">更多</router-link>
			</header>
			<div class="section-content">
				<ul class="items">
					<li v-for="movie in moviesShowing" class="item">
						<movie-card :movie="movie" />
					</li>
				</ul>
			</div>
		</section>
		<section>
			<header>
				<h2 v-show="!loading" class="title"> 北美票房</h2>
				<router-link v-show="!loading" :to="{name:'movie-list',params:{type:'us_box'}}" class="more">更多</router-link>
			</header>
			<div class="section-content">
				<ul class="items">
					<li v-for="movie in moviesUS" class="item">
						<!-- 因为北美票房这个 api，豆瓣做的有点奇葩，就不用 Movie-card 组件了 -->
						<router-link :to="{name: 'movie-detail', params: { id: movie.subject.id }}">
							<div>
								<img v-bind:src="movie.subject.images.large" class="post" />
							</div>
							<div>
								<span class="title">{{movie.subject.title}}</span>
								<rater v-model.number="movie.subject.rating.average" slot="value" disabled class="rate">{{movie.subject.rating.average}}</rater>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</section>
		<section>
			<header>
				<h2 v-show="!loading" class="title">新版速递</h2>
				<router-link v-show="!loading" :to="{name:'movie-list',params:{type:'coming_soon'}}" class="more">更多</router-link>
			</header>
			<div class="section-content">
				<ul class="items">
					<li v-for="movie in moviesNew" class="item">
						<movie-card :movie="movie" />
					</li>
				</ul>
			</div>
		</section>
		<section v-show="!loading"  class="nav-bottom">
			<div class="nav-item">
				<router-link :to="{name:'Login'}"> 登录</router-link>
			</div>
			<div class="nav-item">
				<router-link :to="{name:'Register'}">注册</router-link>
			</div>
		</section>
		<spinner v-show="loading" :type="'lines'" class="loading"></spinner>
		<v-footer v-show="!loading" />
	
	</div>
</template>

<script>
import { Spinner, Rater } from 'vux'
import MovieCard from '@/components/movie/Movie-card'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
export default {
	data() {
		return {
			moviesShowing: [],
			moviesNew: [],
			moviesUS: [],
			loading: true
		}
	},
	components: {
		Spinner,
		Rater,
		'movie-card': MovieCard,
		'v-header': Header,
		'v-footer': Footer
	},
	methods: {
		getInTheaters() {
			return this.$http.get('/api/movie/in_theaters', {
				params: { count: 10 },
				timeout: 10000,
			});
		},
		getUS() {
			return this.$http.get('/api/movie/us_box', {
				params: { count: 10 },
				timeout: 10000,
			});
		},
		getComingSoon() {
			return this.$http.get('/api/movie/coming_soon', {
				params: { count: 10 },
				timeout: 10000,
			});
		}
	},
	mounted: function () {  //这里mounted和created生命周期函数区别
		//跨域请求，在  config 目录 下的 index.js 文件中进行了代理配置(axios 不支持jsonp);
		this.$http.all([this.getInTheaters(), this.getUS(), this.getComingSoon()])
			.then(this.$http.spread((res1, res2, res3) => {
				console.log(res1)
				this.moviesShowing = res1.data.subjects;
				this.moviesUS = res2.data.subjects;
				this.moviesNew = res3.data.subjects;
				this.loading = false;
			}));
	}
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
.movies {
	section {
		padding-bottom: px2rem(50);
		&:first-child {
			padding-top: px2rem(20);
		}
		header {
			padding: 0 px2rem(36);
			display: flex;
			justify-content: space-between;
			.title {
				@include font-dpr(34);
				margin: 0;
				font-weight: normal;
			}
			.more {
				color: #42bd56;
				@include font-dpr(30);
			}
		}
		.section-content {
			margin-top: px2rem(24);
			.items {
				overflow-x: auto;
				overflow-y: hidden;
				white-space: nowrap; // padding:px2rem(30) 0 px2rem(34*2) 0;    /*隐藏滚动条*/
				font-size: 0;
				-webkit-overflow-scrolling: touch;
				&::-webkit-scrollbar {
					display: none;
				}
				.item {
					display: inline-block;
					width: px2rem(200);
					vertical-align: top;
					margin-right: px2rem(16);
					text-align: center;
					&:first-child {
						margin-left: px2rem(36);
					}
					.post {
						width: 100%;
						height: px2rem(143*2);
					}
					.title,
					.rate {
						display: block;
					}
					.title {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						word-wrap: nowrap;
						@include font-dpr(30);
						line-height: px2rem(30);
						color: rgb(17, 17, 17);
						margin-top: px2rem(14);
						margin-bottom: px2rem(8);
					}
					.no-rate {
						@include font-dpr(24);
						display: inline-block;
						margin-top: px2rem(4);
						color: #aaa;
					}
					.rate {
						text-align: center;
						margin-top: px2rem(14);
						a {
							font-size: 22px !important;
							[data-dpr="1"] & {
								font-size: 11px !important;
							}
							[data-dpr="3"] & {
								font-size: 33px !important;
							}
							width:auto !important;
							height:auto !important;
						}
					}
				}
			}
		}
	}
	.nav-bottom{
		display:flex;
		.nav-item{
			flex:1;
			text-align:center;
			border-top:px2rem(2) solid #f3f3f3;
			border-bottom:px2rem(2) solid #f3f3f3;
			height:px2rem(100);
			a{
				color:#42bd56;
				display:block;
				@include font-dpr(34);
				line-height:px2rem(100);
			}
			&:first-child a{
					border-right:px2rem(2) solid #f3f3f3;
				}
		}
	}
}
</style>
