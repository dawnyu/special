import fly from './fly'

class Service {
  getNav() {
    return fly.get('https://api.hykefu.cn/wxapp/api_get_nav')
  }

  getBanner() {
    return fly.get('https://api.hykefu.cn/wxapp/api_get_banner')
  }

  getDeserveitem() {
    return fly.get('https://api.haodanku.com/app/get_deserve_item')
  }

  getCategories() {
    return fly.get('https://api.hykefu.cn/wxapp/api_get_categories')
  }

  getFqcatitems(params) {
    return fly.post('https://api.haodanku.com/app/get_fqcat_items', params)
  }

  getSubnavitems(params) {
    return fly.post('https://api.haodanku.com/app/get_sub_nav_items', params)
  }

  getKeyworditems(params) {
    return fly.post('https://api.haodanku.com/app/get_keyword_items', params)
  }

  getColumnitems(params) {
    return fly.post('https://api.haodanku.com/app/get_column_items', params)
  }

  getItemDescx(params) {
    return fly.get('https://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1', params)
  }
}

export default new Service()
