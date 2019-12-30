// pages/information/dingyue.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dingyue: [
      { radio: false, text: '博客1' },
      { radio: false, text: '博客12' },
      { radio: false, text: '博客1' },
      { radio: false, text: '博客2' },
      { radio: false, text: '博客3' },
      { radio: false, text: '博客4' },
      { radio: false, text: '博客5' },
      { radio: false, text: '博客6' },
      { radio: false, text: '博客7' },
      { radio: false, text: '博客8' },
    ],
    radioAll: false,
    confirmButton: '',
    title: "",
    titlecon: ""
  },
  /**
     * radio单选按钮的切换效果
     */
  setRadio: function (e) {
    let index = e.currentTarget.dataset.index, img = e.currentTarget.dataset.img, radio = e.detail.value, t = this, dingyue = this.data.dingyue
    index === img ? dingyue[index].radio = false : dingyue[index].radio = radio ? false : true
    this.setData({
      dingyue: dingyue
    })
  },
  /**
   * radioAll单选按钮的切换效果
   */
  setRadioAll: function (e) {
    let index = e.currentTarget.dataset.index, img = e.currentTarget.dataset.img, radioAll = false, dingyue = this.data.dingyue
    index === img ? radioAll = false : radioAll = true
    dingyue.find((o, index) => {
      o.radio = radioAll
    })
    this.setData({
      radioAll: radioAll,
      dingyue: dingyue
    })
  },
  confirmButton() {
    console.log('删除/添加订阅设置')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.pageOnLoad2(this)
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      confirmButton: options.name == '订阅' ? '确定订阅' : '删除订阅',
      title: options.name == '订阅' ? '请设置订阅内容' : '我的订阅',
      titlecon: options.name == '订阅' ? '设置行业后，该行业新增的商家信息会及时通知' : '可删除自己不需要订阅内容',
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