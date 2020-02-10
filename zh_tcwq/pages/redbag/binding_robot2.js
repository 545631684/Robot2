// zh_tcwq/pages/redbag//binding_robot2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    div1: false,
    div2: false,
  },
  searchBox: function (e) {
    const that = this;
    that.setData({
      email: e.detail.value.email,
      password: e.detail.value.password,
      name: e.detail.value.name
    })
    if (this.data.div1){
      if (this.data.email.length == 0){
        wx.showModal({
          title: "提示",
          content: "请输入账号",
          showCancel: false,
          success: function (e) {}
        })
      } else if (this.data.password.length == 0){
        wx.showModal({
          title: "提示",
          content: "请输入密码",
          showCancel: false,
          success: function (e) { }
        })
      } else{
        wx.request({
          url: 'https://qlm.ql888.net.cn/api/QianLu/bindUser',
          data:{
            open_id: wx.getStorageSync("openid"),
            email: that.data.email,
            password: that.data.password,
            nickname:wx.getStorageSync("users").name
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            wx.showModal({
              title: "提示",
              content: res.data.msg,
              success: function (e) {
                wx.navigateTo({
                  delta: 1
                })
              }
            })
            console.log(res)
          }
        })
      }
    }

    if (this.data.div2) {
      if (this.data.email.length == 0) {
        wx.showModal({
          title: "提示",
          content: "请输入账号",
          showCancel: false,
          success: function (e) { }
        })
      } else if (this.data.password.length == 0) {
        wx.showModal({
          title: "提示",
          content: "请输入密码",
          showCancel: false,
          success: function (e) { }
        })
      } else if (this.data.name.length == 0) {
        wx.showModal({
          title: "提示",
          content: "请输入昵称",
          showCancel: false,
          success: function (e) { }
        })
      } else {
        wx.request({
          url: 'https://qlm.ql888.net.cn/api/QianLu/register',
          data: {
            open_id: wx.getStorageSync("openid"),
            email: that.data.email,
            password: that.data.password,
            name: that.data.name,
            nickname:wx.getStorageSync("users").name
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            wx.showModal({
              title: "提示",
              content: res.data.msg,
              success: function (e) {
                wx.navigateTo({
                  delta: 1
                })
              }
            })
            console.log(res)
          }
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.type == 1 ? this.setData({ div1: true }) : this.setData({ div2: true })
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