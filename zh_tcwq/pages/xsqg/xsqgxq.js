var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {},
    opennav: function() {
        this.setData({
            opendh: !this.data.opendh
        });
    },
    bought: function() {
        wx.navigateTo({
            url: "yqgyh?goodid=" + this.data.QgGoodInfo.id
        });
    },
    tzsj: function() {
        wx.reLaunch({
            url: "/zh_tcwq/pages/index/index"
        });
    },
    order: function() {
        wx.navigateTo({
            url: "order"
        });
    },
    addformSubmit: function(t) {
        console.log("formid", t.detail.formId);
        var a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: a,
                form_id: t.detail.formId
            },
            success: function(t) {
                console.log(t.data);
            }
        });
    },
    ljqg: function() {
        var t = this.data.userinfo, a = this.data.QgGoodInfo.store_id, e = this.data.QgGoodInfo.id;
        console.log(t), "" == t.img || "" == t.name ? wx.navigateTo({
            url: "/zh_tcwq/pages/index/getdl"
        }) : wx.redirectTo({
            url: "qgform?storeid=" + a + "&goodid=" + e
        });
    },
    maketel: function(t) {
        var a = this.data.StoreInfo.tel;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    location: function() {
        var t = this.data.StoreInfo.coordinates.split(","), a = this.data.StoreInfo;
        console.log(t), wx.openLocation({
            latitude: parseFloat(t[0]),
            longitude: parseFloat(t[1]),
            address: a.address,
            name: a.store_name
        });
    },
    onLoad: function(t) {
        app.setNavigationBarColor(this);
        var a, i = this, e = decodeURIComponent(t.scene);
        console.log("scene", e), "undefined" != e && (a = e), null != t.id && (console.log("跳转进来的id:", t.id), 
        a = t.id), console.log(t, a), app.getUserInfo(function(t) {
            console.log(t), i.setData({
                userinfo: t
            }), app.util.request({
                url: "entry/wxapp/IsPay",
                cachetime: "0",
                data: {
                    user_id: t.id,
                    good_id: a
                },
                success: function(t) {
                    i.setData({
                        IsPay: t.data
                    });
                }
            });
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), i.setData({
                    url: t.data,
                    xtxx: getApp().xtxx
                });
            }
        }), app.util.request({
            url: "entry/wxapp/QgPeople",
            cachetime: "0",
            data: {
                good_id: a
            },
            success: function(t) {
                console.log(t.data), i.setData({
                    QgPeople: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/QgGoodInfo",
            cachetime: "0",
            data: {
                id: a
            },
            success: function(t) {
                console.log(t), wx.setNavigationBarTitle({
                    title: t.data.money + "元抢购" + t.data.name
                }), t.data.yqnum = ((Number(t.data.number) - Number(t.data.surplus)) / Number(t.data.number) * 100).toFixed(1), 
                t.data.img = t.data.img.split(","), t.data.details_img = t.data.details_img.split(",");
                new Date(t.data.end_time).getTime();
                !function t(a) {
                    var e = a || [];
                    var o = Math.round(new Date().getTime() / 1e3);
                    var n = e - o || [];
                    i.setData({
                        clock: function(t) {
                            var a = Math.floor(t), e = Math.floor(a / 3600 / 24), o = Math.floor(a / 3600 % 24), n = Math.floor(a / 60 % 60), i = Math.floor(a % 60);
                            e < 10 && (e = "0" + e);
                            o < 10 && (o = "0" + o);
                            i < 10 && (i = "0" + i);
                            n < 10 && (n = "0" + n);
                            return {
                                day: e,
                                hr: o,
                                min: n,
                                sec: i
                            };
                        }(n)
                    });
                    n <= 0 ? i.setData({
                        clock: !1
                    }) : 0 < n && setTimeout(function() {
                        n -= 1e3, t(a);
                    }, 1e3);
                }(t.data.end_time), t.data.start_time = util.ormatDate(t.data.start_time), t.data.end_time = util.ormatDate(t.data.end_time), 
                i.setData({
                    QgGoodInfo: t.data
                }), app.util.request({
                    url: "entry/wxapp/StoreInfo",
                    cachetime: "0",
                    data: {
                        id: t.data.store_id
                    },
                    success: function(t) {
                        console.log("商家详情", t), i.setData({
                            StoreInfo: t.data.store[0]
                        });
                    }
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
    onShareAppMessage: function() {
        var t = this.data.userinfo, a = this.data.QgGoodInfo, e = t.name + "邀请你" + a.money + "元抢购" + a.name;
        return console.log(t), {
            title: e,
            path: "/zh_tcwq/pages/xsqg/xsqgxq?id=" + a.id,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});