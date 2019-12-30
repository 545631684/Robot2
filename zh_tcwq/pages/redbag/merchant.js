var app = getApp();

Page({
    data: {
        iszd: !1,
        countryIndex: 0,
        countries: [ "本地", "全国" ]
    },
    cartaddformSubmit: function(e) {
        console.log("formid", e.detail.formId);
        var t = this, n = t.data.seller.user_id;
        app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: n,
                form_id: e.detail.formId
            },
            success: function(e) {
                console.log(e.data), t.reLoad();
            }
        });
    },
    reLoad: function() {
        var t = this, e = t.data.seller.user_id;
        app.util.request({
            url: "entry/wxapp/MyFormId",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(e) {
                console.log(e.data), t.setData({
                    sycs: e.data
                });
            }
        });
    },
    bindCountryChange: function(e) {
        var t = this.data.stick;
        console.log("picker country 发生选择改变，携带值为", e.detail.value, t);
        this.setData({
            countryIndex: e.detail.value
        });
    },
    qxzd: function() {
        this.setData({
            iszd: !1
        });
    },
    dkxf: function(e) {
        this.setData({
            iszd: !0
        });
    },
    fbyhq: function() {
        wx.navigateTo({
            url: "../wdq/fbyhq?store_id=" + this.data.seller.id
        });
    },
    glyhq: function() {
        wx.navigateTo({
            url: "../wdq/glyhq/glyhq?store_id=" + this.data.seller.id
        });
    },
    hxdd: function() {
        wx.setStorageSync("hxsjid", this.data.seller.id), wx.scanCode({
            success: function(e) {
                console.log(e);
                var t = "../" + e.path.substring(14);
                wx.navigateTo({
                    url: t
                });
            },
            fail: function(e) {
                console.log("扫码fail"), wx.removeStorageSync("hxsjid");
            }
        });
    },
    hxyhq: function() {
        wx.setStorageSync("hxsjid", this.data.seller.id), wx.scanCode({
            success: function(e) {
                console.log(e);
                var t = "/" + e.path;
                wx.navigateTo({
                    url: t
                });
            },
            fail: function(e) {
                console.log("扫码fail"), wx.removeStorageSync("hxsjid");
            }
        });
    },
    fqgsp: function() {
        wx.navigateTo({
            url: "../xsqg/fqgsp?store_id=" + this.data.seller.id
        });
    },
    wqgsp: function() {
        wx.navigateTo({
            url: "../xsqg/wqpsp?store_id=" + this.data.seller.id
        });
    },
    wqgdd: function() {
        wx.navigateTo({
            url: "../xsqg/qgdd"
        });
    },
    hxqgdd: function() {
        var n = this.data.seller.id;
        wx.scanCode({
            success: function(e) {
                console.log(e);
                var t = "/" + e.path;
                wx.navigateTo({
                    url: t + "&storeid=" + n
                });
            },
            fail: function(e) {
                console.log("扫码fail");
            }
        });
    },
    fptsp: function() {
        wx.navigateTo({
            url: "../collage/fptsp?store_id=" + this.data.seller.id
        });
    },
    wptsp: function() {
        wx.navigateTo({
            url: "../collage/wptsp?store_id=" + this.data.seller.id
        });
    },
    ptdd: function() {
        wx.navigateTo({
            url: "../collage/ptdd"
        });
    },
    ptgl: function() {
        wx.navigateTo({
            url: "../collage/ptgl"
        });
    },
    selected: function(e) {
        var t = this, n = this.data.countryIndex, a = e.currentTarget.id, o = wx.getStorageSync("openid"), i = wx.getStorageSync("users").id, s = t.data.stick, c = 0 == n ? s[a].money : s[a].money2, l = s[a].type, r = this.data.seller.id, u = 0 == t.data.countryIndex ? "本地" : "全国版", d = wx.getStorageSync("city");
        console.log("city", u, d), t.setData({
            iszd: !1
        }), console.log(c, l, r), Number(c) <= 0 ? app.util.request({
            url: "entry/wxapp/SjXf",
            cachetime: "0",
            data: {
                id: r,
                type: l,
                cityname: u,
                cityname2: d
            },
            success: function(e) {
                console.log(e), "1" == e.data && (wx.showToast({
                    title: "续费成功"
                }), setTimeout(function() {
                    t.refresh1();
                }, 1e3));
            }
        }) : app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: o,
                money: c
            },
            success: function(e) {
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.showModal({
                            title: "提示",
                            content: "支付成功",
                            showCancel: !1
                        });
                    },
                    complete: function(e) {
                        console.log(e), "requestPayment:fail cancel" == e.errMsg && wx.showToast({
                            title: "取消支付",
                            icon: "loading",
                            duration: 1e3
                        }), "requestPayment:ok" == e.errMsg && (app.util.request({
                            url: "entry/wxapp/SjXf",
                            cachetime: "0",
                            data: {
                                id: r,
                                type: l,
                                cityname: u,
                                cityname2: d
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), app.util.request({
                            url: "entry/wxapp/SaveStorePayLog",
                            cachetime: "0",
                            data: {
                                store_id: r,
                                money: c,
                                note: "入驻续费"
                            },
                            success: function(e) {
                                console.log("这是续费成功"), console.log(e);
                            }
                        }), app.util.request({
                            url: "entry/wxapp/fx",
                            cachetime: "0",
                            data: {
                                user_id: i,
                                money: c
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), setTimeout(function() {
                            t.refresh1();
                        }, 1e3));
                    }
                });
            }
        });
    },
    onLoad: function(e) {
        var a = this, t = wx.getStorageSync("users").id;
        if (console.log(e, t), wx.hideShareMenu(), app.setNavigationBarColor(this), null == wx.getStorageSync("users").money) ;
        var n = wx.getStorageSync("url");
        a.setData({
            url: n
        });
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: e.id
            },
            success: function(e) {
                console.log(e), wx.setStorageSync("sjdsjid", e.data.store[0].id), t == e.data.store[0].user_id && a.setData({
                    isgly: !0
                }), a.setData({
                    seller: e.data.store[0]
                }), a.refresh(), a.reLoad();
            }
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), a.setData({
                    System: e.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/InMoney",
            cachetime: "0",
            success: function(e) {
                console.log(e);
                var t = e.data;
                for (var n in t) t[n].money1 = "（收费", 1 == t[n].type ? (t[n].array = "一周" + t[n].money1, 
                t[n].hidden1 = !1) : 2 == t[n].type ? (t[n].array = "半年" + t[n].money1, t[n].hidden1 = !0) : 3 == t[n].type && (t[n].array = "一年" + t[n].money1, 
                t[n].hidden1 = !0);
                console.log(t), a.setData({
                    stick: t
                });
            }
        });
    },
    refresh1: function() {
        var t = this, e = t.data.seller.id;
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: e
            },
            success: function(e) {
                console.log(e), t.setData({
                    seller: e.data.store[0]
                }), t.refresh();
            }
        });
    },
    refresh: function(e) {
        var o = this;
        console.log(o.data.seller), this.setData({
            dqdate: app.ormatDate(o.data.seller.dq_time).substring(0, 10)
        });
        var t, n, a, i = (t = new Date(), n = t.getMonth() + 1, a = t.getDate(), 1 <= n && n <= 9 && (n = "0" + n), 
        0 <= a && a <= 9 && (a = "0" + a), t.getFullYear() + "/" + n + "/" + a + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()).slice(0, 10);
        console.log(i);
        var s = o.data.seller.id;
        app.util.request({
            url: "entry/wxapp/Profit",
            cachetime: "0",
            data: {
                store_id: s
            },
            success: function(e) {
                console.log(e), o.setData({
                    myye: e.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: s
            },
            success: function(e) {
                console.log(e);
                var t = e.data, n = [];
                for (var a in t) t[a].time = app.ormatDate(t[a].time).slice(0, 10), t[a].time = t[a].time.replace(/-/g, "/"), 
                i == t[a].time && n.push(t[a]);
                o.setData({
                    order_num: n.length
                });
            }
        });
    },
    onReady: function() {},
    yemx: function(e) {
        wx.navigateTo({
            url: "wallet/wallet?store_id=" + this.data.seller.id
        });
    },
    more: function(e) {
        console.log(e);
        var t = this.data.seller.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + t,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    cash: function(e) {
        wx.navigateTo({
            url: "../logs/cash?&state=2&store_id=" + this.data.seller.id + "&profit=" + this.data.seller.wallet,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_one: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=1&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_two: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=0&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_three: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=3&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_four: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=4&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    fuck: function(e) {
        wx.navigateTo({
            url: "../logs/publish?store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    customer: function(e) {
        wx.navigateTo({
            url: "customer/customer?user_id=" + this.data.seller.id
        });
    },
    welfare: function(e) {
        wx.navigateTo({
            url: "welfare?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    sent: function(e) {
        wx.navigateTo({
            url: "sent?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    mechat: function(e) {
        wx.navigateTo({
            url: "../logs/index?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    mine_shop: function(e) {
        wx.navigateTo({
            url: "commodity?store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    interests: function(e) {
        wx.showModal({
            title: "提示",
            content: "此功能暂未开放",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    vip: function(e) {
        wx.showModal({
            title: "提示",
            content: "此功能暂未开放",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    tuichu: function(e) {
        wx.removeStorage({
            key: "store_info",
            success: function(e) {
                wx.showToast({
                    title: "退出登陆"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 2e3);
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});