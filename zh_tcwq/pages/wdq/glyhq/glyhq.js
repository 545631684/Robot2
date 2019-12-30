var app = getApp(), util = require("../../../utils/util.js");

Page({
    data: {
        tabs: [ "有效的", "失效的" ],
        activeIndex: 0,
        items1: [],
        items: []
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    cksj: function(t) {
        var e = t.currentTarget.dataset.yhqid, a = t.currentTarget.dataset.sjid;
        console.log(t, e, a), wx.navigateTo({
            url: "glyhqdl?yhqid=" + e + "&sjid=" + a
        });
    },
    reLoad: function() {
        var n = this, t = this.data.store_id, c = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
        console.log(t, c), app.util.request({
            url: "entry/wxapp/StoreCoupon2",
            cachetime: "0",
            data: {
                store_id: t
            },
            success: function(t) {
                console.log(t.data);
                for (var e = t.data, a = [], o = [], s = 0; s < e.length; s++) "3" != e[s].state && util.validTime1(c, e[s].end_time) ? a.push(e[s]) : (e[s].isTouchMove = !1, 
                o.push(e[s]));
                console.log(a, o), n.setData({
                    items1: a,
                    items: o
                });
            }
        });
    },
    onLoad: function(t) {
        var e = this, a = wx.getStorageSync("url");
        console.log(a, t), this.setData({
            url: a,
            store_id: t.store_id
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: t.store_id
            },
            success: function(t) {
                console.log(t), e.setData({
                    seller: t.data.store[0]
                });
            }
        }), this.reLoad();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    touchstart1: function(t) {
        this.data.items1.forEach(function(t, e) {
            t.isTouchMove && (t.isTouchMove = !1);
        }), this.setData({
            startX: t.changedTouches[0].clientX,
            startY: t.changedTouches[0].clientY,
            items1: this.data.items1
        });
    },
    touchmove1: function(t) {
        var e = this, a = t.currentTarget.dataset.index, o = e.data.startX, s = e.data.startY, n = t.changedTouches[0].clientX, c = t.changedTouches[0].clientY, i = e.angle({
            X: o,
            Y: s
        }, {
            X: n,
            Y: c
        });
        e.data.items1.forEach(function(t, e) {
            t.isTouchMove = !1, 30 < Math.abs(i) || e == a && (t.isTouchMove = !(o < n));
        }), e.setData({
            items1: e.data.items1
        });
    },
    touchstart: function(t) {
        this.data.items.forEach(function(t, e) {
            t.isTouchMove && (t.isTouchMove = !1);
        }), this.setData({
            startX: t.changedTouches[0].clientX,
            startY: t.changedTouches[0].clientY,
            items: this.data.items
        });
    },
    touchmove: function(t) {
        var e = this, a = t.currentTarget.dataset.index, o = e.data.startX, s = e.data.startY, n = t.changedTouches[0].clientX, c = t.changedTouches[0].clientY, i = e.angle({
            X: o,
            Y: s
        }, {
            X: n,
            Y: c
        });
        e.data.items.forEach(function(t, e) {
            t.isTouchMove = !1, 30 < Math.abs(i) || e == a && (t.isTouchMove = !(o < n));
        }), e.setData({
            items: e.data.items
        });
    },
    angle: function(t, e) {
        var a = e.X - t.X, o = e.Y - t.Y;
        return 360 * Math.atan(o / a) / (2 * Math.PI);
    },
    del: function(t) {
        var e = this, a = t.currentTarget.dataset.yhqid;
        console.log(t, a), wx.showModal({
            title: "提示",
            content: "确认删除此券吗？删除后将失效",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), app.util.request({
                    url: "entry/wxapp/DelCoupons",
                    cachetime: "0",
                    data: {
                        coupons_id: a
                    },
                    success: function(t) {
                        console.log(t.data), 1 == t.data && (wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            e.reLoad();
                        }, 1e3));
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    del2: function(t) {
        var e = this, a = t.currentTarget.dataset.yhqid;
        console.log(t, a), wx.showModal({
            title: "提示",
            content: "确认删除此券吗？删除后将从你的记录中删除",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), app.util.request({
                    url: "entry/wxapp/DelCoupon2",
                    cachetime: "0",
                    data: {
                        coupon_id: a
                    },
                    success: function(t) {
                        console.log(t.data), 1 == t.data && (wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            e.reLoad();
                        }, 1e3));
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    }
});