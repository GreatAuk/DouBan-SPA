<template>
    <router-link @click.prevent="go" :to="{name:'movie-detail',params:{id:movie.id}}" class="result-item">
        <div class="post">
             <!-- <img :src="movie.images.large" class="post"> -->
             <x-img :src="movie.images.large" :default-src="'http://iph.href.lu/300x409?text=Loading'" :offset="40" class="post"></x-img>
        </div>
        <div class="info">
            <span class="title">{{movie.title}}</span>
           <rater v-model.number="average" slot="value" disabled class="rate">{{movie.rating.average}}</rater>
           <span style="color:#aaa">{{movie.rating.average}}</span>
        </div>
    </router-link>
</template>

<script>
    import {Rater,XImg} from 'vux'

    export default{
        props:{
            movie:{
                type:Object
            }
        },
        components:{
            Rater,
            XImg
        },
        computed:{
            average(){
                return (this.movie.rating.average/2).toFixed();
            }
        },
        methods:{
            go(){
                alert('go')
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/scss/mixin.scss';

    .result-item{
        display:block;
        display:flex;
        border-top:px2rem(2) solid #eee;
        padding:px2rem(50) 0 px2rem(30) 0;
        .post{
            width:px2rem(80);
        }
        .info{
            flex:1;
            padding-left:px2rem(30);
            .title{
                display: block;
                @include font-dpr(34);
                margin-bottom:px2rem(20);
                color: #494949;
            }
            .rate{
                margin-right:px2rem(15);
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
    }
</style>
