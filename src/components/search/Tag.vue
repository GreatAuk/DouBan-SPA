<template>
  <div class="tag-wrap">
    <router-link :to="{name:'search-result',params:{tag:tag.text}}" v-for="tag in tags" :key="tag.text" :style="`color:${tag.color}`" class="tag">{{tag.text}}</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { text: '经典', color: 'rgb(35, 132, 232)' },
        { text: '冷门佳片', color: 'rgb(122, 106, 219)' },
        { text: '豆瓣高分', color: 'rgb(159, 120, 96)' },
        { text: '动作', color: 'rgb(230, 70, 126)' },
        { text: '喜剧', color: 'rgb(42, 184, 204)' },
        { text: '爱情', color: 'rgb(244, 143, 46)' },
        { text: '悬疑', color: 'rgb(159, 120, 96)' },
        { text: '恐怖', color: 'rgb(87, 116, 197)' },
        { text: '科幻', color: 'rgb(89, 108, 221)' },
        { text: '治愈', color: 'rgb(225, 100, 77)' },
        { text: '文艺', color: 'rgb(64, 207, 169)' },
        { text: '歌剧', color: 'rgb(64, 207, 169)' },
        { text: '成长', color: 'rgb(66, 189, 86)' },
        { text: '动画', color: 'rgb(230, 70, 126)' },
        { text: '华语', color: 'rgb(225, 100, 77)' },
        { text: '欧美', color: 'rgb(87, 116, 197)' },
        { text: '韩国', color: 'rgb(35, 132, 232)' },
        { text: '日本', color: 'rgb(159, 120, 96)' },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/helper.scss';

.tag-wrap {
  margin-top: px2rem(50);
  .tag {
    display: inline-block;
    width: 33.333333%;
    @include font-dpr(48);
    margin-bottom: px2rem(50);
    text-align: center;
    font-weight: bold;
  }
}
</style>
