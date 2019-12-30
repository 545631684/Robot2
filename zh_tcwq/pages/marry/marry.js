var app = getApp();

Page({
    data: {
        sliderOffset: 0,
        activeIndex1: 1,
        sliderLeft: 35,
        refresh_top: !1,
        refresh1_top: !1,
        page: 1,
        page1: 1,
        tie: [],
        tie1: []
    },
    hdsy: function(t) {
        wx.reLaunch({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    hdft: function(t) {
        wx.reLaunch({
            url: "../fabu/fabu/fabu",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    tabClick: function(t) {
        var a = t.currentTarget.id, e = this.data.classification, i = e[a].id, n = e[a].name;
        this.setData({
            activeIndex: a,
            activeIndex1: 0,
            page1: 1,
            type2_id: i,
            type2_name: n,
            tie1: []
        }), this.refresh1();
    },
    onLoad: function(t) {
        console.log(t);
        var a = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight
                });
            }
        }), wx.setNavigationBarTitle({
            title: t.name
        });
        var e = t.id, i = wx.getStorageSync("url");
        a.setData({
            id: e,
            url: i,
            tname: t.name,
            system: wx.getStorageSync("System")
        }), a.reload(), wx.getLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t), a.setData({
                    lat: t.latitude,
                    lng: t.longitude
                }), a.refresh();
            }
        });
    },
    wole: function(t) {
        this.setData({
            activeIndex: -1,
            activeIndex1: 1,
            classification_info: this.data.tie
        });
    },
    reload: function(t) {
        var a = this, e = a.data.id;
        console.log(e), app.util.request({
            url: "entry/wxapp/type2",
            cachetime: "0",
            data: {
                id: e
            },
            success: function(t) {
                if (console.log(t), 0 < t.data.length) {
                    t.data[0].id, t.data[0].name;
                    a.setData({
                        classification: t.data
                    });
                }
            }
        });
    },
    refresh: function(t) {
        var o = this, a = o.data.id, e = wx.getStorageSync("city");
        console.log(e), console.log(o.data.page), app.util.request({
            url: "entry/wxapp/list",
            cachetime: "0",
            data: {
                type_id: a,
                page: o.data.page,
                lat: o.data.lat,
                lng: o.data.lng,
                cityname: e
            },
            success: function(t) {
                if (console.log(t), 0 == t.data.length) o.setData({
                    refresh_top: !0
                }); else {
                    o.setData({
                        page: o.data.page + 1
                    });
                    var a = o.data.tie;
                    for (var e in a = a.concat(t.data), t.data) {
                        for (var i in t.data[e].tz.img = t.data[e].tz.img.split(","), t.data[e].tz.details = t.data[e].tz.details.replace("↵", " "), 
                        t.data[e].tz.time = o.ormatDate(t.data[e].tz.time), 4 < t.data[e].tz.img.length && (t.data[e].tz.img_length = Number(t.data[e].tz.img.length) - 4), 
                        4 <= t.data[e].tz.img.length ? t.data[e].tz.img = t.data[e].tz.img.slice(0, 4) : t.data[e].tz.img = t.data[e].tz.img, 
                        Number(t.data[e].tz.juli) < 1e3 ? t.data[e].tz.juli = Number(t.data[e].tz.juli) + "m" : t.data[e].tz.juli = (Number(t.data[e].tz.juli) / 1e3).toFixed(2) + "km", 
                        t.data[e].label) t.data[e].label[i].number = (void 0, n = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")", 
                        n);
                    }
                    o.setData({
                        classification_info: a,
                        tie: a
                    });
                }
                var n;
            }
        });
    },
    refresh1: function(t) {
        var r = this, a = wx.getStorageSync("city");
        console.log(r.data.type2_id), console.log(r.data.type2_name), app.util.request({
            url: "entry/wxapp/PostList",
            cachetime: "0",
            data: {
                type2_id: r.data.type2_id,
                page: r.data.page1,
                lat: r.data.lat,
                lng: r.data.lng,
                cityname: a
            },
            success: function(t) {
                console.log(t), 0 == t.data ? (wx.showToast({
                    title: "没有更多了",
                    icon: "",
                    image: "",
                    duration: 1e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), r.setData({
                    refresh1_top: !0
                })) : r.setData({
                    page1: r.data.page1 + 1
                });
                var a, e = r.data.tie1;
                for (var i in console.log(e), e = e.concat(t.data), t.data) {
                    t.data[i].tz.type2_name = r.data.type2_name;
                    var n = r.ormatDate(t.data[i].tz.time);
                    for (var o in t.data[i].tz.time = n.slice(0, 16), t.data[i].tz.img = t.data[i].tz.img.split(",").slice(0, 4), 
                    Number(t.data[i].tz.juli) < 1e3 ? t.data[i].tz.juli = Number(t.data[i].tz.juli) + "m" : t.data[i].tz.juli = (Number(t.data[i].tz.juli) / 1e3).toFixed(2) + "km", 
                    t.data[i].label) t.data[i].label[o].number = (void 0, a = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")", 
                    a);
                }
                r.setData({
                    classification_info: e,
                    tie1: e
                });
            }
        });
    },
    EventHandle: function(t) {
        1 == this.data.activeIndex1 ? 0 == this.data.refresh_top && this.refresh() : 0 == this.data.refresh1_top && this.refresh1();
    },
    thumbs_up: function(t) {
        var a = this, e = t.currentTarget.dataset.id, i = wx.getStorageSync("users").id, n = Number(t.currentTarget.dataset.num);
        app.util.request({
            url: "entry/wxapp/Like",
            cachetime: "0",
            data: {
                information_id: e,
                user_id: i
            },
            success: function(t) {
                1 != t.data ? wx.showModal({
                    title: "提示",
                    content: "不能重复点赞",
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "",
                    confirmText: "确认",
                    confirmColor: "",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }) : (a.reload(), a.setData({
                    thumbs_ups: !0,
                    thumbs_up: n + 1
                }));
            }
        });
    },
    ormatDate: function(t) {
        var a = new Date(1e3 * t);
        return a.getFullYear() + "-" + e(a.getMonth() + 1, 2) + "-" + e(a.getDate(), 2) + " " + e(a.getHours(), 2) + ":" + e(a.getMinutes(), 2) + ":" + e(a.getSeconds(), 2);
        function e(t, a) {
            for (var e = "" + t, i = e.length, n = "", o = a; o-- > i; ) n += "0";
            return n + e;
        }
    },
    see: function(t) {
        var a = this.data.classification_info, e = t.currentTarget.dataset.id;
        for (var i in a) if (a[i].tz.id == e) var n = a[i].tz;
        wx.navigateTo({
            url: "../infodetial/infodetial?id=" + n.id,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    phone: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this.data.id, a = this.data.tname;
        return console.log(t, a), {
            path: "/zh_tcwq/pages/marry/marry?id=" + t + "&name=" + a,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});