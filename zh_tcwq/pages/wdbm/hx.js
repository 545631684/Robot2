var app = getApp();

Page({
    data: {},
    updateUserInfo: function(e) {
        console.log(e), "getUserInfo:ok" == e.detail.errMsg && (this.setData({
            hydl: !1
        }), this.getuserinfo());
    },
    getuserinfo: function() {
        var n = this;
        wx.login({
            success: function(e) {
                console.log("这是登录所需要的code"), console.log(e.code);
                var o = e.code;
                wx.setStorageSync("code", o), wx.getSetting({
                    success: function(e) {
                        console.log(e), e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                            success: function(e) {
                                wx.setStorageSync("user_info", e.userInfo);
                                var a = e.userInfo.nickName, s = e.userInfo.avatarUrl;
                                n.setData({
                                    user_name: a
                                }), console.log("用户名字"), console.log(e.userInfo.nickName), console.log("用户头像"), 
                                console.log(e.userInfo.avatarUrl), app.util.request({
                                    url: "entry/wxapp/openid",
                                    cachetime: "0",
                                    data: {
                                        code: o
                                    },
                                    success: function(e) {
                                        wx.setStorageSync("key", e.data.session_key);
                                        var o = s, n = a;
                                        wx.setStorageSync("openid", e.data.openid);
                                        var t = e.data.openid;
                                        console.log("这是用户的openid"), console.log(t), app.util.request({
                                            url: "entry/wxapp/Login",
                                            cachetime: "0",
                                            data: {
                                                openid: t,
                                                img: o,
                                                name: n
                                            },
                                            success: function(e) {
                                                console.log("这是用户的登录信息"), console.log(e), wx.setStorageSync("users", e.data), wx.setStorageSync("uniacid", e.data.uniacid);
                                            }
                                        });
                                    }
                                });
                            }
                        }) : (console.log("未授权过"), n.setData({
                            hydl: !0
                        }));
                    }
                });
            }
        });
    },
    onLoad: function(e) {
        console.log(e);
        var o = decodeURIComponent(e.scene);
        console.log(o);
        var n = o;
        this.setData({
            hxmid: n
        }), this.getuserinfo();
    },
    hx: function() {
        var e = this.data.hxmid, o = wx.getStorageSync("users").id;
        console.log("扫码人的uid", o, "hxmid", e), app.util.request({
            url: "entry/wxapp/ActHx",
            cachetime: "0",
            data: {
                user_id: o,
                id: e
            },
            success: function(e) {
                console.log(e), "暂无核销权限" == e.data && (wx.showModal({
                    title: "提示",
                    content: e.data
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "../index/index"
                    });
                }, 1e3)), "1" == e.data && (wx.showModal({
                    title: "提示",
                    content: "核销成功"
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "../index/index"
                    });
                }, 1e3)), "2" == e.data && wx.showModal({
                    title: "提示",
                    content: "核销失败"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});