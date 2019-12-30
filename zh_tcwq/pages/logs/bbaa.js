var app = getApp();

Page({
    data: {
        disabled: !0,
        zh: "",
        mm: "",
        logintext: "登录",
        werchat: !1,
        hydl: !1
    },
    updateUserInfo: function(e) {
        console.log(e), "getUserInfo:ok" == e.detail.errMsg && (this.setData({
            hydl: !1
        }), this.getuserinfo());
    },
    getuserinfo: function() {
        var c = this;
        wx.login({
            success: function(e) {
                console.log("这是登录所需要的code"), console.log(e.code);
                var t = e.code;
                wx.setStorageSync("code", t), wx.getSetting({
                    success: function(e) {
                        console.log(e), e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                            success: function(e) {
                                wx.setStorageSync("user_info", e.userInfo);
                                var n = e.userInfo.nickName, s = e.userInfo.avatarUrl;
                                c.setData({
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
                                        var t = s, o = n;
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
                                                c.setData({
                                                    user_id: e.data.id,
                                                    user_info: e.data
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }) : (console.log("未授权过"), c.setData({
                            hydl: !0
                        }));
                    }
                });
            }
        });
    },
    onLoad: function(e) {
        var o = this;
        console.log(this), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), o.setData({
                    system: e.data,
                    url: wx.getStorageSync("url")
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.color,
                    animation: {
                        duration: 0,
                        timingFunc: "easeIn"
                    }
                });
                var t = e.data;
                o.setData({
                    bqxx: t
                });
            }
        }), wx.getStorageSync("users") ? o.setData({
            user_id: wx.getStorageSync("users").id,
            name: wx.getStorageSync("users").name
        }) : this.getuserinfo();
    },
    name: function(e) {
        console.log(e), this.setData({
            name: e.detail.value
        });
    },
    password: function(e) {
        console.log(e), this.setData({
            password: e.detail.value
        });
    },
    sign: function(e) {
        console.log(this.data), app.util.request({
            url: "entry/wxapp/StoreLogin",
            cachetime: "0",
            data: {
                user_name: this.data.name,
                pwd: this.data.password
            },
            success: function(e) {
                if (console.log(e), "账号不存在!" == e.data || "密码不正确!" == e.data) wx.showModal({
                    title: "提示",
                    content: "当前账号未绑定操作员",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }); else {
                    wx.setStorageSync("store_info", e.data);
                    var t = e.data.id;
                    console.log(t), wx.redirectTo({
                        url: "../redbag/merchant?id=" + e.data.id,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    });
                }
            }
        });
    },
    weixin: function(e) {
        0 == this.data.werchat ? this.setData({
            werchat: !0
        }) : 1 == this.data.werchat && this.setData({
            werchat: !1
        });
    },
    queding: function(e) {
        this.setData({
            werchat: !1
        }), app.util.request({
            url: "entry/wxapp/sjdlogin",
            cachetime: "0",
            data: {
                user_id: this.data.user_id
            },
            success: function(e) {
                if (console.log(e), 0 == e.data) wx.showModal({
                    title: "提示",
                    content: "当前账号未绑定操作员",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }); else if ("1" == e.data.state) wx.showModal({
                    title: "提示",
                    content: "您的入驻申请正在后台审核，请耐心等待"
                }); else if ("2" == e.data.state) {
                    wx.setStorageSync("store_info", e.data);
                    e.data.user_id;
                    wx.redirectTo({
                        url: "../redbag/merchant?id=" + e.data.id,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    });
                } else "3" == e.data.state && wx.showModal({
                    title: "提示",
                    content: "您的入驻申请已被拒绝，请联系平台处理"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});