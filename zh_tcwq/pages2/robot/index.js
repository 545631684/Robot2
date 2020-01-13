//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    tabs: ['优惠券', '活动', '自定义'],
    message: [{
      sign: true
    }],
    tab_index: 0,
    preferList: [],
    isShow: false,
    coupons:[]

  },
  // 切换tab
  switch(e) {
    this.setData({
      tab_index: e.currentTarget.dataset.id
    })
    console.log(this.data.tab_index)
  },
  // 关闭弹窗
  closeDia() {
    this.setData({
      isShow: false
    })
  },
  // 打开弹窗
  openDia() {
    this.setData({
      isShow: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (t) {
    app.pageOnLoad2(this)
    var e = this, _this = this, a = wx.getStorageSync("url");
    console.log(a, t), this.setData({
      url: a,
      store_id: t.store_id
    }), app.util.request({
      url: "entry/wxapp/StoreInfo",
      cachetime: "0",
      data: {
        id: t.store_id
      },
      success: function (t) {
        console.log(t), e.setData({
          seller: t.data.store[0]
        });
      }
    }), this.reLoad();
    app.util.request({
      url: "entry/wxapp/StoreCoupon2",
      cachetime: "0",
      data:{
        store_id: wx.getStorageSync("store_info").id
      },
      success: function (t) {
        for (var e = 0; e < t.data.length; e++){
          t.data[e].rate = parseInt(100 * (1 - Number(t.data[e].surplus) / Number(t.data[e].number)))
          t.data[e].anniu = 1
        }
        _this.setData({
          coupons: t.data
        });
      }
    })
  },
  xaijia(e){
    let dataList = this.data.coupons, _this = this
    dataList[e.currentTarget.dataset.index].anniu = 1
    wx.showModal({
      title: '提示',
      content: '下架成功',
      showCancel:false,
      success: function (res) {
        _this.setData({
          coupons:dataList
        })
      }
    })
  },
  fabuhuodong(e){
    let dataList = this.data.coupons, _this = this
    dataList[e.currentTarget.dataset.index].anniu = 2
    
    wx.request({
      url: 'http://qlm.ql888.net.cn/api/Coupons/add',
      data:{
        coupon_name: e.currentTarget.dataset.name,
        coupon_id: e.currentTarget.dataset.id,
        open_id: wx.getStorageSync("openid")
      },
      success: function (t) {
        console.log(t.data)
        wx.showModal({
          title: '提示',
          content: '发布成功',
          showCancel:false,
          success: function (res) {
            _this.setData({
              coupons:dataList
            })
          }
        })
      }
    })
  },
  reLoad: function () {
    var n = this, t = this.data.store_id, c = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
    console.log(t, c), app.util.request({
      url: "entry/wxapp/StoreCoupon2",
      cachetime: "0",
      data: {
        store_id: t
      },
      success: function (t) {
        console.log(t.data);
        for (var e = t.data, a = [], o = [], s = 0; s < e.length; s++) "3" != e[s].state && util.validTime1(c, e[s].end_time) ? a.push(e[s]) : (e[s].isTouchMove = !1,
          o.push(e[s]));
        console.log(a, o), n.setData({
          items1: a,
          items: o
        });
      }
    });
  },
})
