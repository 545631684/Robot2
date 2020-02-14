function t(t, e, a) {
  return e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}



Page({
  data: {
    list: [],
    infolist: '',
    next_page_url: '',
    lindex: 0,
    key: "",
    searchKey:"",
    searchGroupKey: "",
    searchGroupId: "",
    tindex: -1,
    pageNumber: 1,
    lastPage: !1,
    date: "开始时间",
    date2: "结束时间",
    idx: 0,
    option: [],
    type: "",
    isShow: !1,
   
    tstatus: '',
    txlist: ''
  },
  onLoad: function (t) {
    console.log(111);
    var dt = new Date()
    var ye = dt.getFullYear()
    var mo = dt.getMonth() + 1
    mo = mo < 10 ? '0' + mo : mo
    var da = dt.getDate()
    da = da < 10 ? '0' + da : da
    var dte = ye + '-' + mo + '-' + da
    console.log(dte)
    this.setData({
      date2: dte
    })
    // this.getCurrentMonthFirst(), this.getCurrentMonthLast(), this.getList(), this.getTypeList();
    this.getList()
  },
  thistab: function (e) {
    var es = e.currentTarget.dataset.status
    var index = e.currentTarget.dataset.index
    this.setData({
      tstatus: es,
      lindex: index
    })
    console.log(es, index)
    this.getlist()
  },

  getList: function () {
  
    let _this = this
    let start = '';
    if (_this.data.date != '开始时间') {
      start = _this.data.date + ' 00:00:01';
    }
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/KeySubscribe/get_msg_list',
      data: {
        keyword: _this.data.searchKey,
        start:start,
        end:_this.data.date2 + ' 23:59:59'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          _this.setData({
            infolist: res.data.data.data,
            pages: res.data.data.last_page,
            page: res.data.data.current_page,
            next_page_url: res.data.data.next_page_url
          })
        }
      }
    })
  },
  getmlist: function (next_page_url) {
    var that = this
    wx.request({
      url: next_page_url,
      method: "get",
      data: {
        keyword: that.data.searchKey
      },
      header: {
        'Accept': 'application/json',
      },
      success: (res) => {
        console.log(res)
        if (res.data.status_code == 0) {
          var txlist = that.data.txlist
          var l = txlist.length
          var list = res.data.data.data
          for (var i = 0; i < list.length; i++) {
            txlist[l + i] = list[i]
          }
          that.setData({
            infolist: txlist,
            pages: res.data.data.last_page,
            page: res.data.data.current_page,
            next_page_url: res.data.data.next_page_url
          })

        }
      }
    })
  },
  thistype: function (e) {
    console.log(e.currentTarget.dataset.key)
    var index = e.currentTarget.dataset.index
    var key = e.currentTarget.dataset.key
    this.setData({
      key: key,
      tindex: index
    })
  },
  bindDateChange: function (t) {
    this.setData({
      date: t.detail.value,
      pageNumber: 1,
      list: [],
      lastPage: !1
    }), "开始时间" != this.data.date && this.data.date2;
  },
  bindDateChange2: function (t) {
    this.setData({
      date2: t.detail.value,
      pageNumber: 1,
      list: [],
      lastPage: !1
    }), "开始时间" != this.data.date && this.data.date2;
  },
  screen: function () {
    this.setData({
      isShow: !0
    });
  },
  close: function () {
    this.setData({
      isShow: !1
    });
  },
  reset: function () {
    this.setData({
      type: "",
      date: "开始时间",
      date2: "结束时间"
    });
  },
  keyInput: function (e) {
    this.setData({
      searchKey: e.detail.value
    })
  },
  GroupkeyInput: function (e) {
    this.setData({
      searchGroupKey: e.detail.value
    })
  },
  GroupIdInput: function (e) {
    this.setData({
      searchGroupId: e.detail.value
    })
  },
  dialogConfirm: function () {
    var t = this;
    var that = this
    this.setData({
      type: t.data.type,
      pageNumber: 1,
      list: [],
      lastPage: !1,
      isShow: !1
    })
    that.getList();
  },
  getCurrentMonthFirst: function () {
    var t = new Date();
    t.setDate(1);
    var e = parseInt(t.getMonth() + 1), a = t.getDate();
    e < 10 && (e = "0" + e), a < 10 && (a = "0" + a), this.setData({
      date: t.getFullYear() + "-" + e + "-" + a
    });
  },
  getCurrentMonthLast: function () {
    var t = new Date(), e = t.getMonth(), a = ++e, i = new Date(t.getFullYear(), a, 1), n = new Date(i - 864e5), s = parseInt(n.getMonth() + 1), o = n.getDate();
    s < 10 && (s = "0" + s), o < 10 && (o = "0" + o), this.setData({
      date2: t.getFullYear() + "-" + s + "-" + o
    });
  },
  onReachBottom: function () {
    var that = this
    var pages = this.data.pages
    var page = this.data.page
    var next_page_url = this.data.next_page_url
    if (pages > page) {
      page = page + 1
      that.getmlist(next_page_url)
    } else {
    
      wx.showToast({
        icon: 'loading',
        title: '无更多数据',
      })
    }
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onShareAppMessage: function () { }
});