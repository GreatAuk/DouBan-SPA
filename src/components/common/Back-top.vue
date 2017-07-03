<template>
  <span @click="goTop" :style="[{position: 'fixed'}, this.direction, {opacity: this.visibility}]" class="go-top arrow"></span>
</template>
<script>
/**
     * @props direction  Object     =>{  bottom:'10px',right:'20px'}   =>控制返回頂部按鈕的位置，默認右下角
     * @props position   Number     => 150                             =>控制返回按鈕出現的位置，默認window.scrollY 為 100的時候
     *@slot   -          -                                             =>爲了增强通用性，設置返回頂部的按鈕可以塞入非具名插槽
     **/
export default {
  name: 'go-to-top',
  props: {
    direction: {
      type: Object,
      default: function () {
        return {
          bottom: '20px',
          right: '10px'
        }
      }
    },
    position: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      currentValue: false,
      visibility: 0
    }
  },
  watch: {
    currentValue(value) {
      this.visibility = (value === true ? .7 : 0)
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll',
        this.onScroll
      )
    });
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    goTop() {
      for (let i = window.scrollY; i > 0; i--) {
        setTimeout(() => {
          window.scroll(0, window.scrollY - 1)
        }, i / 10)   // 儅i超過1000時，不除以10就悲劇了
      }
    },
    onScroll() {
      let scrollTop = window.scrollY
      if (scrollTop > this.position) {
        this.currentValue = true
      } else {
        this.currentValue = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/helper.scss';

$color: #42bd56;
$speed: 1.5s;

.arrow {
  bottom:px2rem(20);
  right:px2rem(20);
  display: inline-block;
  font-size: 26px;
  color: $color;
  text-align: center;
  width: px2rem(100);
  height: px2rem(100);
  line-height: px2rem(80);
  border:px2rem(4) solid #42bd56;
  border-radius:50%;
  box-shadow:0px 0px px2rem(7) 0 #42bd56;
  overflow: hidden;
  cursor: pointer;
  &:before {
    animation: lineUp $speed cubic-bezier(0.0, 0.6, 1.0, 0.4) infinite .5s;
  }
  &:after {
    animation: tipUp $speed cubic-bezier(0.0, 0.6, 1.0, 0.4) infinite .5s;
  }
  &:before {
    position: absolute;
    display: inline-block;
    content: "";
    background: $color;
    width: px2rem(5);
    height: px2rem(40);
    top: 50%;
    left: 50%;
    margin-top: px2rem(-8);
    margin-left: px2rem(-3);
    transform: translateY(px2rem(40));
  }

  &:after {
    position: absolute;
    display: inline-block;
    content: "";
    width: px2rem(20);
    height: px2rem(20);
    color: $color;
    border-top: px2rem(5) solid;
    border-left: px2rem(5) solid;
    transform: rotateZ(45deg);
    top: 50%;
    left: 50%;
    margin-top: px2rem(-6);
    margin-left: px2rem(-10.5);
    transform: translateY(px2rem(40)) rotateZ(45deg);
  }
}



@keyframes tipUp {
  0% {
    transform: translateY(px2rem(40)) rotateZ(45deg);
  }

  100% {
    transform: translateY(px2rem(-90)) rotateZ(45deg);
  }
}

@keyframes lineUp {
  0% {
    transform: translateY(px2rem(40));
  }

  100% {
    transform: translateY(px2rem(-90));
  }
}
</style>
