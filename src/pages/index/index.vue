<template>
  <div class="wrapper">
    <div class="search">
      <i class="iconfont icon-sousuo"></i>
      <input maxlength="100" placeholder-class="place-color" placeholder-style="color:#fff;" confirm-type="搜索" placeholder="更多优惠搜搜看" />
    </div>
    <div class="nav">
      <span v-for="nav in topNavs" :key="nav.id" :class="{'nav-selected': currentNav === nav.navId}" @click="tab(nav)">{{nav.name}}</span>
    </div>
    <div class="swiper-top">
      <swiper indicator-dots="true"
        autoplay="true" interval="5000" duration="1000">
        <block v-for="banner in topBanner" :key="banner.id">
          <swiper-item>
            <image :src="banner.imgurl" @click="goSuperitem(banner, 'keyword')" class="slide-image" height="150"/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="middle-nav">
      <div v-for="nav in navs" @click="goSuperitem(nav, 'nav')" :key="nav.nav_id"> 
        <img :src="nav.imge_url" alt="">
        <p>{{nav.name}}</p>
      </div>
    </div>
    <div class="content">
      <div class="swiper-middle">
        <h2>今日值得买</h2>
        <swiper indicator-dots="true"
          autoplay="true" interval="5000" duration="1000">
          <block v-for="(items, i) in deserveitem" :key="i">
            <swiper-item class="swiper-middle-item">
              <div v-for="item in items" :key="item.itemid">
                <image :src="item.itempic" class="slide-image" height="150"/>
                <p class="swiper-middle-item-title">{{item.itemtitle}}</p>
                <p class="swiper-middle-item-price">原价¥{{item.itemprice}}</p>
                <p class="swiper-middle-item-endprice">券后 ¥<text>{{item.itemendprice}}</text><text>券{{item.couponmoney}}</text></p>
              </div>
            </swiper-item>
          </block>
        </swiper>
      </div>
      <div class="ad">
        <div v-for="cate in categories" :key="cate.category_id">
          <image :src="cate.category_url" @click="goSuperitem(cate, 'column')"/>
        </div>
      </div>
      <view class="footer-banner"><text class="iconfont icon-zengsong"></text><text>每日上新·好券不断</text></view>
      <div class="recommend">
        <card :commodity="item" v-for="item in focatitems" :key="item.itemid" />
      </div>
    </div>
  </div>
</template>

<script>
import { navList, banners } from '@/utils/constants'
import service from '@/api/service'
import card from '@/components/card'

export default {
  data() {
    return {
      topNavs: navList,
      currentNav: '01',
      goodsList: [],
      topBanner: [],
      navs: [],
      deserveitem: [],
      categories: [],
      focatitems: [],
      fq_min_id: -1,
    }
  },

  components: {
    card,
  },

  methods: {
    initData() {
      this.getNav()
      this.getBanner()
      this.getDeserveitem()
      this.getCategories()
      this.getFqcatitems()
    },
    /**
     * 获取导航
     */
    getNav() {
      service.getNav().then(data => {
        this.navs = data.datainfo
      })
    },

    /**
     * 获取上部banner
     */
    getBanner() {
      this.topBanner = banners
      // service.getBanner().then(({ data }) => {
      //   this.topBanner = data
      // })
    },

    /**
     * 获取中部滚动广告
     */
    getDeserveitem() {
      service.getDeserveitem().then(data => {
        let temp = []
        data.forEach(item => {
          temp.push(item)
          if (temp.length === 3) {
            this.deserveitem.push([...temp])
            temp = []
          }
        })
      })
    },

    /**
     * 获取广告类目
     */
    getCategories() {
      service.getCategories().then(data => {
        this.categories = data
      })
    },

    /**
     * 获取商品列表详情
     */
    getFqcatitems() {
      service.getFqcatitems({
        min_id: this.fq_min_id,
        cid: 0,
        isonline: 1,
      }).then(data => {
        this.fq_min_id = data.min_id
        this.focatitems = [...this.focatitems, ...data.data]
      })
    },

    /**
     * 导航tab
     */
    tab({ navId }) {
      this.currentNav = navId
    },

    /**
     * 跳转筛选分类页面
     */
    goSuperitem(obj, type) {
      wx.navigateTo({
        url: `/pages/superitems/main?type=${type}&data=${JSON.stringify(obj)}`,
      })
    },
  },

  onReachBottom() {
    this.getFqcatitems()
  },

  created() {
    this.initData()
  },
};
</script>

<style lang="less" src="./index.less" scoped>
</style>
