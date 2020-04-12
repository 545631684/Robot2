// zh_tcwq/pages/robot//activity/activityList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityAdd: false,
    activityList: false,
    activityTc: false,
    nav:true,
    activityData:[],
    userActivityData:[],
    index: 0,
    userActivityId: null,
    arrayhd: ['选择推送活动'],
    startDate:'活动开始日期',
    endDate:'活动结束日期',
    activityAddName:'',
    navColor:"#8A8A8A",
  },
  activityNameInput: function (e) {
    this.setData({
      activityAddName: e.detail.value
    })
  },
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    let _this = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      activityAddName: _this.data.arrayhd[_this.data.index],
      startDate: _this.data.userActivityData[_this.data.index].start_time,
      endDate: _this.data.userActivityData[_this.data.index].end_time,
    })
    _this.data.userActivityData.find((o,index)=>{
      if (o.title == _this.data.arrayhd[_this.data.index]){
        _this.setData({
          userActivityId: o.id
        })
      }
    })
  },
  activityAddCancel(){
    if (this.data.activityData.length == 0){
      this.setData({
        activityAdd: true,
        activityList: false,
        activityTc: false,
      })
    } else {
      this.setData({
        activityAdd: false,
        activityList: true,
        activityTc: false,
      })
    }
    this.setData({
      index: 0,
      startDate: '活动开始日期',
      endDate: '活动结束日期',
      activityAddName: '',
      navColor: "#8A8A8A",
      nav:true,
    })
  },
  activityAddDefine(){
    let _this = this
    if (this.data.activityAddName.length == 0){
      wx.showModal({
        title: '提示',
        content: '请填写活动名称',
        success: function (res) { }
      })
    } else if (this.data.startDate == '活动开始日期'){
      wx.showModal({
        title: '提示',
        content: '请选择活动开始日期',
        success: function (res) { }
      })
    } else if (this.data.endDate == '活动结束日期') {
      wx.showModal({
        title: '提示',
        content: '请选择活动结束日期',
        success: function (res) { }
      })
    } else if (this.data.index == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择商铺活动',
        success: function (res) { }
      })
    } else{
      wx.showLoading({
        title: '提交中',
      })

      wx.request({
        url: 'https://qlm.ql888.net.cn/api/Scheduled/add',
        data: {
          user_id: wx.getStorageSync("robotUser_id"),
          title: _this.data.activityAddName,
          start_time: _this.data.startDate + ' 00:00',
          end_time: _this.data.endDate + ' 00:00',
          activity_id: _this.data.userActivityId,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(ress) {
          if (ress.data.code == 200) {
            wx.hideLoading()
            _this.gitData()
          }
        }
      })
    }
    this.activityAddCancel()
  },
  gitData(){
    let _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/Scheduled/list',
      data: {
        user_id: wx.getStorageSync("robotUser_id")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200 && res.data.msg == 'ok') {
          wx.hideLoading()
          wx.request({
            url: 'https://wechat.ql888.net/apichange.php',
            data: {
              store_id: wx.getStorageSync("sjdsjid")
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(ress) {
              if (ress.data.code == 200) {
                wx.hideLoading()
                let arrayhd = ['选择推送活动'], activityData = res.data.data
                ress.data.msg.find((o, index) => {
                  arrayhd.push(o.title)
                })
                if (activityData.length != 0){
                  activityData.find((o, index) => {
                    ress.data.msg.find((x, index2) => {
                      o.activity_id == x.id ? o.activity_title = x.title : o.activity_id = o.activity_id
                    })
                  })
                }
                _this.setData({
                  userActivityData: ress.data.msg,
                  arrayhd: arrayhd,
                  activityData: activityData
                })
                if (activityData.length == 0) {
                  _this.setData({
                    activityAdd: true,
                    activityList: false,
                    activityTc: false,
                  })
                } else {
                  _this.setData({
                    activityAdd: false,
                    activityList: true,
                    activityTc: false,
                  })
                }
              }
            }
          })
        }
      }
    })
  },
  onactivityAdd(){
    if (this.data.userActivityData.length == 0){
      wx.showModal({
        title: '提示',
        content: '请在商铺下添加活动后再来添加',
        success: function (res) { }
      })
    } else{
      this.setData({
        activityAdd: false,
        activityList: true,
        activityTc: true,
        nav:false,
        navColor:"#002AFF"
      })
    }
  },
  activitySvae(e){
    let _this = this
    wx.showModal({
      title: "删除活动",
      content:"是否删除当前活动",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://qlm.ql888.net.cn/api/Scheduled/del',
            data: {
              user_id: wx.getStorageSync("robotUser_id"),
              id: e.currentTarget.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(ress) {
              if (ress.data.code == 200) {
                _this.gitData()
              }
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  pageGroupList(){
    wx.navigateTo({
      url: 'setActivityUp',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gitData()
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