<template>
  <div class="commodity">
    <div class="commodity-wrapper" @click="goDetail">
      <image class="commodity-itempic" :src="commodity.itempic"/>
      <p class="commodity-title">
        <span><image class="commodity-title-icon" :src="shoptypePic"/>{{commodity.itemtitle}}</span>
      </p>
      <p class="commodity-coupon">
        <span>券后<text>{{commodity.itemendprice}}</text></span>
        <span><text class="coupon"></text><text class="money">{{commodity.couponmoney}}元</text></span>
      </p>
      <p class="commodity-share">
        <span>已售{{commodity.itemsale}}</span>
        <button class="share" open-type="share"><text class="iconfont icon-fenxiang1"></text>分享</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commodity: Object,
  },
  data() {
    return {
      shoptypePic: this.commodity.shoptype === 'C' ? 'http://pclfowczr.bkt.clouddn.com/tao.png' : 'http://pclfowczr.bkt.clouddn.com/tmall.jpeg',
    }
  },
  onShareAppMessage() {
    return {
      title: '送你一个现金大礼包',
      path: '/page/index/main',
      imageUrl: this.commodity.itempic,
    }
  },
  methods: {
    goDetail() {
      try {
        wx.setStorageSync('detail', JSON.stringify(this.commodity))
      } catch (e) {
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 1000,
        })
      }
      wx.navigateTo({
        url: '/pages/detail/main',
      })
    },
  },
};
</script>

<style lang="less" scoped>
.commodity {
  width: 49%;
  &-wrapper {
    width: 96%;
    margin: 0 2%;
    margin-bottom: 5px;
    background: #fff;
    height: 270px;;
    .commodity-itempic {
      width: 100%;
      height: 180px;
    }
  }
  &-title {
    font-size: 13px;
    width: 94%;
    margin: 0 auto;
    color: #a0a0a0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &-icon {
      width: 15px;
      height: 15px;
      border-radius:7.5px;
      position:relative;
      top:2px;
      margin-right:3px;
    }
  }
  &-coupon {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #f96150;
    display: flex;
    justify-content: space-between;
    width: 94%;
    margin: 0 auto;
    padding: 5px 0;
    align-items: center;
    border-bottom: .5px dashed #efefef;
    span:nth-child(1) {
      font-size: 13px;
      flex: 1;
      text {
        font-size: 18px;
        font-weight: bold;
      }
    }
    span:nth-child(2){
      .coupon {
        width: 17px;
        height: 16px;
        color:#fff;
        display: inline-block;
        vertical-align: top;
        background-image: url(//img.alicdn.com/tps/TB11209NpXXXXbkXpXXXXXXXXXX-17-16.png);
      }
      .money {
        border: 1px solid #f96150;
        border-left: none;
        display: inline-block;
        vertical-align: top;
        height: 14px;
        line-height: 14px;
        background-color: #FFF;
        border-radius: 0 2px 2px 0;
        padding: 0 3px;
        color: #E64D00;
      }
    }
  }
  &-share {
    font-size: 11px;
    display: flex;
    width: 94%;
    margin: 0 auto;
    margin-top: 5px;
    justify-content: space-between;
    align-items: center;
    span:nth-child(1) {
      color: #999;
    }
    .share {
      font-size: 12px;
      color: #f96150;
      padding: 1px 4px;
      border-radius: 2px;
      background: #fff4f3;
      line-height:1;
      display:inline;
      position: static;
      text {
        position: relative;
        top: 1px;
        font-size: 14px;
        margin-right: 2px;
      }
      
    }
  }
}
</style>
