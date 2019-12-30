var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        slide: [ {
            logo: "../image/background2.png"
        }, {
            logo: "../image/fximg.png"
        } ],
        kpgg: !0,
        qddh: !1,
        hdinfo: {
            id: 2,
            money: 10
        },
        tjwz: "提交报名"
    },
    maketel: function(e) {
        var t = this.data.hdinfo.tel;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    location: function() {
        var e = this.data.hdinfo.coordinate.split(","), t = this.data.hdinfo.address;
        console.log(e), wx.openLocation({
            latitude: parseFloat(e[0]),
            longitude: parseFloat(e[1]),
            address: t,
            name: "位置"
        });
    },
    ycgg: function() {
        this.setData({
            kpgg: !0
        });
    },
    wybm: function() {
        this.setData({
            kpgg: !1
        });
    },
    updateUserInfo: function(e) {
        console.log(e), "getUserInfo:ok" == e.detail.errMsg && (this.setData({
            hydl: !1
        }), this.getuserinfo());
    },
    getuserinfo: function() {
        var s = this;
        wx.login({
            success: function(e) {
                console.log("这是登录所需要的code"), console.log(e.code);
                var t = e.code;
                wx.setStorageSync("code", t), wx.getSetting({
                    success: function(e) {
                        console.log(e), e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                            success: function(e) {
                                wx.setStorageSync("user_info", e.userInfo);
                                var n = e.userInfo.nickName, i = e.userInfo.avatarUrl;
                                s.setData({
                                    user_name: n
                                }), console.log("用户名字"), console.log(e.userInfo.nickName), console.log("用户头像"), 
                                console.log(e.userInfo.avatarUrl), app.util.request({
                                    url: "entry/wxapp/openid",
                                    cachetime: "0",
                                    data: {
                                        code: t
                                    },
                                    success: function(e) {
                                        wx.setStorageSync("key", e.data.session_key);
                                        var t = i, o = n;
                                        wx.setStorageSync("openid", e.data.openid);
                                        var a = e.data.openid;
                                        console.log("这是用户的openid"), console.log(a), app.util.request({
                                            url: "entry/wxapp/Login",
                                            cachetime: "0",
                                            data: {
                                                openid: a,
                                                img: t,
                                                name: o
                                            },
                                            success: function(e) {
                                                console.log("这是用户的登录信息"), console.log(e), wx.setStorageSync("users", e.data), wx.setStorageSync("uniacid", e.data.uniacid), 
                                                app.util.request({
                                                    url: "entry/wxapp/IsSignUp",
                                                    cachetime: "0",
                                                    data: {
                                                        user_id: e.data.id,
                                                        act_id: s.data.hdid
                                                    },
                                                    success: function(e) {
                                                        console.log(e), s.setData({
                                                            userisbm: e.data
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }) : (console.log("未授权过"), s.setData({
                            hydl: !0
                        }));
                    }
                });
            }
        });
    },
    onLoad: function(e) {
        console.log(e);
        var t = this, o = util.formatTime(new Date()).replace(/\//g, "-").toString();
        console.log(o);
        var a, n = decodeURIComponent(e.scene);
        console.log("scene", n), "undefined" != n && (a = n), null != e.hdid && (console.log("跳转进来的id:", e.hdid), 
        a = e.hdid), console.log(e, a), this.setData({
            hdid: a
        }), this.getuserinfo(), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.color,
                    animation: {
                        duration: 0,
                        timingFunc: "easeIn"
                    }
                }), t.setData({
                    system: e.data,
                    color: e.data.color
                });
            }
        }), app.util.request({
            url: "entry/wxapp/url",
            cachetime: "0",
            success: function(e) {
                t.setData({
                    url: e.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/ActivityInfo",
            cachetime: "0",
            data: {
                id: a
            },
            success: function(e) {
                console.log(e), wx.setNavigationBarTitle({
                    title: e.data.title
                }), e.data.end_time > o ? e.data.isgq = 2 : e.data.isgq = 1, t.setData({
                    hdinfo: e.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Llz",
            cachetime: "0",
            data: {
                cityname: wx.getStorageSync("city"),
                type: 6
            },
            success: function(e) {
                console.log(e), t.setData({
                    unitid: e.data
                });
            }
        });
    },
    formSubmit: function(e) {
        console.log("form发生了submit事件，携带数据为：", e.detail.value);
        var t = this, o = wx.getStorageSync("users").id, a = wx.getStorageSync("openid"), n = e.detail.formId, i = t.data.hdinfo.id, s = this.data.hdinfo.money, c = e.detail.value.lxr, l = e.detail.value.tel;
        console.log(o, i, s, c, l);
        var d = "", r = !0;
        "" == c ? d = "请填写联系人！" : "" == l || l.length < 11 ? d = "请填写正确联系电话！" : (r = !1, 
        t.setData({
            qddh: !0,
            tjwz: "提交中"
        }), app.util.request({
            url: "entry/wxapp/SignUp",
            cachetime: "0",
            data: {
                user_id: o,
                act_id: i,
                money: s,
                form_id: n,
                user_name: c,
                user_tel: l
            },
            success: function(e) {
                console.log(e), "人数已满" != e.data && "报名失败" != e.data ? 0 < s ? app.util.request({
                    url: "entry/wxapp/Pay3",
                    cachetime: "0",
                    data: {
                        openid: a,
                        money: s,
                        order_id: e.data
                    },
                    success: function(e) {
                        console.log(e), wx.requestPayment({
                            timeStamp: e.data.timeStamp,
                            nonceStr: e.data.nonceStr,
                            package: e.data.package,
                            signType: e.data.signType,
                            paySign: e.data.paySign,
                            success: function(e) {
                                console.log("这里是支付成功");
                            },
                            complete: function(e) {
                                console.log(e), "requestPayment:fail cancel" == e.errMsg && (wx.showToast({
                                    title: "取消支付",
                                    icon: "loading",
                                    duration: 1e3
                                }), t.setData({
                                    qddh: !1,
                                    tjwz: "提交报名"
                                })), "requestPayment:ok" == e.errMsg && (wx.showToast({
                                    title: "提交成功"
                                }), setTimeout(function() {
                                    wx.redirectTo({
                                        url: "../wdbm/wdbm"
                                    });
                                }, 1e3));
                            }
                        });
                    }
                }) : (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../wdbm/wdbm"
                    });
                }, 1e3)) : (wx.showModal({
                    title: "提示",
                    content: e.data
                }), t.setData({
                    qddh: !1,
                    tjwz: "提交报名"
                }));
            }
        })), 1 == r && wx.showModal({
            title: "提示",
            content: d
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var e = this.data.hdinfo.title, t = this.data.hdid;
        return console.log(e, t), {
            title: e,
            path: "/zh_tcwq/pages/hdzx/hdzxinfo?hdid=" + t,
            success: function(e) {},
            fail: function(e) {}
        };
    }
});