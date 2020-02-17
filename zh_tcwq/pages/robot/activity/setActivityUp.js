// zh_tcwq/pages/robot//activity/setActivityUp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxgroupList:[],
    qqgroupList:[],
    selectionWX:[],
    selectionQQ:[],
    selectionDate:[],
    ai_index:0,
    switchDate:null,
    items: [
      { name: '开启', value: '1' },
      { name: '关闭', value: '0' },
    ],
    dateList:[
      { name: '周一', value:'1'},
      { name: '周二', value:'2'},
      { name: '周三', value:'3'},
      { name: '周四', value:'4'},
      { name: '周五', value:'5'},
      { name: '周六', value:'6'},
      { name: '周日', value:'0'},
    ],
    time: '请选择开始时间'
  },
  getData(){
    console.log('获取')
    let _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/robot_opt',
      data: {
        robot_id: wx.getStorageSync("wxid"),
        method: 'get_group_list',
        with: 'template'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code == 200) {
          _this.setData({
            wxgroupList: res.data.data
          })
          wx.request({
            url: 'https://qlm.ql888.net.cn/api/Scheduled/get_setting',
            data: {
              user_id: wx.getStorageSync("user_id"),
              robot_id: wx.getStorageSync("wxid"),
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res2) {
              let dateList = _this.data.dateList, wxgroupList = _this.data.wxgroupList, items = _this.data.items
              if (res2.data.data.group_ids != null){
                res2.data.data.group_ids.split(',').find((o, index) => {
                  wxgroupList.find((e,index2)=>{
                    e.wxid == o ? e.checked = true : e = e
                  })
                })
              }
              if (res2.data.data.start_date != null) {
                res2.data.data.start_date.split(',').find((o, index) => {
                  dateList.find((e, index2) => {
                    e.value == o ? e.checked = true : e = e
                  })
                })
              }
              console.log(res2.data.data.enable)
              if (res2.data.data.enable == 0){
                items = [
                  { name: '开启', value: '1' },
                  { name: '关闭', value: '0', checked: 'true'},
                ]
              } else {
                items = [
                  { name: '开启', value: '1', checked: 'true' },
                  { name: '关闭', value: '0' },
                ]
              }
              _this.setData({
                time: res2.data.data.start_time,
                items: items,
                wxgroupList: wxgroupList,
                dateList: dateList,
              })
              
            }
          })
          
        } else if (res.data.code == 500) {
          wx.showModal({
            title: '提示',
            content: '机器人离线或者不存在，请启动后再来设置',
            success: function (res) {
              wx.navigateBack({
                delta: 2,
              });
            }
          })
        }
      }
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      switchDate: e.detail.value
    })
  },
  checkboxChangeDate: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      selectionDate: e.detail.value
    })
  },
  checkboxChangeQQ: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      selectionQQ: e.detail.value
    })
  },
  checkboxChangeWX: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      selectionWX: e.detail.value
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
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  setActivityUp(){
    console.log('提交')
    let _this = this
    if (_this.data.selectionDate.length == 0) {
      let selectionDate = []
      _this.data.dateList.find((o, index) => {
        o.checked ? selectionDate.push(o.value) : o = o
      })
      _this.setData({
        selectionDate: selectionDate
      })
    }
    if (_this.data.selectionWX.length == 0){
      let selectionWX = []
      _this.data.wxgroupList.find((o, index) => {
        o.checked ? selectionWX.push(o.wxid) : o = o
      })
      _this.setData({
        selectionWX: selectionWX
      })
    }
    if (_this.data.switchDate == null){
      _this.data.items.find(o=>{
        if (o.checked){
          _this.setData({
            switchDate: o.value
          })
        }
      })
    }

    if (_this.data.switchDate == 0){
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: 'https://qlm.ql888.net.cn/api/Scheduled/setting',
        data: {
          user_id: wx.getStorageSync("user_id"),
          robot_id: wx.getStorageSync("wxid"),
          group_ids: _this.data.selectionWX.toString(),
          enable: _this.data.switchDate,
          start_time: _this.data.time == '请选择开始时间' ? '' : _this.data.time,
          start_date: _this.data.selectionDate.toString(),
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res2) {
          wx.hideLoading()
          if (res2.data.code == 200) {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack({
              delta: 1,
            });
          }
        }
      })
    }
    
    if (_this.data.switchDate == 1) {
      if (_this.data.time == '请选择开始时间') {
        wx.showModal({
          title: '提示',
          content: '请选择开始时间',
          success: function (res) { }
        })
      } else if (_this.data.selectionDate.length == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择开推送日期，最少选择一天',
          success: function (res) { }
        })
      } else {
        wx.showLoading({
          title: '提交中',
        })
        wx.request({
          url: 'https://qlm.ql888.net.cn/api/Scheduled/setting',
          data: {
            user_id: wx.getStorageSync("user_id"),
            robot_id: wx.getStorageSync("wxid"),
            group_ids: _this.data.selectionWX.toString(),
            enable: _this.data.switchDate,
            start_time: _this.data.time,
            start_date: _this.data.selectionDate.toString(),
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res2) {
            wx.hideLoading()
            if (res2.data.code == 200){
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              wx.navigateBack({
                delta: 1,
              });
            }
          }
        })
      }
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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