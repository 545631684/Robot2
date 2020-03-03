// pages/information/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ai_index: 0,
    searchHtml: false,
    searchText: "",
  },
  /**
   * 病种tab切换
   */
  changeTabbar(e) {
    this.setData({
      ai_index: e.currentTarget.dataset.id
    })
  },
  /**
   * 搜索框开启
   */
  search() {
    this.setData({
      searchHtml: true
    })
  },
  /**
   * 搜索框中的值
   */
  getInput: function (e) {
    var val = e.detail.value;
    this.setData({
      searchText: val
    });
  },
  /**
   * 提交搜索数据
   */
  searchData() {
    let t = this
    wx.showLoading({
      title: '搜索中。。。',
      icon: 'loading',
      mask: true,//是否显示透明蒙层，防止触摸穿透，默认：false 
    })
    let type = this.data.ai_index == 0 ? '大数据' : '数据海', largeData = this.data.largeData, seaData = this.data.seaData
    if (type == '大数据') {
      wx.request({
        url: 'https://go.ql888.net.cn/api/wx/searchGroups',
        data: {
          keyword: t.data.searchText
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.code == 200) {
            wx.hideLoading()
            t.setData({
              searchHtml: false,
              largeData: {
                tongji: largeData.tongji,
                list: res.data.data.data
              }
            })
          }
        }
      })
    } else if (type == '数据海') {
      wx.request({
        url: 'https://go.ql888.net.cn/api/wx/oceansSearch',
        data: {
          keyword: t.data.searchText
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.code == 200) {
            wx.hideLoading({
              success: function () {
                t.setData({
                  searchHtml: false,
                  seaData: {
                    tongji: seaData.tongji,
                    list: res.data.data
                  }
                })
              }
            })
          }
        }
      })
    }
  },
  dingyuePage() {
    wx.navigateTo({
      url: "dingyue?name=订阅"
    });
  },
  mydingyuePage() {
    wx.navigateTo({
      url: "dingyue?name=我的订阅"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.pageOnLoad(this)
    let _this = this
    wx.request({
      url: 'https://go.ql888.net.cn/api/wx/groups',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          _this.setData({
            largeData: { tongji: res.data.data.tongji, list: res.data.data.list.data}
          })
        }
      }
    })
    wx.request({
      url: 'https://go.ql888.net.cn/api/wx/oceans',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          _this.setData({
            seaData: { tongji: res.data.data.tongji, list: res.data.data.list.data }
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