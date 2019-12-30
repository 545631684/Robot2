var app = getApp();

Page({
    data: {
        luntext: [ "待付款", "待发货", "待收货", "已完成", "退货/售后" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35
    },
    onLoad: function(t) {
        var e = this, a = wx.getStorageSync("url");
        null == t.activeIndex ? e.setData({
            activeIndex: 0,
            url: a,
            System: wx.getStorageSync("System")
        }) : e.setData({
            activeIndex: t.activeIndex,
            url: a
        }), e.refresh();
    },
    refresh: function(t) {
        var c = this;
        var e, a, r, d = (e = new Date(), a = e.getMonth() + 1, r = e.getDate(), 1 <= a && a <= 9 && (a = "0" + a), 
        0 <= r && r <= 9 && (r = "0" + r), e.getFullYear() + "-" + a + "-" + r + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds()).slice(0, 10);
        function i(t, e) {
            var a = new Date(t), r = new Date(a.getFullYear(), a.getMonth(), a.getDate() + e);
            a.getFullYear(), a.getMonth(), a.getDate();
            return r.getFullYear() + "-" + (r.getMonth() + 1) + "-" + r.getDate();
        }
        var u = c.data.activeIndex, o = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyOrder",
            cachetime: "0",
            data: {
                user_id: o
            },
            success: function(t) {
                console.log(t);
                var e = [], a = [], r = [], o = [], n = [];
                for (var s in t.data) t.data[s].time = app.ormatDate(t.data[s].time), 1 == t.data[s].state ? e.push(t.data[s]) : 2 == t.data[s].state ? a.push(t.data[s]) : 3 == t.data[s].state ? (t.data[s].time = i(t.data[s].time, 7), 
                console.log(d), t.data[s].time >= d ? console.log(t.data[s]) : app.util.request({
                    url: "entry/wxapp/CompleteOrder",
                    cachetime: "0",
                    data: {
                        order_id: t.data[s].id
                    },
                    success: function(t) {
                        console.log(t), c.refresh();
                    }
                }), r.push(t.data[s])) : 4 == t.data[s].state ? o.push(t.data[s]) : 5 != t.data[s].state && 6 != t.data[s].state && 7 != t.data[s].state || n.push(t.data[s]);
                0 == u ? c.setData({
                    order: e
                }) : 1 == u ? c.setData({
                    order: a
                }) : 2 == u ? c.setData({
                    order: r
                }) : 3 == u ? c.setData({
                    order: o
                }) : 4 == u && c.setData({
                    order: n
                }), console.log(e);
            }
        });
    },
    tabClick: function(t) {
        var c = this, d = t.currentTarget.id, e = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyOrder",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                var e = [], a = [], r = [], o = [], n = [];
                for (var s in t.data) 1 == t.data[s].state && e.push(t.data[s]), 2 == t.data[s].state && a.push(t.data[s]), 
                3 == t.data[s].state && r.push(t.data[s]), 4 == t.data[s].state && o.push(t.data[s]), 
                5 != t.data[s].state && 6 != t.data[s].state && 7 != t.data[s].state || n.push(t.data[s]);
                0 == d ? c.setData({
                    order: e
                }) : 1 == d ? c.setData({
                    order: a
                }) : 2 == d ? c.setData({
                    order: r
                }) : 3 == d ? c.setData({
                    order: o
                }) : 4 == d && c.setData({
                    order: n
                });
            }
        }), c.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        });
    },
    complete: function(t) {
        wx.showLoading({
            title: ""
        });
        var e = this;
        console.log(t);
        var a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/CompleteOrder",
            cachetime: "0",
            data: {
                order_id: a
            },
            success: function(t) {
                console.log(t), wx.hideLoading(), e.refresh();
            }
        });
    },
    toorder: function(t) {
        var e = this;
        console.log(t);
        var a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/TuOrder",
            cachetime: "0",
            data: {
                order_id: a
            },
            success: function(t) {
                console.log(t), e.refresh();
            }
        });
    },
    delorder: function(t) {
        var e = this;
        console.log(t);
        var a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/DelOrder",
            cachetime: "0",
            data: {
                order_id: a
            },
            success: function(t) {
                console.log(t), wx.showModal({
                    title: "提示",
                    content: "是否删除订单，删除后不可恢复",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(t) {
                        t.confirm && e.refresh();
                    },
                    fail: function(t) {},
                    complete: function(t) {}
                });
            }
        });
    },
    pay: function(t) {
        var e = this, a = wx.getStorageSync("openid"), r = t.currentTarget.dataset.id, o = t.currentTarget.dataset.storeid;
        console.log(o);
        var n = t.currentTarget.dataset.money;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: a,
                money: n,
                order_id: r
            },
            success: function(t) {
                console.log(t), wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: t.data.signType,
                    paySign: t.data.paySign,
                    success: function(t) {
                        console.log("这里是支付成功"), console.log(t), app.util.request({
                            url: "entry/wxapp/PayOrder",
                            cachetime: "0",
                            data: {
                                order_id: r
                            },
                            success: function(t) {
                                console.log("改变订单状态"), console.log(t), e.refresh();
                            }
                        }), app.util.request({
                            url: "entry/wxapp/sms2",
                            cachetime: "0",
                            data: {
                                store_id: o
                            },
                            success: function(t) {
                                console.log(t);
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "支付失败",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    order_info: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.store_id;
        wx.navigateTo({
            url: "order_info?id=" + e + "&store_id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        }), this.refresh();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});