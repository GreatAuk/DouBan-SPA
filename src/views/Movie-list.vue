<template>
  <div class="movies-wrap page">
    <v-header/>
    <ul class="movies-list">
      <li v-for="movie in movies" class="item">
        <router-link :to="{name:'movie-detail',params:{id:(movie.subject?movie.subject:movie).id}}">
          <div>
            <transition name="fade">
              <x-img v-show="show" :src="(movie.subject?movie.subject:movie).images.large" :default-src="'http://iph.href.lu/300x409?text=Loading'" :offset="100" class="post"></x-img>
              <!-- <img v-show="show" :src="(movie.subject?movie.subject:movie).images.large" class="post"> -->
            </transition>
          </div>
  
          <div>
            <span class="title">{{(movie.subject?movie.subject:movie).title}}</span>
            <!-- 先提前做一个除法 -->
            <!--   <div v-show="false">{{(movie.subject?movie.subject:movie).rating.average=((movie.subject?movie.subject:movie).rating.average)/2}}</div> -->
            <div class="rating-wrap">
              <rater v-model="(movie.subject?movie.subject:movie).rating.average" slot="value" disabled class="rate"></rater>
              <span class="rate-text">{{(movie.subject?movie.subject:movie).rating.average}}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <spinner v-show="loading" :type="'lines'" class="loading"></spinner>
    <v-footer v-show="!loading" />
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import { Spinner, Rater, XImg } from 'vux'
export default {
  data() {
    return {
      loading: true,
      movies: [],
      show: true,
      averageRating: 3.45
    }
  },
  components: {
    Spinner,
    Rater,
    XImg,
    'v-header': Header,
    'v-footer': Footer
  },
  mounted() {
    this.$http({
      method: 'get',
      url: `/api/movie/${this.$route.params.type}`,
      responseType: 'json',
      timeout: 5000,
    }).then((res) => {
      this.movies = res.data.subjects;
      this.$nextTick(() => {
        this.loading = false;
      })
      console.log(this.movies)
    }).catch((err) => {
      console.log(err);
    })
  }
}
</script>

<style lang="scss" >
@import '../assets/scss/helper.scss';
.movies-wrap {
  .item {
    display: inline-block !important;
    width: 33.33333%;
    padding: 0 4%;
    margin-bottom: px2rem(40);
    .post {
      width: 100%;
      height: px2rem(143*2);
      &.fade-enter {
        opacity: 0;
      }
      &.fade-enter-active {
        opacity: 1;
        transition: opacity .3s ease-out;
      }
    }
    .title {
      display: block;
      text-align: center;
      padding-top: px2rem(10);
      @include font-dpr(26);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #494949;
    }
    .rating-wrap {
      text-align: center;
      .rate {
        text-align: center;
        a {
          font-size: 20px !important;
          [data-dpr="1"] & {
            font-size: 10px !important;
          }
          [data-dpr="3"] & {
            font-size: 30px !important;
          }
          width:auto !important;
          height:auto !important;
        }
      }
      .rate-text {
        margin-left: px2rem(4);
        color: #9b9b9b;
        @include font-dpr(24);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
