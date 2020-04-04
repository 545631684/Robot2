// zh_tcwq/pages/robot//subscribe/index.js
var app = getApp(), util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_id:0,
    subscribeData:[],
    coupons: ['优惠券1', '优惠券2', '优惠券3', '优惠券4'],
    subscribeAddcpId:'',
    subscribeAddcpName: '请选择优惠券',
    contractWxId: '',
    contractStatus:0,
    isShow:false,
    subscribeAdd:false,
    subscribeTc: false,
    subscribeCr: false,
    subscribeTc_add:false,
    subscribeCr_add: false,
    subscribeList:false,
    subscribeTc_slsz: false,
    index:null,
    index2:0,
    robotId:'',
    isShowList:false,
    couponList:'',
    originalList: '',
    array: ['关闭','启用'],
    array2: ['点击选择'],
    slTemplateId:'',
    btnColor:"#8A8A8A",
  },
  bindPickerChange: function (e) {
    this.setData({
      subscribeAddcpName: this.data.coupons[e.detail.value]
    })
  },
  showList:function () {
    this.setData({
      isShowList:true
    })
  },
  bindSelect: function (e) {
    this.setData({
      isShowList: false
    })
    let id = e.target.dataset.id;
    let name = e.target.dataset.name;

    if (id != '0') {
      this.setData({
        subscribeAddcpId:id,
        subscribeAddcpName:name
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
      store_id:options.store_id,
      subscribeTc: false,
      subscribeCr: false,
      subscribeTc_add: false,
      subscribeCr_add: false
    })
    _this.setData({
      robotId: wx.getStorageSync("wxid"),
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/Coupons/get_list',
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
    this.getCouponList();
  },

  getCouponList:function () {
    let _this = this
    var s = app.util.makeSign(""+_this.data.store_id, 'https://wechat.ql888.net/app/index.php?i=5&t=0&v=1.21&from=wxapp&c=entry&a=wxapp&do=StoreCoupon2&&m=zh_tcwq');
    var url = 'https://wechat.ql888.net/app/index.php?i=5&t=0&v=1.21&from=wxapp&c=entry&a=wxapp&do=StoreCoupon2&&m=zh_tcwq&sign=' + s + '&store_id=' + _this.data.store_id;
    wx.request({
      url: url,
      
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        if (res.data.length > 0) {
          _this.setData({
            couponList:res.data
          })
        }
      }
    })
  },
  
  
  onsubscribeAdd(){
    this.setData({
      isShow:true,
      subscribeTc: true,
      subscribeTc_add: true,
      btnColor:"#002AFF",
    })
  },
  contractAdd() {
    
    this.setData({
      subscribeCr: true,
      subscribeCr_add: true,
    })
  },
  onsubscribeAddCancel(){
    this.setData({
      isShow:false,
      subscribeTc: false,
      subscribeTc_add: false,
      subscribeAddcpId: 0,
      subscribeAddcpName: '请选择优惠券',
      btnColor:"#8A8A8A"
    })
  },
  contractAddCancel() {
    this.setData({
      subscribeCr: false,
      isShowList:false,
      subscribeCr_add: false,
      contractWxId: ''
    })
    this.getContractInfo();
  },
  onsubscribeAddDefine(){
    let _this = this
    if (this.data.subscribeAddcpId.length == 0){
      wx.showModal({
        title: '提示',
        content: '请选择优惠券后在提交！',
        success: function (res) { }
      })
      return
    }

  

    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/Coupons/add',
      data: {
        robot_id: _this.data.robotId,
        coupon_name:_this.data.subscribeAddcpName,
        coupon_id: _this.data.subscribeAddcpId,
        user_id: wx.getStorageSync("user_id")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200 && res.data.msg == 'ok') {
          wx.hideLoading()
          _this.onsubscribeAddCancel()
          _this.setData({
            subscribeAddcpId: '',
            subscribeAddcpName: '请先选择优惠券',
            subscribeAddKey:'',
            isShowList:false,
            isShow:false,
            btnColor:"#8A8A8A"
          })
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          //_this.onLoad()
          wx.redirectTo({
            url: 'index?store_id=' + _this.data.store_id,
          })
        }
      }
    })
  
},

  delSubscribe(e){
  let _this = this
  wx.showModal({
    title: '提示',
    content: '确认删除当前优惠券？',
    success: function (res) {
      if (res.confirm) {
        console.log(e)
        wx.request({
          url: 'https://qlm.ql888.net.cn/api/Coupons/del_coupon',
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
              //_this.onLoad()
              wx.redirectTo({
                url: 'index?store_id=' + _this.data.store_id,
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

 
  
  getSubscribeMessage(){
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