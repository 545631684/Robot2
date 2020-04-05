// zh_tcwq/pages/robot//reply/groupList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxid:'',
    qpwxid:'',
    groupList:[],
    index2: 0,
    replyData: ['点击选择'],
    slTemplateId:'',
    tc:false,
    switch1Checked: false,
  },
  switch1Change(e){
    console.log(e.detail.value)
    let _this = this
    this.setData({
      switch1Checked: e.detail.value
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/Reply/set_private_template',
      data: {
        robot_id: _this.data.wxid,
        user_id: wx.getStorageSync("users").id,
        template_id: wx.getStorageSync("users").id,
        enable: _this.data.switch1Checked ? 1 : 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(ress) {
        if (ress.code == 200) {
          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  switch1Change2(e){
    console.log(e.detail.value)
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/Reply/set_group_template',
      data: {
        robot_id: _this.data.wxid,
        user_id: wx.getStorageSync("users").id,
        wx_id: e.currentTarget.dataset.wxid,
        template_id: wx.getStorageSync("users").id,
        enable: e.detail.value ? 1 : 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(ress) {
        console.log(ress)
        if (ress.data.code == 200){
          wx.showToast({
            title: ress.data.msg,
            icon: 'success',
            duration: 2000
          })
          _this.getgroupListData()
        }
      }
    })
  },
  ongroupCancel(){
    this.setData({
      tc:false
    })
  },
  ongroupDefine(){
    let _this = this
    if (this.data.index2 == 0){
      wx.showModal({
        title: '提示',
        content: '请选择模板后再提交',
        success: function (res) {}
      })
    } else {
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: 'https://qlm.ql888.net.cn/api/Reply/set_group_template',
        data: {
          robot_id: _this.data.wxid,
          user_id: wx.getStorageSync("user_id"),
          wx_id: _this.data.qpwxid,
          template_id: _this.data.slTemplateId.id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.hideLoading()
          if (res.data.code == 200) {
            wx.showToast({
              title: '设置成功',
              icon: 'success',
              duration: 2000
            })
          } else if (res.data.code == 500) {
            wx.showModal({
              title: '提示',
              content: '设置失败',
              success: function (res) { }
            })
          }
          _this.ongroupCancel()
          _this.getgroupListData()
        }
      })
    }
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
    let _this = this
    this.data.replyData2.find((o, index) => {
      if (o.template_name == _this.data.replyData[e.detail.value]) {
        _this.setData({
          slTemplateId: o
        })
      }
    })
  },
  saveTemplate(e){
    let _this = this
    wx.showActionSheet({
      itemList: ['设置模板'],
      success: function (res) {
        if (res.tapIndex == 0) {
         _this.setData({
           tc:true,
           qpwxid: e.currentTarget.dataset.wxid
         })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  getgroupListData(){
    let _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/robot_opt',
      data: {
        robot_id: _this.data.wxid,
        method: 'get_group_list',
        with:'template'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code == 200) {
          _this.setData({
            groupList: res.data.data
          })
          wx.request({
            url: 'https://qlm.ql888.net.cn/api/Reply/get_private_set',
            data: {
              robot_id: _this.data.wxid,
              user_id: wx.getStorageSync("users").id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(ress) {
              console.log(ress)
              _this.setData({
                switch1Checked: ress.data.data.enable == 1 ? true : false
              })
            }
          })
          
        } else if (res.data.code == 500){
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wxid: options.id
    })
    this.getgroupListData()
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