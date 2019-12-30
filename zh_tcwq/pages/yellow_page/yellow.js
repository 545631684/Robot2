var app = getApp();

Page({
    data: {
        luntext: [ "附近发现", "最新收录", "热门推荐" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35,
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        refresh_top: !1,
        yellow_list: [],
        page: 1
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    onLoad: function(t) {
        var s = this, e = wx.getStorageSync("url");
        s.setData({
            url: e,
            system: wx.getStorageSync("System")
        }), wx.setNavigationBarTitle({
            title: getApp().xtxx.hy_title
        }), app.setNavigationBarColor(this), app.util.request({
            url: "entry/wxapp/yellowType",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var e = t.data;
                e.length <= 5 ? s.setData({
                    height: 165
                }) : 5 < e.length && s.setData({
                    height: 340
                });
                for (var a = [], n = 0, o = e.length; n < o; n += 10) a.push(e.slice(n, n + 10));
                console.log(a), s.setData({
                    nav: a
                });
            }
        }), wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    windowHeight: t.windowHeight
                });
            }
        });
        var a = wx.getStorageSync("city");
        console.log("轮播图的城市为" + a), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: a
            },
            success: function(t) {
                var e = [];
                for (var a in t.data) 6 == t.data[a].type && e.push(t.data[a]);
                s.setData({
                    slide: e
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Llz",
            cachetime: "0",
            data: {
                cityname: wx.getStorageSync("city"),
                type: 3
            },
            success: function(t) {
                console.log(t), s.setData({
                    unitid: t.data
                });
            }
        }), app.getLocation(function(t) {
            console.log(t), s.setData({
                lat: t.latitude,
                lng: t.longitude
            }), s.refresh();
        });
    },
    refresh: function(t) {
        var a = this, e = wx.getStorageSync("city");
        console.log("城市为" + e);
        var n = a.data.page, o = a.data.type || 1, s = a.data.yellow_list1;
        null == n && (n = 1), null == s && (s = []), console.log("page为" + e), app.util.request({
            url: "entry/wxapp/YellowPageList",
            cachetime: "0",
            data: {
                type: o,
                lat: a.data.lat,
                lng: a.data.lng,
                page: n,
                cityname: e
            },
            success: function(t) {
                if (console.log(t), 0 == t.data) a.setData({
                    refresh_top: !0
                }); else {
                    for (var e in s = s.concat(t.data), t.data) t.data[e].distance = (parseFloat(t.data[e].juli) / 1e3).toFixed(2);
                    a.setData({
                        yellow_list: s,
                        yellow_list1: s,
                        page: n + 1,
                        refresh_top: !1
                    });
                }
            }
        });
    },
    search: function(t) {
        var e = this;
        console.log(t);
        var a = t.detail.value;
        "" == a ? e.setData({
            search_yellow: []
        }) : app.util.request({
            url: "entry/wxapp/YellowPageList",
            cachetime: "0",
            data: {
                keywords: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    search_yellow: t.data
                });
            }
        });
    },
    tabClick: function(t) {
        var e = t.currentTarget.id;
        console.log(e);
        var a = this.data.yellow_list1;
        console.log(this.data, a, e), this.setData({
            refresh_top: !1,
            page: 1,
            type: parseInt(e) + 1,
            yellow_list1: [],
            activeIndex: t.currentTarget.id
        }), this.refresh();
    },
    yellow_info: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.user_id;
        console.log(a), wx.navigateTo({
            url: "yellowinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    sellted: function(t) {
        wx.navigateTo({
            url: "settled",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    store_type_id: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.typename;
        wx.navigateTo({
            url: "yellowtype?id=" + e + "&typename=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    mine_yellow: function(t) {
        wx.redirectTo({
            url: "mine_yellow"
        });
    },
    shouye: function(t) {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    jumps: function(t) {
        var e = this, a = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid), n = t.currentTarget.dataset.src, o = t.currentTarget.dataset.id, s = t.currentTarget.dataset.sjtype;
        console.log(o);
        var i = t.currentTarget.dataset.type;
        if (1 == i) {
            if (console.log(n), "../distribution/jrhhr" == n) return e.redinfo(), !1;
            wx.navigateTo({
                url: n,
                success: function(t) {
                    e.setData({
                        averdr: !0
                    });
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        } else 2 == i ? wx.navigateTo({
            url: "../car/car?vr=" + o + "&sjtype=" + s,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 3 == i && wx.navigateToMiniProgram({
            appId: a,
            path: "",
            extraData: {
                foo: "bar"
            },
            success: function(t) {
                e.setData({
                    averdr: !0
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            yellow_list: []
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh();
    },
    onShareAppMessage: function() {}
});