var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bm_index: 0,
    bmlist: [],
    id:""
  },
  /**
   * 病种tab切换
   */
  changeTabbar(e) {
    this.setData({
      bm_index: e.currentTarget.dataset.id
    })
  },
  bmtg(e) {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确认审核通过当前用户？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading()
          app.util.request({
            url: "entry/wxapp/Okjoin",
            cachetime: "0",
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (e) {
              console.log(e)
              if (e.data.code == 200) {
                wx.hideLoading()
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                _this.getDate()
              }

            }
          });
        }
      }
    })
  },
  bmju(e) {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确认拒绝通过当前用户？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading()
          app.util.request({
            url: "entry/wxapp/NOjoin",
            cachetime: "0",
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (e) {
              console.log(e)
              if (e.data.code == 200) {
                wx.hideLoading()
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                _this.getDate()
              }

            }
          });
        }
      }
    })
  },
  bmsc(e) {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确认删除当前用户？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading()
          app.util.request({
            url: "entry/wxapp/Deletejoin",
            cachetime: "0",
            data: {
              id: e.currentTarget.dataset.id
            },
            success: function (e) {
              console.log(e)
              if (e.data.code == 200) {
                wx.hideLoading()
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                _this.getDate()
              }

            }
          });
        }
      }
    })
  },
  getDate(){
    let _this = this
    app.util.request({
      url: "entry/wxapp/Getjoinlist",
      cachetime: "0",
      data: {
        id: _this.data.id
      },
      success: function (e) {
        console.log(e)
        if (e.data.code == 200) {
          _this.setData({
            bmlist: e.data.msg
          })
        }

      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let _this = this
    _this.setData({
      id:options.id
    })
    _this.getDate()
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