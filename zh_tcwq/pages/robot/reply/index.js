// zh_tcwq/pages/robot//reply/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    replyData:[],
    replyAddName:'',
    replyAdd:false,
    replyTc: false,
    replyTc_add:false,
    replyList:false,
    replyTc_slsz: false,
    index:0,
    index2:0,
    array: ['关闭','启用'],
    array2: ['点击选择'],
    slTemplateId:''
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
    let _this = this
    this.data.replyData.find((o, index)=>{
      if (o.template_name == this.data.array2[e.detail.value]){
        this.setData({
          slTemplateId: o.id
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/Reply/get_template_list',
      data: {
        user_id: wx.getStorageSync("user_id")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200){
          if (res.data.data.length == 0){
            _this.setData({
              wxid: wx.getStorageSync("wxid"),
              replyAdd:true,
              replyList: false,
            })
          } else {
            _this.setData({
              wxid: wx.getStorageSync("wxid"),
              replyAdd: false,
              replyList: true,
              replyData: res.data.data
            })
            let temp = _this.data.array2
            res.data.data.find((o, index) => {
              temp.push(o.template_name)
            })
            _this.setData({
              array2: temp
            })
          }
        }
      }
    })
  },
  onreplyAdd(){
    this.setData({
      replyTc: true,
      replyTc_add: true,
    })
  },
  onreplyAddCancel(){
    this.setData({
      replyTc: false,
      replyTc_add: false,
      replyAddName: ''
    })
  },
  onreplyAddDefine(){
    let _this = this
    if (this.data.replyAddName.length == 0){
      wx.showModal({
        title: '提示',
        content: '请填写模板名称后在提交！',
        success: function (res) { }
      })
    }else{
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: 'https://qlm.ql888.net.cn/api/Reply/create_template',
        data: {
          user_id: wx.getStorageSync("user_id"),
          template_name: _this.data.replyAddName
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.code == 200 && res.data.msg == 'ok') {
            wx.hideLoading()
            _this.onreplyAddCancel()
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
            _this.onLoad()
          }
        }
      })
    }
  },
  replyNameInput: function (e) {
    this.setData({
      replyAddName: e.detail.value
    })
  },
  delTemplate(e){
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确认删除当前模板？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://qlm.ql888.net.cn/api/Reply/del_template',
            data: {
              id: e.currentTarget.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.code == 200 && res.data.msg == 'ok') {
                wx.hideLoading()
                _this.onreplyAddCancel()
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                _this.onLoad()
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  addkey(e){
    wx.navigateTo({
      url: 'templateSave?id=' + e.currentTarget.dataset.id + '&name=' + e.currentTarget.dataset.name,
    })
  },
  slSave(){
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/Reply/get_private_set',
      data: {
        robot_id: _this.data.wxid,
        user_id: wx.getStorageSync("user_id")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200 && res.data.msg == 'ok') {
          _this.setData({
            index: res.data.data.enable == 0 ? 0 : 1,
            index2: 0
          })
          if (res.data.data.template.length != 0){
              _this.data.array2.find((a, index) => {
                if (a == res.data.data.template.template_name){
                  _this.setData({
                    index2: index
                  })
                }
              })
            
          }
        }
        console.log(res.data)
      }
    })
    this.setData({
      replyTc: true,
      replyTc_slsz: true,
    })
  },
  slSaveCancel(){
    this.setData({
      replyTc: false,
      replyTc_slsz: false,
    })
  },
  slSaveDefine(){
    let _this = this
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/Reply/set_private_template',
      data: {
        robot_id: _this.data.wxid,
        user_id: wx.getStorageSync("user_id"),
        template_id: _this.data.slTemplateId,
        enable: _this.data.index == 0 ? 0 : _this.data.index == 1 ? 1 : 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200){
          wx.hideLoading()
          _this.slSaveCancel()
        }
      }
    })
  },
  pageGroupList(){
    wx.navigateTo({
      url: 'groupList?id=' + this.data.wxid,
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