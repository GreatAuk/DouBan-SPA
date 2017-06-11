<template>
    <div class="movie-detail page">
        <v-header/>
        <div v-if="movie" v-show="!loading"  class="detail-wrap">
            <h2 class="title">{{movie.title}}</h2>
            <section class="movie-info">
                <div class="left">
                    <div v-if="movie.rating" class="rating-wrap">
                        <rater  v-model="rating" slot="value" disabled class="rater"></rater>
                        <span>{{movie.rating.average?movie.rating.average:'暂无评价'}}</span>
                        <span>{{movie.ratings_count}}人评价</span>
                    </div>
                    <div class="meta">
                        {{infos}}
                    </div>
                </div>
                <div v-if="movie.images" class="right">
                    <img :src="movie.images.large">
                </div>
            </section>
            <section class="mark-item">
                <a @click="wantWatch">想看</a>
                <a @click="Watched">看过</a>
            </section>
            <section class="subject-intro">
                <h2>{{movie.title}}的剧情介绍</h2>
                <div class="bd">
                    {{movie.summary}}
                </div>
            </section>
            <section class="tags">
                <p>查看更多豆瓣高分电影电视剧</p>
                <ul>
                    <li v-for="item in movie.tags">
                        <router-link :to="`/search-result/${item}`">{{item}}</router-link>
                    </li>
                </ul>
            </section>
            <section class="comments">
                <h2 class="title">{{ `${movie.title}的影评(${movie.comments_count})` }}</h2>
                <comment-item :comment="item" v-for="item in movie.popular_comments" :key="item.id"></comment-item>
                <router-link class="see-more" :to="{name:'movie-comments',params:{movieId:movie.id}}">查看全部短评</router-link>
            </section>
        </div>
        <spinner v-show="loading" :type="'lines'" class="loading"></spinner>
        <v-footer v-show="!loading"/>
    </div>
</template>

<script>
    import {Spinner,Rater} from 'vux'
    import CommentItem from '@/components/movie/Comment-item.vue'
    import Header from '@/components/common/Header.vue'
    import Footer from '@/components/common/Footer.vue'
    export default{
        data(){
            return {
                loading:true,
                movie:null,
                test:''
            }
        },
        components:{
            Spinner,
            Rater,
            'comment-item':CommentItem,
            'v-header':Header,
            'v-footer':Footer
        },
        computed:{
            rating(){
                return (this.movie.rating.average/2).toFixed();
            },
            infos() {
                  const { directors, countries, year, genres, casts } = this.movie;
                  const array = [];
                  Array.prototype.push
                    .call(array,
                      genres.reduce((previous, current) => `${previous} / ${current}`),
                      directors.map(value => `${value.name}(导演)`).join(' / '),
                      casts.map(value => value.name).join(' / '),
                      `${year}年(${countries.reduce((previous, current) => `${previous} / ${current}`)})上映`,
                    );
                  return array.join(' / ');
                }
        },
        methods:{
            wantWatch(){
                alert("我也想看啊！");
            },
            Watched(){
                alert('我已经看过了');
            }
        },
        mounted(){
            this.id=this.$route.params.id;
            this.$http({
                method: 'get',
                url: `api/movie/subject/${this.id}?apikey=0b2bdeda43b5688921839c8ecb20399b`,
                timeout: 5000,
            }).then((res)=> {
                this.movie=res.data;
                console.log(res.data)
                this.loading=false;
            }).catch((err)=> {
                console.log(err);
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixin.scss';
    .detail-wrap{
        margin:0 px2rem(36);
        .movie-info{
            display:flex;
            margin-bottom:px2rem(60);
            .left{
                flex:1;
                .rating-wrap{
                    @include font-dpr(30);
                    span:last-child{
                        color:#aaa;
                        margin-left:px2rem(8);
                    }
                    .rater{
                        a{
                            font-size:20px !important;
                            [data-dpr="1"] &{
                                font-size:10px !important;
                            }
                            [data-dpr="3"] &{
                                font-size:30px !important;
                            }
                            width:auto !important;
                            height:auto !important;
                            }
                    }
                }
                .meta{
                    color: #494949;
                    margin-top: px2rem(30);
                    padding-right: px2rem(48);
                    @include font-dpr(28);
                    line-height: px2rem(40);
                }
            }
            .right{
                flex:0 0 px2rem(200);
                img{
                    width:100%;
                }
            }
        }
        .title{
            margin: px2rem(60) 0 px2rem(10);
            @include font-dpr(24*2);
            font-weight:normal;
            line-height: px2rem(64);
            word-break: break-all;
        }
        .subject-intro{
            margin-bottom:px2rem(60);
            h2{
                color: #aaa;
                margin: 0 0 px2rem(30);
                @include font-dpr(30);
                font-weight:normal;
            }
            .bd{
                @include font-dpr(30);
                color: #494949;
                line-height:px2rem(50);
            }
        }
        .mark-item{
            display:flex;
            justify-content:space-between;
            margin-bottom:px2rem(60);
            a{
                flex:1;
                height: px2rem(60);
                line-height: px2rem(60);
                display: block;
                border: 1px solid #ffb712;
                border-radius: px2rem(6);
                margin-right: px2rem(20);
                color: #ffb712;
                @include font-dpr(30);
                text-align: center;
            }
        }
        .tags{
            margin-bottom:px2rem(60);
            p{
                @include font-dpr(30);
                color:#aaa;
            }
            li{
                display:inline-block;
                font-size:0;
                margin:px2rem(20) px2rem(20) 0 0;
                a{
                    @include font-dpr(30);
                    line-height: px2rem(28*2);
                    padding: 0 px2rem(24);
                    border-radius: px2rem(28*2);
                    text-align: center;
                    color: #494949;
                    background: #f5f5f5;
                    display: block;
                }
            }
        }
        .comments{
            .title{
                color: #aaa;
                margin: 0 0 px2rem(32);;
                @include font-dpr(30);
            }
        }
        .see-more{
            display:block;
            margin:20px 0;
            text-align:center;
            @include font-dpr(32);
            color:#42bd56;
        }
    }
</style>
