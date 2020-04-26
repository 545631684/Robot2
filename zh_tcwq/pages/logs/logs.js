var util = require("../../utils/util.js"), app = getApp();

Page({
    data: {
      Return: !1,
      werchat: !1,
      guide:false
    },
    guideClose(){
        this.setData({
          guide: false
        })
      },
    bindGetUserInfo: function(t) {
        "getUserInfo:ok" == t.detail.errMsg && (this.setData({
            hydl: !1
        }), this.changeData());
    },
    changeData: function() {
        var n = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(t) {
                        app.util.request({
                            url: "entry/wxapp/login",
                            cachetime: "0",
                            data: {
                                openid: wx.getStorageSync("openid"),
                                img: t.userInfo.avatarUrl,
                                name: t.userInfo.nickName
                            },
                            success: function(t) {}
                        });
                        var e = t.userInfo;
                        n.setData({
                            avatarUrl: e.avatarUrl,
                            nickName: e.nickName
                        });
                    }
                }) : (console.log("未授权过"), n.setData({
                    hydl: !0
                }));
            }
        });
    },
    onLoad: function(t) {
        let users = wx.getStorageSync("users")
        if(users.watch_help == "0"){
            this.setData({
                guide:true
            })
        }
        var e = this, n = getCurrentPages();
        n.route = "zh_tcwq/pages/logs/index", 1 == e.data.Return && n.setData({
            Return: !0
        }), app.pageOnLoad(this), app.setNavigationBarColor(this), this.changeData();
        var o = wx.getStorageSync("System").bq_name, a = wx.getStorageSync("System").bq_logo, c = wx.getStorageSync("user_info");
        console.log(c);
        var i = wx.getStorageSync("store"), s = wx.getStorageSync("url");
        console.log(i), e.setData({
            store: i,
            url: s,
            System: wx.getStorageSync("System"),
            support: o,
            bq_logo: a
        }), e.setData({
            avatarUrl: c.avatarUrl,
            nickName: c.nickName
        });
    },
    collection: function(t) {
        wx.navigateTo({
            url: "../Collection/Collection"
        });
    },
    settled: function(t) {
        wx.navigateTo({
            url: "../settled/settled"
        });
    },
    yellow_page: function(t) {
        wx.navigateTo({
            url: "../yellow_page/mine_yellow",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    jfsc: function() {
        wx.navigateTo({
            url: "../integral/integral"
        });
    },
    wdbm: function() {
        wx.navigateTo({
            url: "../wdbm/wdbm"
        });
    },
    wdyhq: function() {
        wx.navigateTo({
            url: "../wdq/wdq"
        });
    },
    wdqg: function() {
        wx.navigateTo({
            url: "../xsqg/order"
        });
    },
    jiqiren() {
      wx.navigateTo({
        url: '/zh_tcwq/pages2/personal/index',
      })
    },
    wdpt: function() {
        wx.navigateTo({
            url: "../collage/group_order"
        });
    },
    tchhr: function(t) {
        var e = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyDistribution",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                console.log(t.data), "2" == t.data.state ? (console.log("是分销商"), wx.navigateTo({
                    url: "../distribution/yaoqing"
                })) : "1" == t.data.state ? wx.showModal({
                    title: "提示",
                    content: "您的申请正在审核中，请耐心等待"
                }) : wx.navigateTo({
                    url: "../distribution/jrhhr"
                });
            }
        });
    },
    my_post: function(t) {
        wx.navigateTo({
            url: "../mypost/mypost",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    content: function(t) {
        wx.navigateTo({
            url: "../content/content",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    fabu: function(t) {
        wx.navigateTo({
            url: "../fabu/fabu/fabu",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    logs_store: function(t) {
        wx.navigateTo({
            url: "bbaa",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    weixin: function (e) {

      // 0 == this.data.werchat ? this.setData({
      //   werchat: !0
      // }) : 1 == this.data.werchat && this.setData({
      //   werchat: !1
      // });
      this.queding()
    },
  queding: function (e) {
    this.setData({
      werchat: !1
    }), app.util.request({
      url: "entry/wxapp/sjdlogin",
      cachetime: "0",
      data: {
        user_id: this.data.UserInfo.id
      },
      success: function (e) {
        if (console.log(e), 0 == e.data) wx.showModal({
          title: "提示",
          content: "当前账号未绑定操作员",
          showCancel: !0,
          cancelText: "取消",
          confirmText: "确定",
          success: function (e) { },
          fail: function (e) { },
          complete: function (e) { }
        }); else if ("1" == e.data.state) wx.showModal({
          title: "提示",
          content: "您的入驻申请正在后台审核，请耐心等待"
        }); else if ("2" == e.data.state) {
          wx.setStorageSync("store_info", e.data);
          e.data.user_id;
          wx.redirectTo({
            url: "../redbag/merchant?id=" + e.data.id,
            success: function (e) { },
            fail: function (e) { },
            complete: function (e) { }
          });
        } else "3" == e.data.state && wx.showModal({
          title: "提示",
          content: "您的入驻申请已被拒绝，请联系平台处理"
        });
      }
    });
  },
    order: function(t) {
        wx.navigateTo({
            url: "order",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    help: function(t) {
        wx.navigateTo({
            url: "../store/help",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    ptgl: function() {
        wx.navigateTo({
            url: "../extra/ptgly/bbaa"
        });
    },
    wallet: function(t) {
        wx.navigateTo({
            url: "income",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    mine_car: function(t) {
        wx.navigateTo({
            url: "mine_car",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    address: function(t) {
        var e = wx.getStorageSync("users").id;
        wx.chooseAddress({
            success: function(t) {
                console.log("我进来了")
                console.log(t), app.util.request({
                    url: "entry/wxapp/UpdAdd",
                    cachetime: "0",
                    data: {
                        user_id: e,
                        user_name: t.userName,
                        user_tel: t.telNumber,
                        user_address: t.provinceName + t.cityName + t.countyName + t.detailInfo
                    },
                    success: function(t) {
                        console.log(t);
                    }
                });
            }
        });
    },
    jump: function(t) {
        wx.navigateToMiniProgram({
            appId: wx.getStorageSync("System").tz_appid,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(t) {
                console.log("跳转成功"), console.log(t);
            }
        });
    },
    about: function(t) {
        wx.navigateTo({
            url: "system",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this, t = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "30",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t), e.setData({
                    UserInfo: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MyCollection",
            cachetime: "30",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t), e.setData({
                    MyCollection: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Signset",
            cachetime: "0",
            success: function(t) {
                console.log("签到设置", t), e.setData({
                    qdset: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MyDistribution",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    MyDistribution: t.data
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});