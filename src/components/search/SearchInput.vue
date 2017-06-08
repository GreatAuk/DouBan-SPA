<template>
    <header>
        <div class="search-form">
            <router-link to="/" class="close">关闭</router-link>
            <input v-model="text" @keyup.enter.prevent="submit" class="search-input" placeholder="搜索电影" type="text">
        </div>
    </header>
</template>

<script>
    export default{
        data(){
            return{
                text:''
            }
        },
        methods:{
            submit(){
                // this.$router.push({name:'search-result',params:{text:this.text}})
                this.$router.push(`/search-result/${this.text}`);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/mixin.scss';

    .search-form{
        display:flex;
        align-items:center;
        padding:px2rem(30) px2rem(38);
        border-bottom:px2rem(2) solid #f3f3f3;
        .close{
            @include font-dpr(32);
            margin-right:px2rem(24);
            color: #42bd56;
        }
        .search-input{
            @include font-dpr(30);
            background-color:#f3f3f3;
            flex:1;
            background-image:url(../../assets/inputSearch.png);
            background-repeat:no-repeat;
            background-size:px2rem(36);
            border: none !important;
            outline: none;
            line-height: px2rem(50);
            padding-left: px2rem(70);
            border-radius: px2rem(8);
            background-position: px2rem(16) 50%;
        }
    }
</style>
