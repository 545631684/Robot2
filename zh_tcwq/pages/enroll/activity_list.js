var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bm_index:0
  },
  /**
   * 病种tab切换
   */
  changeTabbar(e) {
    this.setData({
      bm_index: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.util.request({
      url: "entry/wxapp/Getjoinlist",
      cachetime: "0",
      data:{
        id:options.id
      },
      success: function (e) {
          console.log(e)
      }
  });
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