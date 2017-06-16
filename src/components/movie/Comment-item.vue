<template>
  <div class="comment-item">
    <a href="javascript:;" class="avatar-wrap">
      <img :src="comment.author.avatar" :alt="comment.author.alt">
    </a>
    <div class="main">
      <strong class="name">{{comment.author.name}}</strong>
      <rater v-model="comment.rating.value" slot="value" disabled class="rater"></rater>
      <div class="date">{{comment.created_at}}</div>
      <div class="content">{{comment.content}}</div>
      <div class="btn-info">
        <a @click.prevent="like($event)" href="javascript:;" class="btn-like">
          <img :src="likeType" alt="">
          <span :style="`color:${likeCountColor}`" class="like-count">{{likeCount}}</span>
        </a>
        <popover placement="top">
          <div @click="report" slot="content" class="popover-content">
            举报
          </div>
          <a class="btn-more">...</a>
        </popover>
      </div>
    </div>
    <toast v-model="toastShow" text="请先登录" width="40%" type="text"></toast>
  </div>
</template>

<script>
import { Rater, Popover, Toast } from 'vux'
import like from '@/assets/image/ic_like_gray.svg'
import liked from '@/assets/image/ic_like_green.svg'
import {mapState} from 'vuex'

export default {
  data() {
    return {
      likeType: like,
      likeCount: this.comment.useful_count,
      likeCountColor: '#ccc',
      toastShow: false,
      alertMessage: ''
    }
  },
  props: {
    comment: {
      type: Object
    }
  },
  components: {
    Rater,
    Popover,
    Toast
  },
  created() {
    if (!window.localStorage.movieLike) {
      // 防止没有localStorage时报错 :Unexpected token u in JSON at position 0
      window.localStorage.movieLike = '{}';
    }
    const storage = JSON.parse(window.localStorage.movieLike)[this.comment.id];
    if (storage) {
      this.likeType = liked;
      this.likeCountColor = '#42bd56';
      this.count = this.count + 1;
    }
  },
  computed:{
    ...mapState({
      loginStatus:state=>state.user.loginStatus,
    })
  },
  methods: {
    like() {
      // 用 localStorage 模拟点赞
      const storage = JSON.parse(window.localStorage.movieLike);
      if(!this.loginStatus){
        this.toastShow=true;
        setTimeout(()=> {
          this.$router.push({name:'Login'});
        }, 2000);
        return;
      };
      if (storage[this.comment.id]) {
        this.alertMessage = '不能再点了 -_-'
        this.show = true;
        return;
      }
      this.likeType = liked;
      this.likeCount++;
      this.likeCountColor = '#42bd56';
      // const newObj = Object.assign({}, JSON.parse(window.localStorage.movieLike), {[`${this.comment.id}`]: true,
      // });
      storage[`${this.comment.id}`] = true;
      window.localStorage.movieLike = JSON.stringify(storage);
    },
    report() {
      this.alertMessage = '我举报了哈！'
      this.show = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/helper.scss';
.comment-item {
  display: flex;
  margin-bottom: px2rem(50);
  .avatar-wrap {
    flex: 0 0 px2rem(72);
    margin-right: px2rem(20);
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .main {
    flex: 1;
    .name {
      @include font-dpr(30);
    }
    .date {
      color: #aaa;
      @include font-dpr(24);
      margin: px2rem(12) 0 px2rem(22) 0;
    }
    .content {
      line-height: px2rem(44);
      color: #494949;
      @include font-dpr(30);
    }
    .btn-info {
      margin-top: px2rem(20);
      display: flex;
      justify-content: space-between;
    }
    .btn-like {
      img {
        width: px2rem(40);
        height: px2rem(40);
        vertical-align: middle;
      }
      .like-count {
        line-height: px2rem(32);
        vertical-align: middle;
      }
    }
    .btn-more {
      color: rgb(204, 204, 204);
      @include font-dpr(30);
      letter-spacing: px2rem(5);
    }
    .popover-content {
      color: #42bd56;
      @include font-dpr(30);
      white-space: nowrap;
      padding: px2rem(20) px2rem(40);
      border-radius: px2rem(8);
      background-color: #fcfcfc;
      box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
