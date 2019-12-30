var app = getApp();

Page({
    data: {
        speak: !1,
        hydl: !1
    },
    updateUserInfo: function(e) {
        console.log(e), "getUserInfo:ok" == e.detail.errMsg && (this.setData({
            hydl: !1
        }), this.getuserinfo());
    },
    previewImage: function(e) {
        var t = this.data.url, a = [], o = e.currentTarget.dataset.inde, n = this.data.info.imgs;
        for (var s in n) a.push(t + n[s]);
        wx.previewImage({
            current: t + n[o],
            urls: a
        });
    },
    getuserinfo: function() {
        var i = this;
        wx.login({
            success: function(e) {
                console.log("这是登录所需要的code"), console.log(e.code);
                var t = e.code;
                wx.setStorageSync("code", t), wx.getSetting({
                    success: function(e) {
                        console.log(e), e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                            success: function(e) {
                                var n = e.userInfo.nickName, s = e.userInfo.avatarUrl;
                                app.util.request({
                                    url: "entry/wxapp/openid",
                                    cachetime: "0",
                                    data: {
                                        code: t
                                    },
                                    success: function(e) {
                                        var t = s, a = n, o = e.data.openid;
                                        app.util.request({
                                            url: "entry/wxapp/Login",
                                            cachetime: "0",
                                            data: {
                                                openid: o,
                                                img: t,
                                                name: a
                                            },
                                            success: function(e) {
                                                console.log(e), i.setData({
                                                    username: e.data.name,
                                                    user_id: e.data.id
                                                }), i.refresh();
                                            }
                                        });
                                    }
                                });
                            }
                        }) : (console.log("未授权过"), i.setData({
                            hydl: !0
                        }));
                    }
                });
            }
        });
    },
    onLoad: function(e) {
        console.log(e);
        var t = e.id, a = this;
        if (a.setData({
            id: t
        }), wx.getStorageSync("users")) {
            var o = wx.getStorageSync("users"), n = wx.getStorageSync("users").id;
            a.setData({
                username: o.name,
                user_id: n
            }), a.refresh();
        } else this.getuserinfo();
        wx.getStorageSync("System") ? (wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("System").color
        }), a.setData({
            system: wx.getStorageSync("System")
        })) : app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), a.setData({
                    system: e.data
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.color
                });
                var t = e.data;
                console.log(t), a.setData({
                    system: t
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(e) {
                a.setData({
                    url: e.data
                });
            }
        });
    },
    refresh: function(e) {
        var u = this, t = u.data.id;
        var a, o, n, r = u.data.user_id, l = (a = new Date(), o = a.getMonth() + 1, n = a.getDate(), 
        1 <= o && o <= 9 && (o = "0" + o), 0 <= n && n <= 9 && (n = "0" + n), a.getFullYear() + "/" + o + "/" + n + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds());
        app.util.request({
            url: "entry/wxapp/ZxInfo",
            cachetime: "0",
            data: {
                id: t,
                user_id: r
            },
            success: function(e) {
                console.log(e);
                var t = e.data;
                null == t.img ? t.type = 1 : t.type = 2, t.content = t.content.replace("↵", "\n");
                var a = l, o = t.time.replace(/-/g, "/"), n = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g, s = Math.abs(Date.parse(a.replace(n, "$2-$3-$1$4")) - Date.parse(o.replace(n, "$2-$3-$1$4"))) / 1e3, i = Math.floor(s / 3600), c = Math.floor(s % 3600 / 60);
                t.m = Number(i), t.h = Number(c), console.log(i + " 小时 " + c + " 分钟"), console.log(l), 
                null != t.imgs && (t.imgs = t.imgs.split(",")), console.log(t), t.time = t.time.slice(0, 16), 
                app.util.request({
                    url: "entry/wxapp/ZxPlList",
                    cachetime: "0",
                    data: {
                        zx_id: t.id
                    },
                    success: function(e) {
                        console.log(e), t.pl = e.data, u.setData({
                            info: t
                        });
                    }
                }), app.util.request({
                    url: "entry/wxapp/ZxLikeList",
                    cachetime: "0",
                    data: {
                        zx_id: t.id
                    },
                    success: function(e) {
                        console.log(e), u.setData({
                            thumbs_up: e.data
                        });
                    }
                }), app.util.request({
                    url: "entry/wxapp/Footprint",
                    cachetime: "0",
                    data: {
                        zx_id: t.id,
                        user_id: r
                    },
                    success: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    speak: function(e) {
        this.setData({
            speak: !0,
            speak_type: 1
        });
    },
    speak1: function(e) {
        this.setData({
            speak: !1
        });
    },
    speak3: function(e) {
        console.log(e), wx.getStorageSync("users").id != this.data.info.user_id ? wx.showModal({
            title: "提示",
            content: "只有管理员才可以回复",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : this.setData({
            speak: !0,
            speak_type: 2,
            speak_id: e.currentTarget.id
        });
    },
    speaks: function(e) {
        console.log(e);
        var t = e.detail.value;
        this.setData({
            value: t
        });
    },
    Collection: function(e) {
        var t = this, a = t.data.info, o = t.data.user_id;
        app.util.request({
            url: "entry/wxapp/ZxLike",
            cachetime: "0",
            data: {
                zx_id: a.id,
                user_id: o
            },
            success: function(e) {
                console.log(e), 1 == e.data ? (wx.showToast({
                    title: "点赞成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), setTimeout(function() {
                    t.refresh();
                }, 2e3)) : wx.showModal({
                    title: "提示",
                    content: e.data,
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }), t.setData({
                    Collection: e.data
                });
            }
        });
    },
    speak2: function(e) {
        var t = this, a = t.data.value;
        if (console.log(a), null == a || "" == a) wx.showModal({
            title: "提示",
            content: "还没输入内容哦",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }); else {
            var o = t.data.user_id, n = t.data.info.id, s = t.data.speak_type, i = t.data.speak_id;
            1 == s ? app.util.request({
                url: "entry/wxapp/ZxPl",
                cachetime: "0",
                data: {
                    zx_id: n,
                    content: a,
                    user_id: o
                },
                success: function(e) {
                    console.log(e), 1 == e.data && (wx.showToast({
                        title: "发布成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function(e) {
                        t.refresh(), t.setData({
                            speak: !1
                        });
                    }, 2e3));
                }
            }) : app.util.request({
                url: "entry/wxapp/ZxHf",
                cachetime: "0",
                data: {
                    id: i,
                    reply: a
                },
                success: function(e) {
                    console.log(e), 1 == e.data && (wx.showToast({
                        title: "回复成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function(e) {
                        t.refresh(), t.setData({
                            speak: !1
                        });
                    }, 2e3));
                }
            });
        }
    },
    shouye: function(e) {
        wx.reLaunch({
            url: "../index/index",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = this.data.info;
        this.data.username;
        return console.log(t), "button" === e.from && console.log(e.target), {
            path: "zh_tcwq/pages/message/message_info?id=" + t.id,
            success: function(e) {},
            fail: function(e) {}
        };
    }
});