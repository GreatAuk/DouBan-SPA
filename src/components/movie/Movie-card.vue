<template>
    <router-link :to="{name: 'movie-detail', params: {id: movie.id}}">
        <div><img v-bind:src="movie.images.large" class="post"/></div>
        <div>
            <span class="title">{{movie.title}}</span>
            <rater v-if="movie.rating.average" v-model.number="rating" slot="value" disabled class="rate"></rater>
            <span v-if="movie.rating.average">{{movie.rating.average}}</span>
            <span v-if="!movie.rating.average" class="no-rate">暂无评分</span>
        </div>
    </router-link>
</template>

<script>
    import {Rater} from 'vux'
    export default{
        props:{
            movie:{
                type:Object
            }
        },
        components:{
            Rater
        },
        computed:{
            rating(){
                return (this.movie.rating.average/2).toFixed();
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
