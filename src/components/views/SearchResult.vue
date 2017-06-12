<template>
    <div class="search-result page">
        <v-header/>
        <div class="result-wrap">
            <h2 v-show="movies.length" class="search-title">关于『 {{$route.params.tag}} 』的电影</h2>
            <result-item :movie="movie" v-for="movie in movies" :key="movie.id"></result-item>
        </div>
        <infinite-loading :on-infinite="onInfinite" spinner="waveDots" ref="infiniteLoading">
            <span class="no-more" slot="no-more">
                你掉河里的是这把金斧头还是这把铁斧头呢？
            </span>
        </infinite-loading>
    </div>
</template>

<script>
    import Header from '@/components/common/Header.vue'
    import ResultItem from '@/components/search/ResultItem'
    import InfiniteLoading from 'vue-infinite-loading';
    export default{
        data(){
            return{
                movies:[],
                searchCount:10,
                start:0
            }
        },
        components:{
            'result-item':ResultItem,
            'v-header':Header,
            InfiniteLoading
        },
        methods:{
            onInfinite(){
                this.$http({
                    method: 'get',
                    url: `/api/movie/search?tag=${this.$route.params.tag}&count=${this.searchCount}&start=${this.start}`,
                    responseType: 'json', // 默认的
                    timeout: 10000,
                }).then((res)=> {
                    this.start=this.start+this.searchCount;
                    this.movies=this.movies.concat(res.data.subjects);
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    if(res.data.subjects.length%10!==0){
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    }
                }).catch((err)=> {
                    console.log(err);
                })
            }
        },
        // mounted(){
        //     this.$http({
        //         method: 'get',
        //         url: `/api/movie/search?tag=${this.$route.params.tag}&count=${this.searchCount}&start=${this.start}`,
        //         responseType: 'json', // 默认的
        //         timeout: 10000,
        //     }).then((res)=> {
        //         this.movies=res.data.subjects;
        //         this.loading=false;
        //     }).catch((err)=> {
        //         console.log(err);
        //     })
        // }
    }

</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixin.scss';

    .result-wrap{
        padding: 0 px2rem(36);
        .search-title{
            @include font-dpr(40);
            text-align:center;
        }
    }
    .loading-wave-dots{
            width:px2rem(80) !important;
            height:px2rem(80) !important;
        }
     .no-more{
        @include font-dpr(30);
        line-height:px2rem(90);
    }
</style>
