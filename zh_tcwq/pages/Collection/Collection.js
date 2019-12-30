var app = getApp();

Page({
    data: {
        star2: [ {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        } ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35,
        tabs: [ "收藏的信息", "收藏的商家" ],
        activeIndexe: 0,
        sliderOffsete: 0,
        sliderLefte: 0
    },
    navClick: function(a) {
        this.setData({
            sliderOffsete: a.currentTarget.offsetLeft,
            activeIndexe: a.currentTarget.id
        });
    },
    tabClick: function(a) {
        var o = this;
        console.log(a);
        var t = o.data.classification, e = a.currentTarget.id, n = t[e].id, i = t[e].name;
        console.log(t[e]), this.setData({
            activeIndex: e
        }), app.util.request({
            url: "entry/wxapp/PostList",
            cachetime: "0",
            data: {
                type2_id: n
            },
            success: function(a) {
                console.log(a);
                var t = [];
                for (var e in a.data) a.data[e].type2_name = i, a.data[e].img = a.data[e].img.split(","), 
                null != a.data[e].store_name && t.concat(a.data[e]);
                console.log(t), o.setData({
                    classification_info: t
                });
            }
        });
    },
    onLoad: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(a) {
                console.log(a), t.setData({
                    System: a.data
                });
            }
        }), console.log(a), wx.setNavigationBarTitle({
            title: a.name
        });
        var e = wx.getStorageSync("url");
        t.setData({
            url: e
        }), t.reload();
    },
    reload: function(a) {
        var p = this, t = wx.getStorageSync("users").id;
        console.log(t), app.util.request({
            url: "entry/wxapp/MyCollection",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(a) {
                console.log(a);
                var t = [];
                for (var e in a.data) if (null != a.data[e].details) {
                    var o = p.ormatDate(a.data[e].time);
                    a.data[e].img = a.data[e].img.split(","), 4 <= a.data[e].img.length ? a.data[e].img1 = a.data[e].img.slice(0, 4) : a.data[e].img1 = a.data[e].img, 
                    a.data[e].time = o.slice(0, 16), t.push(a.data[e]);
                }
                console.log(t), p.setData({
                    classification_info: t
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MyStoreCollection",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(a) {
                console.log(a);
                var t = p.data.star2;
                console.log(t);
                var e = "../image/xing.png", o = [];
                for (var n in a.data) if (null != a.data[n].store_name) {
                    o.push(a.data[n]);
                    var i = a.data[n].coordinates.split(",");
                    a.data[n].lat2 = Number(wx.getStorageSync("Location").latitude), a.data[n].lng2 = Number(wx.getStorageSync("Location").longitude);
                    var r = Number(wx.getStorageSync("Location").latitude), s = Number(wx.getStorageSync("Location").longitude), c = i[0], l = i[1], d = r * Math.PI / 180, g = c * Math.PI / 180, u = d - g, f = s * Math.PI / 180 - l * Math.PI / 180, m = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(u / 2), 2) + Math.cos(d) * Math.cos(g) * Math.pow(Math.sin(f / 2), 2)));
                    m *= 6378.137;
                    m = (m = Math.round(1e4 * m) / 1e4).toFixed(2);
                    a.data[n].distance = m, a.data[n].star = t, a.data[n].score = parseInt(a.data[n].score), 
                    0 == a.data[n].score ? a.data[n].star = a.data[n].star : 1 == a.data[n].score ? a.data[n].star[0].img = e : 2 == a.data[n].score ? (a.data[n].star[0].img = e, 
                    a.data[n].star[1].img = e) : 3 == a.data[n].score ? (a.data[n].star[0].img = e, 
                    a.data[n].star[1].img = e, a.data[n].star[2].img = e) : 4 == a.data[n].score ? (a.data[n].star[0].img = e, 
                    a.data[n].star[1].img = e, a.data[n].star[2].img = e, a.data[n].star[3].img = e) : 5 == a.data[n].score && (a.data[n].star[0].img = e, 
                    a.data[n].star[1].img = e, a.data[n].star[2].img = e, a.data[n].star[3].img = e, 
                    a.data[n].star[4].img = e), console.log(o), p.setData({
                        sellers: o
                    });
                }
            }
        });
    },
    ormatDate: function(a) {
        var t = new Date(1e3 * a);
        return t.getFullYear() + "-" + e(t.getMonth() + 1, 2) + "-" + e(t.getDate(), 2) + " " + e(t.getHours(), 2) + ":" + e(t.getMinutes(), 2) + ":" + e(t.getSeconds(), 2);
        function e(a, t) {
            for (var e = "" + a, o = e.length, n = "", i = t; i-- > o; ) n += "0";
            return n + e;
        }
    },
    store: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + t,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    see: function(a) {
        console.log(a), console.log(this.data);
        var t = this.data.classification_info, e = a.currentTarget.dataset.id;
        for (var o in t) if (t[o].id == e) var n = t[o];
        console.log(n), wx.navigateTo({
            url: "../infodetial/infodetial?id=" + n.information_id,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    phone: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    phone1: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});