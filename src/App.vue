<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
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
  }
</script>

<style lang="scss">
  @import './assets/scss/normalize.scss';
  @import './assets/scss/base.scss';
  @import './assets/scss/mixin.scss';
  @import './assets/scss/vux-reset.scss';
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

    /* Popover Start*/
  .vux-popover{
    background-color:transparent !important;
  }
    /* Popover End*/

  /* Rater Start*/
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

  /* Alert Start*/
  .weui-dialog__ft{
    @include font-dpr(30);
  }
  .weui-dialog__bd{
    @include font-dpr(28);
  }
  /* Alert End*/

</style>
