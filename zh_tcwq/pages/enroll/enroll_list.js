var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_id: '',
    hdlist: [],
    countries: []
  },
  shlb() {
    wx.navigateTo({
      url: "examine_list"
    });
  },
  bmlb(e) {
    wx.navigateTo({
      url: "activity_list?id=" + e.currentTarget.dataset.id
    });
  },
  hdupdate(e) {
    wx.navigateTo({
      url: "enroll_save?id=" + e.currentTarget.dataset.id + "&store_id=" + this.data.store_id
    })
  },
  hddel(e) {
    let t = this
    wx.showModal({
      title: '提示',
      content: '确定删除当前活动吗？',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在删除...',
          })
          app.util.request({
            url: "entry/wxapp/Deletecativity",
            cachetime: "0",
            data: {
              store_id: t.data.store_id,
              id: e.currentTarget.dataset.id
            },
            success: function (e) {
              if (e.data.code == 200) {
                app.util.request({
                  url: "entry/wxapp/Getcativitylist",
                  cachetime: "0",
                  data: {
                    store_id: t.data.store_id
                  },
                  success: function (e) {
                    console.log(e.data.msg), t.setData({
                      hdlist: e.data.msg
                    });
                  }
                })
                wx.hideLoading()
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this
    this.setData({
      store_id: options.store_id
    })
    app.util.request({
      url: "entry/wxapp/Getcativitylist",
      cachetime: "0",
      data: {
        store_id: t.data.store_id
      },
      success: function (e) {
        console.log(e.data.msg), t.setData({
          hdlist: e.data.msg
        }), app.util.request({
          url: "entry/wxapp/Getacttype",
          cachetime: "0",
          success: function (e) {
            if (e.data.msg.length != 0) {
              t.setData({
                countries: e.data.msg
              })
              let hdlist = t.data.hdlist,
                typeName = {}
              hdlist.find((o, index) => {
                let typeName = t.data.countries.find((n, tindex) => {
                  if (o.type_id === n.id) {
                    return n
                  }
                  console.log(o)
                }).type_name
                o.type_id = typeName
              })
              t.setData({
                hdlist: hdlist
              })
            }
          }
        });
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