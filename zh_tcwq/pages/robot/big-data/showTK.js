
Page({
  data: {
    list: [],
    infolist: '',
    next_page_url: '',
    lindex: 0,
    key: "",
    searchKey:"",
    searchGroupName: "",
    searchGroupId: "",
    tindex: -1,
    pageNumber: 1,
    lastPage: !1,
    date: "开始时间",
    date2: "结束时间",
    idx: 0,
    option: [],
    type: "",
    robotId:'',
    tstatus: '',
    txlist: ''
  },
  onLoad: function (t) {
    console.log(111);
    this.setData({
      robotId: wx.getStorageSync("wxid"),
    })
    this.getList()
  },
 
  
  getList: function () {
  
    let _this = this
    let start = '';
    let end = '';
  
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/KeySubscribe/get_dy_list',
      data: {
        user_id: wx.getStorageSync("robotUser_id")
        //robot_id:_this.data.robotId
        //robot_id:'test'
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
        robot_id: _this.data.robotId
      },
      header: {
        'Accept': 'application/json',
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 200) {
          var txlist = that.data.infolist
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