var app = getApp();

Page({
    data: {
        slide: [ {
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/tdJ70qw1fEfjfVJfFDD09570eqF28d.jpg"
        }, {
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/k5JQwpBfpb0u8sNNy5l5bhlnrhl33W.jpg"
        }, {
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/zUeEednDedmUkIUumN9XI6IXU91eko.jpg"
        } ],
        release: [ {
            name: "人找车",
            id: 0
        }, {
            name: "车找人",
            id: 1
        }, {
            name: "车找货",
            id: 2
        }, {
            name: "货找车",
            id: 3
        } ],
        shunfabu: [ "人找车", "车找人", "车找货", "货找车" ],
        index: 0,
        foot: !1,
        pc: [],
        refresh_top: !1
    },
    notice: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../notice/notice?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    shunfabu: function(t) {
        console.log(t);
        var a = t.currentTarget.id;
        this.setData({
            foot: !1
        }), wx.navigateTo({
            url: "shunfabu/shunfabu?id=" + a
        });
    },
    call_phone: function(t) {
        console.log(t), wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    footbtn: function(t) {
        var a = this;
        0 == a.data.foot ? a.setData({
            foot: !0
        }) : a.setData({
            foot: !1
        });
    },
    jumps: function(t) {
        var a = this, e = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid), o = t.currentTarget.dataset.src, n = t.currentTarget.dataset.wb_src, s = t.currentTarget.dataset.type;
        if (1 == s) {
            var c = o.replace(/[^0-9]/gi, "");
            o = o = o.replace(/(\d+|\s+)/g, ""), console.log(o), console.log(c), console.log(), 
            wx.navigateTo({
                url: o + Number(c),
                success: function(t) {
                    a.setData({
                        averdr: !0
                    });
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        } else 2 == s ? wx.navigateTo({
            url: "../car/car?vr=" + n,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 3 == s && wx.navigateToMiniProgram({
            appId: e,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(t) {
                a.setData({
                    averdr: !0
                });
            }
        });
    },
    carinfo: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "shuninfo2/shuninfo2?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onLoad: function(t) {
        var a = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        });
        var e = wx.getStorageSync("url"), o = wx.getStorageSync("System");
        a.setData({
            url: e,
            system: o
        }), app.util.request({
            url: "entry/wxapp/Llz",
            cachetime: "0",
            data: {
                cityname: wx.getStorageSync("city"),
                type: 4
            },
            success: function(t) {
                console.log(t), a.setData({
                    unitid: t.data
                });
            }
        }), a.refresh();
    },
    refresh: function(t) {
        var o = this;
        var a, e, n, s = (a = new Date(), e = a.getMonth() + 1, n = a.getDate(), 1 <= e && e <= 9 && (e = "0" + e), 
        0 <= n && n <= 9 && (n = "0" + n), a.getFullYear() + "-" + e + "-" + n + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds());
        console.log(s);
        var c = wx.getStorageSync("city");
        console.log(c);
        var r = o.data.page, i = o.data.pc;
        null == r && (r = 1), null == i && (i = []), app.util.request({
            url: "entry/wxapp/CarList",
            cachetime: "0",
            data: {
                cityname: c,
                page: r
            },
            success: function(t) {
                for (var a in console.log(t), 0 == t.data.length ? o.setData({
                    refresh_top: !0
                }) : (o.setData({
                    page: r + 1,
                    refresh_top: !1
                }), i = i.concat(t.data)), t.data) t.data[a].tz.time = app.ormatDate(t.data[a].tz.time).slice(5, 16), 
                t.data[a].tz.start_time1 = t.data[a].tz.start_time.slice(5, 10), t.data[a].tz.start_time2 = t.data[a].tz.start_time.slice(10, 17), 
                2 == t.data[a].tz.is_open ? (t.data[a].tz.class2 = "car3", t.data[a].tz.class3 = "car4", 
                t.data[a].tz.class4 = "car5") : (t.data[a].tz.class2 = "", t.data[a].tz.class3 = "", 
                t.data[a].tz.class4 = ""), "人找车" == t.data[a].tz.typename ? (t.data[a].tz.class = "color1", 
                t.data[a].tz.class1 = "car1") : "车找人" == t.data[a].tz.typename ? (t.data[a].tz.class = "color2", 
                t.data[a].tz.class1 = "car2") : "货找车" == t.data[a].tz.typename ? (t.data[a].tz.class = "color1", 
                t.data[a].tz.class1 = "car1") : "车找货" == t.data[a].tz.typename && (t.data[a].tz.class = "color2", 
                t.data[a].tz.class1 = "car2");
                o.setData({
                    pc: i
                });
            }
        }), app.util.request({
            url: "entry/wxapp/news",
            cachetime: "0",
            data: {
                cityname: c
            },
            success: function(t) {
                console.log(t);
                var a = [];
                for (var e in t.data) 3 == t.data[e].type && a.push(t.data[e]);
                o.setData({
                    msgList: a
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: c
            },
            success: function(t) {
                console.log(t);
                var a = [];
                for (var e in t.data) 4 == t.data[e].type && a.push(t.data[e]);
                console.log(a);
                0 != a.length ? o.setData({
                    top: 600
                }) : o.setData({
                    top: 300
                }), console.log(0), o.setData({
                    slide: a
                });
            }
        });
    },
    carlist: function(t) {
        var e = this;
        console.log(t);
        var a = t.currentTarget.dataset.typename;
        app.util.request({
            url: "entry/wxapp/TypeCarList",
            cachetime: "0",
            data: {
                typename: a
            },
            success: function(t) {
                for (var a in console.log(t), t.data) t.data[a].tz.time = app.ormatDate(t.data[a].tz.time).slice(5, 16), 
                t.data[a].tz.start_time1 = t.data[a].tz.start_time.slice(5, 10), t.data[a].tz.start_time2 = t.data[a].tz.start_time.slice(10, 16), 
                "人找车" == t.data[a].tz.typename ? (t.data[a].tz.class = "color1", t.data[a].tz.class1 = "car1") : "车找人" == t.data[a].tz.typename ? (t.data[a].tz.class = "color2", 
                t.data[a].tz.class1 = "car2") : "货找车" == t.data[a].tz.typename ? (t.data[a].tz.class = "color1", 
                t.data[a].tz.class1 = "car1") : "车找货" == t.data[a].tz.typename && (t.data[a].tz.class = "color2", 
                t.data[a].tz.class1 = "car2");
                e.setData({
                    pc: t.data
                });
            }
        });
    },
    shouye: function(t) {
        wx.reLaunch({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    mine_yellow: function(t) {
        wx.redirectTo({
            url: "../logs/mine_car"
        });
    },
    whole: function(t) {
        this.refresh();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh();
    },
    onShareAppMessage: function() {}
});