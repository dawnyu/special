<template>
  <div class="wrapper">
    <div class="filtrate">
      <view v-for="c in columns" :class="{'actived': c.sort === actived}" @click="filtrate(c)" :key="c.sort">{{c.name}}</view>
    </div>
    <div class="recommend">
      <card :commodity="item" v-for="item in items" :key="item.itemid" />
    </div>
  </div>
</template>

<script>
import { columnitem } from '@/utils/constants'
import service from '@/api/service'
import card from '@/components/card'

export default {
  data() {
    return {
      columns: columnitem,
      actived: 0,
      params: {
        isonline: 1,
        sort: 0,
        min_id: -1,
      },
      itemType: 'nav',
      items: [],
      api: {
        nav: 'getSubnavitems',
        keyword: 'getKeyworditems',
        column: 'getColumnitems',
      },
    }
  },
  onLoad(option) {
    this.itemType = option.type
    const data = JSON.parse(option.data)
    wx.setNavigationBarTitle({
      title: data.name,
    })
    switch (this.itemType) {
      case 'nav':
        this.params.nav = data.nav_id * 1
        break;
      case 'keyword':
        this.params.keyword = data.keyword
        this.params.cid = -1
        break;
      case 'column':
        this.params.column_type = data.category_id
        this.params.cid = -1
        break;
      default:
    }
  },

  onReachBottom() {
    this.getItems()
  },

  mounted() {
    this.getItems()
  },

  components: {
    card,
  },

  methods: {
    getItems() {
      service[this.api[this.itemType]].call(service, this.params).then(data => {
        this.items = [...this.items, ...data.data]
        this.params.min_id = data.min_id
      })
    },

    /**
     * 筛选
     */
    filtrate({ sort }) {
      this.actived = sort
      this.params.sort = sort
      this.params.min_id = -1
      this.items = []
      this.getItems()
    },
  },
};
</script>

<style lang="less" src="./index.less" scoped>
</style>
