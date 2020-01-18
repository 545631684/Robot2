var app = getApp(),
  util = require("../../utils/util.js"),
  imgArray = [],
  siteinfo = require("../../../siteinfo.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countries: [],
    countryIndex: 0,
    lqcountries: ["付费领取+分享领取", "仅限付费领取", "仅限分享领取"],
    lqcountryIndex: 1,
    jesz: !0,
    qssz: !0,
    yhqtype: "元",
    start: "",
    timestart: "",
    timeend: "",
    issq: !0,
    is_check: "",
    zsnum: 0,
    fwxy: !0,
    images: [],
    images2: [],
    timeStart: '',
    timeEnd: '',
    numExamine: '^[0-9]*$',
    telExamine: ''
  },
  bindTypeChange: function(t) {
      console.log("picker type 发生选择改变，携带值为", t.detail.value), this.setData({
          countryIndex: t.detail.value
      });
  },
  gongg(e) {
    this.setData({
      zsnum: e.detail.value.length
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      timeStart: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    this.setData({
      timeEnd: e.detail.value
    })
  },
  deleteImage: function (t) {
    var e = t.currentTarget.dataset.index,
      i = this.data.images;
    console.log(e), i.splice(e, 1), this.setData({
      images: i
    }), console.log(i);
  },
  chooseImage: function (t) {
    var e = this,
      i = this.data.images,
      a = i.length;
    console.log(i), wx.chooseImage({
      count: 3 - a,
      success: function (t) {
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        console.log(t.tempFilePaths)
        wx.uploadFile({
          url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_tcwq",
          name: "upfile",
          filePath: t.tempFilePaths[0],
          success: function (u) {
            if(u.statusCode == 200){
              i = i.concat(u.data), e.setData({
                images: i
              })
            }
          }
        })
      }
    });
  },
  deleteImage2: function (t) {
    var e = t.currentTarget.dataset.index,
      i = this.data.images2;
    console.log(e), i.splice(e, 1), this.setData({
      images2: i
    }), console.log(i);
  },
  chooseImage2: function (t) {
    var e = this,
      i = this.data.images2,
      a = i.length;
    console.log(i), wx.chooseImage({
      count: 3 - a,
      success: function (t) {
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        if(t.tempFilePaths.length == 1){
            wx.uploadFile({
                url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_tcwq",
                name: "upfile",
                filePath: t.tempFilePaths[0],
                success: function (u) {
                  if(u.statusCode == 200){
                    i = i.concat(u.data), e.setData({
                      images2: i
                    })
                  }
                }
              })
        } else if(t.tempFilePaths.length > 1){
            t.tempFilePaths.find((src,index)=>{
                wx.uploadFile({
                    url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_tcwq",
                    name: "upfile",
                    filePath: t.tempFilePaths[index],
                    success: function (u) {
                        if(u.statusCode == 200){
                        i = i.concat(u.data), e.setData({
                            images2: i
                        })
                        }
                    }
                })
            })
        }
      }
    });
  },
  formSubmit: function (t) {
    let _this = this,
      telExamine = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if (t.detail.value.title.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写活动标题',
        showCancel: false,
        success: function (res) {}
      })
    } else if (_this.data.images.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请上传活动logo',
        showCancel: false,
        success: function (res) {}
      })
    } else if (t.detail.value.details.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写活动详情',
        showCancel: false,
        success: function (res) {}
      })
    } else if (_this.data.timeStart.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请设置活动开始时间',
        showCancel: false,
        success: function (res) {}
      })
    } else if (_this.data.timeEnd.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请设置活动结束时间',
        showCancel: false,
        success: function (res) {}
      })
    } else if (t.detail.value.number.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写限制人数',
        showCancel: false,
        success: function (res) {}
      })
    } else if (t.detail.value.money.length == 0) {
      wx.showModal({
        title: '提示',
        content: '价格输入有误',
        showCancel: false,
        success: function (res) {}
      })
    } else if (t.detail.value.tel.length == 0) {
      wx.showModal({
        title: '提示',
        content: '电话输入有误',
        showCancel: false,
        success: function (res) {}
      })
    } else if (t.detail.value.address.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写地址',
        showCancel: false,
        success: function (res) {}
      })
    }else {
      // else if (t.detail.value.cityname.length == 0) {
      //   wx.showModal({
      //     title: '提示',
      //     content: '请填写城市',
      //     showCancel: false,
      //     success: function (res) {}
      //   })
      // } 
      wx.showLoading({
        title: "提交中..."
      })
      let forDate = {
        id:_this.data.enrollData.id,
        store_id: _this.data.store_id,
        title: t.detail.value.title,
        logo: _this.data.images[0],
        details: t.detail.value.details,
        number: t.detail.value.number,
        sign_num: _this.data.enrollData.sign_num,
        time: _this.data.enrollData.time,
        start_time: _this.data.timeStart,
        end_time: _this.data.timeEnd,
        money: t.detail.value.money,
        type_id: _this.data.countries[_this.data.countryIndex].id,
        tel: t.detail.value.tel,
        address: t.detail.value.address,
        coordinate: _this.data.enrollData.coordinate,
        cityname: t.detail.value.cityname,
        is_bm:1,
        img:_this.data.images2.length == 0 ? "":_this.data.images2.join(',')
      }
        app.util.request({
          url: "entry/wxapp/Addcativity",
          cachetime: "0",
          data: forDate,
          success: function (e) {
            wx.hideLoading()
            if (e.data.code == 200) {
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: '修改失败',
                icon: 'loading',
                duration: 2000
              })
            }
            wx.navigateBack({
              delta: 1
            })
          }
        });
    }
    console.log(t.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = this, url2 = wx.getStorageSync("url2"), url1 = wx.getStorageSync("url");
    this.setData({
      id: options.id,
      store_id: options.store_id,
      url2:url2,
      url1:url1
    })
    wx.setNavigationBarColor({
        frontColor: "#ffffff",
        backgroundColor: wx.getStorageSync("color"),
        animation: {
            duration: 0,
            timingFunc: "easeIn"
        }
    });
    app.util.request({
      url: "entry/wxapp/Getacttype",
      cachetime: "0",
      success: function (r) {
        if (r.data.msg.length != 0) {
          t.setData({
            countries: r.data.msg
          })
          app.util.request({
            url: "entry/wxapp/Getcativitylist",
            cachetime: "0",
            data: {
              store_id: t.data.store_id
            },
            success: function (e) {
              if (e.data.code == 200) {
                e.data.msg.find((o, index) => {
                  if (o.id == t.data.id) {
                    t.setData({
                      enrollData: o,
                      timeStart: o.start_time,
                      timeEnd: o.end_time
                    })
                  }
                })
                t.data.countries.find((c, indexc) => {
                  if (c.id == t.data.enrollData.type_id) {
                    t.setData({
                      countryIndex: indexc,
                      images: [t.data.enrollData.logo],
                      images2: t.data.enrollData.img.split(',').length == 1 && t.data.enrollData.img.split(',')[0] == "" ? []:t.data.enrollData.img.split(',')
                    })
                  }
                })
              }
            }
          })
        }
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