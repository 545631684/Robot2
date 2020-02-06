// zh_tcwq/pages/robot//pluginsShop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plugins:[]
  },
  pluginsInfo(e){
    wx.navigateTo({
      url: 'pluginsInfo?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: 'http://qlm.ql888.net.cn/api/QianLu/get_all_plugins',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res3) {
        console.log(res3.data)
        _this.setData({
          plugins: res3.data.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})