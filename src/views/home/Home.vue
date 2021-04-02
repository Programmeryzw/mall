<template>
  <div class="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
        ref="tabControl1"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        class="tabcontrol"
        v-show="isTabFixed"
     />
    <scroll class="content" ref="scroll" :probeType="3" :pullUpLoad="true" @scroll="scrollOn" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <week-pop />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top ref="top" @click.native="backToTop" v-show="isShowBack"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from 'components/common/scroll/Scroll'


import TabControl from "components/content/tabControl/TabControl";
import GoodList from 'components/content/goods/GoodList'

import { addListener, backTopMixin } from 'common/mixin.js'

import HomeSwiper from "./childCpn/HomeSwiper";
import RecommendView from "./childCpn/RecommendView";
import WeekPop from "./childCpn/WeekPop";



import { getHomeData, getHomeGoods } from "network/home.js";


export default {
  name: "Home",
  mixins: [addListener, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      tabOffSet: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    WeekPop,
    TabControl,
    GoodList,
    Scroll
  },
  created() {
    this.getHomeData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    this.$bus.$off('imgLoad', this.imgLoadListener)
  },
  mounted() {},
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
      switch(index) {
        case 0 : this.currentType = 'pop'; break
        case 1 : this.currentType = 'new'; break
        case 2 : this.currentType = 'sell'; break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    scrollOn(position){
      this.isShowBack = -position.y > 1000
      this.isTabFixed = -position.y > this.tabOffSet
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad() {
      this.tabOffSet = this.$refs.tabControl2.$el.offsetTop
    },



    //网络请求相关方法
    getHomeData() {
      getHomeData().then(res => {
        this.banners = res.data.data.banner.list
        this.recommends = res.data.data.recommend.list
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1       
        this.$refs.scroll.finishPullUp()
      })
    }
  }
};
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  margin-bottom: -1px;
}

.tabcontrol {
  position: relative;
  z-index: 1;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
