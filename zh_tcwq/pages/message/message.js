var app = getApp();

Page({
    data: {
        index: 0,
        types: 1
    },
    onLoad: function(e) {
        var t = this;
        app.util.request({
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
                    system: e.data
                });
            }
        }), app.pageOnLoad(this), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(e) {
                wx.setStorageSync("url", e.data), t.setData({
                    url: e.data
                });
            }
        }), t.refresh();
    },
    refresh: function(e) {
        var r = this;
        app.util.request({
            url: "entry/wxapp/ZxType",
            cachetime: "0",
            success: function(e) {
                console.log(e), r.setData({
                    zx: e.data
                });
            }
        });
        var t = wx.getStorageSync("city");
        console.log("轮播图的城市为" + t), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: t
            },
            success: function(e) {
                console.log(e);
                var t = [];
                for (var a in e.data) 3 == e.data[a].type && t.push(e.data[a]);
                console.log(t);
                0 != t.length ? r.setData({
                    top: 600
                }) : r.setData({
                    top: 300
                }), console.log(0), r.setData({
                    slide: t
                });
            }
        });
        var a, o, n, l = (a = new Date(), o = a.getMonth() + 1, n = a.getDate(), 1 <= o && o <= 9 && (o = "0" + o), 
        0 <= n && n <= 9 && (n = "0" + n), a.getFullYear() + "/" + o + "/" + n + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds());
        t = wx.getStorageSync("city");
        console.log("城市为" + t);
        var u = r.data.page, f = r.data.info;
        null == u && (u = 1), null == f && (f = []), app.util.request({
            url: "entry/wxapp/ZxList",
            cachetime: "0",
            data: {
                page: r.data.page,
                cityname: t
            },
            success: function(e) {
                if (console.log(e), 0 == e.data.length) r.setData({
                    refresh_top: !0
                }); else for (var t in r.setData({
                    refresh_top: !1,
                    page: u + 1
                }), f = f.concat(e.data), e.data) {
                    e.data[t].time = e.data[t].time.slice(0, 16), null == e.data[t].img ? e.data[t].type = 1 : e.data[t].type = 2;
                    var a = l, o = e.data[t].time.replace(/-/g, "/"), n = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g, s = Math.abs(Date.parse(a.replace(n, "$2-$3-$1$4")) - Date.parse(o.replace(n, "$2-$3-$1$4"))) / 1e3, c = Math.floor(s / 3600), i = Math.floor(s % 3600 / 60);
                    e.data[t].m = c, e.data[t].h = i, console.log(c + " 小时 " + i + " 分钟"), e.data[t].imgs = e.data[t].imgs.split(",").slice(0, 3);
                }
                console.log(f), r.setData({
                    info: f,
                    info1: f
                });
            }
        });
    },
    jumps: function(e) {
        var t = this, a = e.currentTarget.dataset.name, o = e.currentTarget.dataset.appid, n = e.currentTarget.dataset.src;
        if ("" == n) console.log("没有商家地址"), "" != o ? wx.showModal({
            title: "提示",
            content: "是否跳转到" + a,
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {
                1 == e.confirm && wx.navigateToMiniProgram({
                    appId: o,
                    path: "",
                    extraData: {
                        foo: "bar"
                    },
                    envVersion: "develop",
                    success: function(e) {
                        t.setData({
                            averdr: !0
                        });
                    }
                });
            },
            fail: function(e) {},
            complete: function(e) {}
        }) : t.setData({
            averdr: !0
        }); else if ("" == o) {
            console.log("没有小程序地址");
            var s = n.replace(/[^0-9]/gi, "");
            n = n = n.replace(/(\d+|\s+)/g, ""), console.log(n), wx.navigateTo({
                url: n + Number(s),
                success: function(e) {
                    t.setData({
                        averdr: !0
                    });
                },
                fail: function(e) {},
                complete: function(e) {}
            });
        } else console.log("两个都有"), wx.showModal({
            title: "提示",
            content: "是否跳转到" + a,
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {
                1 == e.confirm && wx.navigateToMiniProgram({
                    appId: o,
                    path: "",
                    extraData: {
                        foo: "bar"
                    },
                    envVersion: "develop",
                    success: function(e) {
                        t.setData({
                            averdr: !0
                        });
                    }
                });
            },
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    click: function(e) {
        console.log(e);
        var l = this, t = l.data.zx, a = (l.data.info1, l.data.info, e.currentTarget.dataset.index), o = a;
        console.log(t);
        var n, s, c, u = (n = new Date(), s = n.getMonth() + 1, c = n.getDate(), 1 <= s && s <= 9 && (s = "0" + s), 
        0 <= c && c <= 9 && (c = "0" + c), n.getFullYear() + "/" + s + "/" + c + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds()), i = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/ZxList",
            cachetime: "0",
            data: {
                type_id: t[a].id,
                cityname: i
            },
            success: function(e) {
                console.log(e);
                var t = e.data;
                for (var a in t) {
                    t[a].time = t[a].time.slice(0, 16), null == t[a].img ? t[a].type = 1 : t[a].type = 2;
                    var o = u, n = t[a].time.replace(/-/g, "/"), s = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g, c = Math.abs(Date.parse(o.replace(s, "$2-$3-$1$4")) - Date.parse(n.replace(s, "$2-$3-$1$4"))) / 1e3, i = Math.floor(c / 3600), r = Math.floor(c % 3600 / 60);
                    t[a].m = i, t[a].h = r, console.log(i + " 小时 " + r + " 分钟"), t[a].imgs = t[a].imgs.split(",").slice(0, 3);
                }
                console.log(t), l.setData({
                    info: t
                });
            }
        }), l.setData({
            zx: t,
            types: 2,
            active_index: o,
            index: a
        });
    },
    click1: function(e) {
        var t = this.data.zx, a = this.data.info1;
        this.setData({
            types: 1,
            zx: t,
            index: -1,
            info: a,
            active_index: -1
        });
    },
    message: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "message_info?id=" + t,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    release: function(e) {
        wx.navigateTo({
            url: "release",
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
        this.setData({
            page: 1,
            index: 0,
            types: 1,
            info: [],
            active_index: -1
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh();
    },
    onShareAppMessage: function() {}
});