<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <back-top/>
  </div>
</template>

<script>
  import BackTop from "@/components/common/Back-top"
  export default {
    data(){
      return{
        loading:true
      }
    },
    components:{
      'back-top':BackTop
    },
    name:'app',
  }
</script>

<style lang="scss">
  @import './assets/scss/styles.scss';
  .page{
    padding-top:px2rem(110);
  }
  [v-cloak]{
    display:none;
  }
  .loading{
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    stroke:#00b125 !important;
    fill:#00b125 !important;
    svg{
      width:px2rem(100) !important;
      height:px2rem(100) !important;
    }
  }
</style>
