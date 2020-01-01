// pages/ai/ai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ai_index: 0,
    txt: [2, 20.4],
    keywordAll: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this
    wx.request({
      url: 'https://go.ql888.net.cn/api/wx/getUserKeywordsStatus',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          t.setData({
            keywordAll: res.data.data
          })
          console.log(res.data.data)
        }
      }
    })
  },

  /**
     * 病种tab切换
     */
  changeTabbar(e) {
    this.setData({
      ai_index: e.currentTarget.dataset.id
    })
  },
  aaa: function (num) {
    let a = 0
    num > 50 ? a = 1 + ((num - 50) / 100) : a = Math.abs((num - 50) / 100)
    return a
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获得circle组件
    this.circle1 = this.selectComponent("#circle1");
    this.circle2 = this.selectComponent("#circle2");
    // 绘制背景圆环
    this.circle1.drawCircleBg('circle_bg1', 100, 12.5)
    this.circle2.drawCircleBg('circle_bg2', 100, 12.5)
    // 绘制彩色圆环 
    this.circle1.drawCircle('circle_draw1', 100, 12.5, this.aaa(this.data.txt[0]), ['#45EEC1', '#31D8AC', '#43EE96']);
    this.circle2.drawCircle('circle_draw2', 100, 12.5, this.aaa(this.data.txt[1]), ['#45EEC1', '#31D8AC', '#43EE96']);
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