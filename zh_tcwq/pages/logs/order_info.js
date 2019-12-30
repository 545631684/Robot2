var app = getApp();

Page({
    data: {},
    tzkf: function() {
        wx.navigateTo({
            url: "../content/content"
        });
    },
    onLoad: function(t) {
        console.log(t);
        var e = wx.getStorageSync("url");
        this.setData({
            id: t.id,
            store_id: t.store_id,
            url: e
        }), this.refresh();
    },
    refresh: function(t) {
        var o = this, e = o.data.id, a = o.data.store_id;
        console.log(a), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: a
            },
            success: function(t) {
                console.log(t);
            }
        }), app.util.request({
            url: "entry/wxapp/OrderInfo",
            cachetime: "0",
            data: {
                order_id: e
            },
            success: function(t) {
                console.log(t), t.data.time = app.ormatDate(t.data.time).slice(0, 16);
                var e = t.data.good_money * t.data.good_num;
                o.setData({
                    order: t.data,
                    shop_price: e.toFixed(2)
                });
            }
        });
    },
    toorder: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/TuOrder",
            cachetime: "0",
            data: {
                order_id: e
            },
            success: function(t) {
                console.log(t), wx.showToast({
                    title: "发起退款申请",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 2e3);
            }
        });
    },
    delorder: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/DelOrder",
            cachetime: "0",
            data: {
                order_id: e
            },
            success: function(t) {
                console.log(t), wx.showToast({
                    title: "订单删除成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 2e3);
            }
        });
    },
    pay: function(t) {
        var e = wx.getStorageSync("openid"), o = t.currentTarget.dataset.id, a = t.currentTarget.dataset.money;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: e,
                money: a
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
                                order_id: o
                            },
                            success: function(t) {
                                console.log("改变订单状态"), console.log(t), wx.showToast({
                                    title: "付款成功",
                                    icon: "",
                                    image: "",
                                    duration: 2e3,
                                    mask: !0,
                                    success: function(t) {},
                                    fail: function(t) {},
                                    complete: function(t) {}
                                }), setTimeout(function() {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }, 2e3);
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
    onReady: function() {},
    onShow: function() {
        app.setNavigationBarColor(this), app.getUrl(this);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});