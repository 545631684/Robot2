// zh_tcwq/pages/robot//subscribe/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subscribeData:[],
    subscribeAddwxId:null,
    subscribeAddwxName: '',
    subscribeAddKey:'',
    contractWxId: '',
    contractStatus:0,
    subscribeAdd:false,
    subscribeTc: false,
    subscribeCr: false,
    subscribeTc_add:false,
    subscribeCr_add: false,
    subscribeList:false,
    subscribeTc_slsz: false,
    markShow:false,
    index:0,
    index2:0,
    robotId:'',
    isShowList:false,
    wxList:'',
    originalList: '',
    array: ['关闭','启用'],
    array2: ['点击选择'],
    slTemplateId:'',
    nav1:true,
    nav2: true,
    nav3: true,
    nav4: true,
    msgNum: 0,
    tkNum: 0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  change:function (e){
    let index = e.currentTarget.dataset.id;
    if(index === "1"){
      this.setData({
        nav1: false,
        nav2:true,
        nav3:true,
        nav4: true,
      })
    }else if(index === "2"){
      this.setData({
        nav1: true,
        nav2: false,
        nav3: true,
        nav4: true,
      })
    }else if(index === "3"){
      this.setData({
        nav1: true,
        nav2: true,
        nav3: false,
        nav4: false,
      })
    }
  },
  showList:function () {
    this.setData({
      isShowList:true
    })
  },
  hideList: function () {
    this.setData({
      subscribeTc_add: true,
      isShowList: false,
    })
  },
  bindSelect: function (e) {
    this.setData({
      isShowList: false
    })
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    
    console.log(e)

    if (id != '0' || id != 0 || !id) {
      this.setData({
        subscribeAddwxId:id,
        subscribeAddwxName:name
      })
    }
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
    let _this = this
    this.data.subscribeData.find((o, index)=>{
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
    this.setData({
      markShow:false,
      subscribeTc: false,
      subscribeCr: false,
      subscribeTc_add: false,
      subscribeCr_add: false
    })
    _this.setData({
      robotId: wx.getStorageSync("wxid"),
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/House/get_list',
      data: {
        robot_id: _this.data.robotId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200){
          if (res.data.data.length == 0){
            _this.setData({
              subscribeAdd:true,
              subscribeList: false,
            })
          } else {
            _this.setData({
              subscribeAdd: false,
              subscribeList: true,
              subscribeData: res.data.data
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
    this.getWxList();
    this.getContractInfo();
    this.getData();
  },
  getData: function () {
    console.log(111);
    let _this = this;
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/House/getData',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200 && res.data.msg == 'ok') {
          _this.setData({
            msgNum: res.data.data.msg,
            tkNum: res.data.data.tk
          })
        }
      }
    })
  },
  getWxList:function () {
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/robot_opt',
      data: {
        method: 'get_friend_list',
        robot_id: _this.data.robotId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        
        if (res.data.code == 200) {
          if (res.data.data.length > 0) {
            _this.setData({
              wxList: res.data.data,
              originalList: res.data.data
            })
          } else {
            let arr = []
            arr.push({
              'nickname': '暂无好友',
              'id': '0'
            }) 
            _this.setData({
              wxList: arr,
              originalList:arr,
            })
          }
          
        } else {
          let arr = []
          arr.push({
            'nickname': '暂无好友',
            'id': '0'
          })
          _this.setData({
            wxList: arr,
            originalList:arr
          })
        }
      },
      fail:function (res) {
      
        
      }
    })
  },
  getContractInfo: function () {
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/House/getRelationship',
      data: {
        user_id: wx.getStorageSync("robotUser_id"),
        robot_id: _this.data.robotId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          _this.setData({
            contractWxId: res.data.data.wx_id,
            contractStatus: res.data.data.enable
          })
        } else if (res.data.code == 500) {
          _this.setData({
            contractWxId:'',
            contractStatus:0
          })
        }
      },
      fail: function (res) {


      }
    })
  },
  setContractInfo: function () {
    let _this = this
    let enable
    if (_this.data.contractStatus) {
       enable = 1
    } else {
       enable = 0
    }
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/House/changeRelationshipStatus',
      data: {
        user_id: wx.getStorageSync("robotUser_id"),
        robot_id: _this.data.robotId,
        wx_id:_this.data.contractWxId,
        enable:enable
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          _this.onLoad()
        } else {
          wx.showModal({
            title: '提示',
            content: '设置失败！',
            success: function (res) { }
          })
        }
      },
      fail: function (res) {


      }
    })
  },
  getTk() {
    wx.navigateTo({
      url: 'showTK',
    })
  },
  onsubscribeAdd(e){
    this.change(e)
    this.setData({
      markShow:true,
      subscribeTc_add: true,
    })
  },
  contractAdd(e) {
    this.change(e)
    this.setData({
      markShow: true,
      subscribeCr_add: true,
    })
  },
  onsubscribeAddCancel(){
    this.setData({
      markShow: false,
      subscribeTc_add: false,
      nav1:true,
      subscribeAddkey: ''
    })
  },
  contractAddCancel() {
    this.setData({
      markShow: false,
      isShowList:false,
      subscribeCr_add: false,
      nav3:true,
      contractWxId: ''
    })
    this.getContractInfo();
  },
  onsubscribeAddDefine(){
    let _this = this
    if (this.data.subscribeAddwxId.length == 0){
      wx.showModal({
        title: '提示',
        content: '请填写订阅者微信ID后在提交！',
        success: function (res) { }
      })
      return
    }

    if (this.data.subscribeAddKey.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写订阅内容后在提交！',
        success: function (res) { }
      })
      return
    }

    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/House/push',
      data: {
        robot_id: _this.data.robotId,
        nick:_this.data.subscribeAddwxName,
        wx_id: _this.data.subscribeAddwxId,
        key: _this.data.subscribeAddKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200 && res.data.msg == 'ok') {
          wx.hideLoading()
          _this.onsubscribeAddCancel()
          _this.setData({
            subscribeAddwxId: '',
            subscribeAddwxName: '请先选择订阅者',
            subscribeAddKey:'',
            isShowList:false,
          })
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          _this.onLoad()
        }
      }
    })
  
},
contractAddDefine() {
  let _this = this
  if (this.data.contractWxId.length == 0) {
    wx.showModal({
      title: '提示',
      content: '请填写通知微信号后在提交！',
      success: function (res) { }
    })
    return
  }
  this.setContractInfo();
  this.setData({
    nav3:true
  })
},
wxIdInput: function (e) {
  console.log(111)
  let arr = this.data.wxList
  if (arr.length == 1 && arr[1].id == '0') {
    return;
  }
  let res = [];
  for (var i = 0; i < arr.length; i ++) {
    let index = arr[i].nickname.indexOf(e.detail.value);
    if (index != -1) {
      res.push(arr[i])
    }
  }
  
  this.setData({
    originalList:res,
  })
  // this.setData({
  //   subscribeAddwxId: e.detail.value
  // })
},
  contractWxIdInput: function (e) {
    this.setData({
      contractWxId: e.detail.value
    })
  },
  contracStatusChange: function (e) {
    this.setData({
      contractStatus: e.detail.value
    })
  },
keyInput: function (e) {
  this.setData({
    subscribeAddKey: e.detail.value
  })
},
  delSubscribe(e){
  let _this = this
  wx.showModal({
    title: '提示',
    content: '确认删除当前订阅？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        wx.request({
          url: 'https://qlm.ql888.net.cn/api/House/del',
          data: {
            id: e.currentTarget.dataset.id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            if (res.data.code == 200 && res.data.msg == 'ok') {
              wx.hideLoading()
              _this.onsubscribeAddCancel()
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

 
  
  getSubscribeMessage(e){
    this.change(e)
    wx.navigateTo({
      url: 'showMessage',
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