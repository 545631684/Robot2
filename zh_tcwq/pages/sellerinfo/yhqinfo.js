var dsq, app = getApp();

Page({
    data: {},
    phone: function(t) {
        var e = this.data.store.tel;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    dizhi: function(t) {
        var e = this, a = Number(e.data.store.coordinates.split(",")[0]), o = Number(e.data.store.coordinates.split(",")[1]);
        wx.openLocation({
            latitude: a,
            longitude: o,
            name: e.data.store.store_name,
            address: e.data.store.address
        });
    },
    qrmd: function(t) {
        var a = Number(this.data.yhq.money), e = wx.getStorageSync("users").id, o = this.data.store.id, n = wx.getStorageSync("openid"), s = t.detail.formId, i = this.data.yhq.id;
        console.log(a, e, o, n, s, i), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: e,
                form_id: s,
                openid: n
            },
            success: function(t) {}
        }), this.setData({
            mflqdisabled: !0
        }), app.util.request({
            url: "entry/wxapp/LqCoupon",
            cachetime: "0",
            data: {
                user_id: e,
                coupons_id: i,
                lq_money: a
            },
            success: function(t) {
                console.log(t);
                var e = t.data;
                "下单失败" != t.data ? 0 == a ? (wx.showModal({
                    title: "提示",
                    content: "领取成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../wdq/wdq"
                    });
                }, 1e3)) : app.util.request({
                    url: "entry/wxapp/pay5",
                    cachetime: "0",
                    data: {
                        openid: n,
                        money: a,
                        order_id: e
                    },
                    success: function(t) {
                        console.log(t), wx.requestPayment({
                            timeStamp: t.data.timeStamp,
                            nonceStr: t.data.nonceStr,
                            package: t.data.package,
                            signType: t.data.signType,
                            paySign: t.data.paySign,
                            success: function(t) {
                                console.log(t);
                            },
                            complete: function(t) {
                                console.log(t), "requestPayment:fail cancel" == t.errMsg && wx.showToast({
                                    title: "取消支付"
                                }), "requestPayment:ok" == t.errMsg && (wx.showModal({
                                    title: "提示",
                                    content: "领取成功"
                                }), setTimeout(function() {
                                    wx.redirectTo({
                                        url: "../wdq/wdq"
                                    });
                                }, 1e3));
                            }
                        });
                    }
                }) : wx.showToast({
                    title: "请重试"
                });
            }
        });
    },
    onLoad: function(t) {
        console.log(t);
        var e = this, a = wx.getStorageSync("users").id;
        console.log(a), e.setData({
            coupon_img: wx.getStorageSync("System").coupon_img
        }), app.util.request({
            url: "entry/wxapp/CouponInfo",
            cachetime: "0",
            data: {
                coupon_id: t.yhqid,
                user_id: a
            },
            success: function(t) {
                console.log(t.data), t.data.lqrs = Number(t.data.number) - Number(t.data.surplus), 
                wx.setNavigationBarTitle({
                    title: t.data.name
                }), e.setData({
                    yhq: t.data,
                    url: wx.getStorageSync("url")
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: t.sjid
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    store: t.data.store[0]
                });
            }
        }), null != t.qid && (app.util.request({
            url: "entry/wxapp/CouponCode",
            cachetime: "0",
            data: {
                id: t.qid
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    hxm: t.data
                });
            }
        }), dsq = setInterval(function() {
            app.util.request({
                url: "entry/wxapp/MyCouponsInfo",
                cachetime: "0",
                data: {
                    id: t.qid
                },
                success: function(t) {
                    console.log(t.data), 1 == t.data.state && (wx.showToast({
                        title: "核销成功",
                        duration: 1e3
                    }), setTimeout(function() {
                        wx.reLaunch({
                            url: "../index/index"
                        });
                    }, 1e3));
                }
            });
        }, 5e3));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        clearInterval(dsq);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});