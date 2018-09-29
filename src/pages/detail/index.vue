<template>
  <div class="wrapper">
    <div class="item-pics">
      <swiper indicator-dots="true">
        <block v-for="(image, index) in detail.taobao_image" :key="index">
          <swiper-item>
            <image :src="image" class="slide-image" height="500"/>
          </swiper-item>
        </block>
      </swiper>
     <view class="item-info">
      <p class="title">
        <image class="title-icon" :src="shoptypePic"/>
        {{detail.itemtitle}}
      </p>
      <view class="coupon-price">券后包邮 <text>{{detail.itemendprice}}</text></view>
      <view class="coupon-info">
        <rich-text v-html="itempriceLabel"></rich-text>
        <view><text class="iconfont icon-youhuiquan"></text>{{detail.couponmoney}}元</view>
        <span><text>销量{{detail.itemsale}}</text></span>
      </view>
      <div class="itemdesc">
        <view class="desc-t">推荐理由</view>
        <view class="desc-info">{{detail.itemdesc}}</view>
      </div>
    </view>
    <div class="show-more">
      <text v-show="!isunfold" @click="showMore">查看更多详情</text>
    </div>
    <image :src="src" v-for="(src, index) in itempicdesc" mode="widthFix" :key="index"/>
    </div>
  </div>
</template>

<script>
import service from '@/api/service'

export default {
  data() {
    return {
      detail: {},
      itempicdesc: '',
      isunfold: false,
      shoptypePic: null,
      itempriceLabel: '',
    }
  },

  created() {
    this.detail = JSON.parse(wx.getStorageSync('detail'))
    this.shoptypePic = this.detail.shoptype === 'C' ? 'http://pclfowczr.bkt.clouddn.com/tao.png' : 'http://pclfowczr.bkt.clouddn.com/tmall.jpeg'
    this.itempriceLabel = `<del>在售价${this.detail.itemprice}<del>`
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: this.detail.itemshorttitle,
    })
  },

  onPageScroll() {
    if (!this.isunfold) {
      this.isunfold = true
      this.getItemDescx()
    }
  },

  methods: {
    getItemDescx() {
      service.getItemDescx({
        data: `{ item_num_id: ${this.detail.itemid} }`,
      }).then(data => {
        this.itempicdesc = data.data.images
      })
    },
    showMore() {
      this.isunfold = true
      this.getItemDescx()
    },
  },
};
</script>

<style lang="less" src="./index.less" scoped>
</style>
