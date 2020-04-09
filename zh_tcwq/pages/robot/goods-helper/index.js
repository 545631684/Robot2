// zh_tcwq/pages/robot//subscribe/index.js
var app = getApp(), util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_id:0,
    keywords:'',
    reply: '',
    status:0,
  },
  statusChange: function (e) {
    this.setData({
      status: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    let _this = this
    this.setData({
      store_id:options.store_id,
      subscribeTc: false,
      subscribeCr: false,
      subscribeTc_add: false,
      subscribeCr_add: false
    })
    _this.setData({
      robotId: wx.getStorageSync("wxid"),
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/ShopHelper/get_enable',
      data: {
        store_id: _this.data.store_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200 && res.data.msg == 'ok') {
            _this.setData({
              keywords:res.data.data.start,
              reply:res.data.data.tips,
              status:res.data.data.enable
            });
        }
      }
    })
  
  },

  submit(){
    let _this = this
    if (this.data.keywords.length == 0){
      wx.showModal({
        title: '提示',
        content: '请填写关键词后在提交！',
        success: function (res) { }
      })
      return
    }
    if (this.data.reply.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写回复内容后在提交！',
        success: function (res) { }
      })
      return
    }
    let enable = 0;
    if (_this.data.status) {
      enable = 1;
    }
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/ShopHelper/set_enable',
      data: {
        robot_id: _this.data.robotId,
        enable:enable,
        start:_this.data.keywords,
        tips:_this.data.reply,
        store_id: _this.data.store_id,
        user_id: wx.getStorageSync("robotUser_id")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200 && res.data.msg == 'ok') {
          wx.hideLoading()
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          //_this.onLoad()
          wx.redirectTo({
            url: 'index?store_id=' + _this.data.store_id,
          })
        }
      },
      fail(res) {
        wx.hideLoading()
      }
    })
  
},
  keyInput: function (e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  replyInput: function (e) {
    this.setData({
      reply: e.detail.value
    })
  },
 
  
  getSubscribeMessage(){
    wx.navigateTo({
      url: 'showMessage',
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