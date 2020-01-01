// zh_tcwq/personal/setdaidan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cslist: [],
    cdTitle: "",
    cdCon: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gitcaidanList()
  },
  gitcaidanList: function () {
    let _this = this
    wx.request({
      url: 'https://go.ql888.net.cn/api/wx/getUserKeywords',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        user_id: wx.getStorageSync("users").id
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          _this.setData({
            cslist: res.data.data
          })
        }
      }
    })
  },

  deleteCd: function (e) {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确定要删除当前菜单？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://go.ql888.net.cn/api/wx/delUserKeyword',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              key_id: e.currentTarget.dataset.id
            },
            success(res) {
              if (res.data.code == 200) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                _this.gitcaidanList()
              }
            }
          })
        }
      }
    })
    console.log(e.currentTarget.dataset.id)
  },
  getCdTitle: function (e) {
    this.setData({
      cdTitle: e.detail.value
    })
  },
  getCdCon: function (e) {
    this.setData({
      cdCon: e.detail.value
    })
  },
  addcaidan: function (e) {
    let _this = this
    console.log(_this.data)
    if (_this.data.cdTitle.length !== 0 && _this.data.cdCon.length !== 0) {
      wx.request({
        url: 'https://go.ql888.net.cn/api/wx/createUserKeywords',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          user_id: wx.getStorageSync("users").id,
          key: _this.data.cdTitle,
          value: _this.data.cdCon
        },
        success(res) {
          console.log(res.data)
          if (res.data.code == 200) {
            _this.gitcaidanList()
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入关键词和内容后再添加',
        success: function (res) {
        }
      })
    }

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