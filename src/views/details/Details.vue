<template>
  <div class="details">
    <details-nav-bar class="details-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="scrollListen">
      <details-swiper :topImages="topImages"></details-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info :detailInfo="goodsDetailsIfo" @imageLoad="imgLoad"></detail-goods-info>
      <detail-param-info :paramInfo="goodsParam" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <good-list :goods="recommends" ref="recommend"></good-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top ref="top" @click.native="backToTop" v-show="isShowBack"/>
  </div>
</template>
<script>
import DetailsNavBar from './childCnp/detailsNavBar'
import DetailsSwiper from './childCnp/DetailSwiper'
import DetailBaseInfo from './childCnp/DetailBaseInfo'
import DetailShopInfo from './childCnp/DetailShopInfo'
import DetailGoodsInfo from './childCnp/DetailGoodsInfo'
import DetailParamInfo from './childCnp/DetailParamInfo'
import DetailCommentInfo from './childCnp/DetailCommentInfo'
import DetailBottomBar from './childCnp/DetailBottomBar'

import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'

import { addListener, backTopMixin } from 'common/mixin.js'
import { debounce } from 'common/utils.js'

import { getDetailsData, Goods, ShopInfo, GoodsParam, getRecommend } from 'network/details.js'

import { mapActions } from 'vuex'

  export default {
    name:"Details",
    mixins: [addListener, backTopMixin],
    components: {
      DetailsNavBar,
      DetailsSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList,
      DetailBottomBar
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shopInfo: {},
        goodsDetailsIfo: {},
        goodsParam: {},
        commentInfo: {},
        recommends: [],
        themeTopY: [],
        debounceImgLoad: null,
        titleCurrentIndex: 0
      }
    },
    created() {
      //保存iid
      this.iid = this.$route.params.iid
      //请求详情页信息
      getDetailsData(this.iid).then(res => {
          const data = res.data.result
          //轮播图图片
          this.topImages = data.itemInfo.topImages;
          //商品简介
          this.goods = new Goods(
            data.itemInfo,
            data.columns,
            data.shopInfo.services
          )
          //店铺信息
          this.shopInfo = new ShopInfo(data.shopInfo)
          //商品详细信息
          this.goodsDetailsIfo = data.detailInfo
          //商品参数
          this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          //评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
          }      
      })
      //请求详情页推荐信息
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })
      //图片加载防抖
      this.debounceImgLoad = debounce(() => {
        this.themeTopY = [0]
        this.themeTopY.push(this.$refs.param.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      }, 100)
    },
    mounted() {},
    methods: {
      ...mapActions({
        addToCart: 'addCart'
      }),
      imgLoad() {
        this.$refs.scroll.refresh()
        this.debounceImgLoad()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index] + 44, 200)
      },
      scrollListen(position) {
        
        this.isShowBack = -position.y > 1000

        let y = -position.y + 44
        if(y < this.themeTopY[1]) {
          this.titleCurrentIndex = 0
        }else if(y >= this.themeTopY[1] && y < this.themeTopY[2]) {
          this.titleCurrentIndex = 1
        }else if(y >= this.themeTopY[2] && y < this.themeTopY[3]) {
          this.titleCurrentIndex = 2
        }else {
          this.titleCurrentIndex = 3
        }
        this.$refs.nav.currentIndex = this.titleCurrentIndex
      },
      addCart() {
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.newPrice;
        product.iid = this.iid;

        this.addToCart(product).then(res => {
          this.$toast.show('添加成功', 1000)
        })
      }
    }
  }
</script>
<style scoped>
  .details {
    position: relative;
    z-index: 2;
    background-color: #fff;
    height: 100vh;
  }
  .details-nav {
    position: relative;
    z-index: 3;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
