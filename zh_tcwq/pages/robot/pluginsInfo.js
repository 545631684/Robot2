// zh_tcwq/pages/robot//pluginsInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    plugins:{},
    anzhuang:false
  },
  pluginsAZ(e){
    wx.showLoading({
      title: "安装中。。。"
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/install_app',
      data: {
        user_id: wx.getStorageSync("user_id"),
        plugin_id: e.currentTarget.dataset.id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res3) {
        console.log(res3.data)
        if (res3.data.code == 200 && res3.data.msg == "恭喜，插件安装成功" ) {
          wx.hideLoading()
          wx.showToast({
            title: res3.data.msg,
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    this.setData({
      id: options.id
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/get_app_detail',
      data: {
        plugin_id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res3) {
        console.log(res3.data)
        if (res3.data.code == 200){
          _this.setData({
            plugins: res3.data.data
          })
          wx.request({
            url: 'https://qlm.ql888.net.cn/api/QianLu/get_user_plugins',
            data: {
              user_id: wx.getStorageSync("user_id")
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res2) {
              res2.data.data.find((o, index)=>{
                if (o.plugin_id == _this.data.id){
                  _this.setData({
                    anzhuang:true
                  })
                }
              })
            }
          })
        }
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