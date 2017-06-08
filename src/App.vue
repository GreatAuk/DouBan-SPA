<template>
  <div id="app">
      <router-view ref="child"></router-view>
  </div>
</template>

<script>

  export default {
    data(){
      return{
        loading:true
      }
    },
    name:'app',
    components:{

    }
  }
</script>

<style lang="scss">
  @import './assets/scss/normalize.scss';
  @import './assets/scss/base.scss';
  @import './assets/scss/mixin.scss';

  .page{
    padding-top:px2rem(50*2);
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
