<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <back-top/>
  </div>
</template>

<script>
import BackTop from "@/components/common/Back-top"
export default {
  data() {
    return {
      loading: true
    }
  },
  components: {
    'back-top': BackTop
  },
  name: 'app',
}
</script>

<style lang="scss">
@import './assets/scss/styles.scss';
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
.page {
  padding-top: px2rem(110);
}

[v-cloak] {
  display: none;
}

.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  stroke: #00b125 !important;
  fill: #00b125 !important;
  svg {
    width: px2rem(100) !important;
    height: px2rem(100) !important;
  }
}
</style>
