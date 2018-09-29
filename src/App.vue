<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    console.log('app created and cache logs by setStorageSync');
  },
};
</script>

<style>
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
input::-webkit-input-placeholder{
  color:#fff;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
  color:#fff;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
  color:#fff;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
  color:#fff;
}

</style>
