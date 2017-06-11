<template>
   <div class="movie-comments page">
        <v-header/>
        <div v-show="loading" class="total">{{`全部短评(${data.total})`}}</div>
        <button @click="show">btn</button>
        <section class="comments">
            <comment-item :comment="item" v-for="item in comments" :key="item.id"></comment-item>
            <infinite-loading :on-infinite="onInfinite" spinner="waveDots" ref="infiniteLoading">
                <span class="no-more" slot="no-more">
                    你掉河里的是这把金斧头还是这把铁斧头呢？
                </span>
            </infinite-loading>
        </section>
   </div>
</template>

<script>
import CommentItem from '@/components/movie/Comment-item.vue'
import InfiniteLoading from 'vue-infinite-loading';
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
    export default{
        data(){
            return{
                data:{},
                comments:[],
                start:0,
                everyCount:10,
                loading:false
            }
        },
        components:{
            'comment-item':CommentItem,
            InfiniteLoading,
            'v-header':Header,
            'v-footer':Footer
        },
        methods:{
            show(){
                alert(111);
            },
            onInfinite(){
                this.$http({
                    method: 'get',
                    url: `api/movie/subject/${this.$route.params.movieId}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&start=${this.start}&count=${this.everyCount}`,
                    responseType: 'json', // 默认的
                    timeout: 10000,
                }).then((res)=> {
                    this.start=this.start+this.everyCount;
                    this.data=res.data;
                    this.loading=true;
                    this.comments=this.comments.concat(res.data.comments);
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    if(res.data.comments.length%10!==0){
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    }
                }).catch((err)=> {
                    console.log(err);
                })
            }
        },
        // created(){
        //     this.$http({
        //         method: 'get',
        //         url: `api/movie/subject/${this.$route.params.movieId}/comments?apikey=0b2bdeda43b5688921839c8ecb20399b`,
        //         responseType: 'json',
        //         timeout: 10000,
        //     }).then((res)=> {
        //         console.log(res.data);
        //         this.data=res.data;
        //         this.comments=res.data.comments;
        //         this.loading=false;
        //     }).catch((err)=> {
        //         console.log(err);
        //     })
        // }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixin.scss';
    .total{
        @include font-dpr(24*2);
        margin-top: px2rem(70);
        margin-left:px2rem(36);
    }
    .comments{
        margin:px2rem(36);
        margin-top:px2rem(50);
    }
</style>
