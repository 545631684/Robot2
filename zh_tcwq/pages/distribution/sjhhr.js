var app = getApp();

Page({
    data: {
        accountIndex: 0,
        fwxy: !0
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    bindAccountChange: function(t) {
        console.log("picker account 发生选择改变，携带值为", t.detail.value), this.setData({
            accountIndex: t.detail.value
        });
    },
    onLoad: function(t) {
        wx.getStorageSync("color") && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var o = this;
        wx.getStorageSync("city");
        console.log(wx.getStorageSync("users"), wx.getStorageSync("openid"));
        var e = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                console.log(t), o.setData({
                    url: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/FxSet",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), o.setData({
                    img: t.data.img2,
                    fx_details: t.data.fx_details,
                    fxset: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/FxLevel",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var a = t.data;
                o.setData({
                    accounts: t.data
                }), app.util.request({
                    url: "entry/wxapp/MyDistribution",
                    cachetime: "0",
                    data: {
                        user_id: e
                    },
                    success: function(t) {
                        console.log(t.data);
                        for (var e = 0; e < a.length; e++) a[e].id == t.data.level && (o.setData({
                            dqdjindex: e
                        }), console.log(e));
                        o.setData({
                            wdsq: t.data
                        });
                    }
                });
            }
        }), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), o.setData({
                    system: t.data,
                    pt_name: t.data.pt_name
                });
            }
        });
    },
    tzweb: function(t) {
        console.log(t.currentTarget.dataset.index, this.data.lblist);
        var e = this.data.lblist[t.currentTarget.dataset.index], a = t.currentTarget.dataset.sjtype;
        console.log(e), "1" == e.state && wx.redirectTo({
            url: e.src
        }), "2" == e.state && wx.navigateTo({
            url: "../car/car?vr=" + e.id + "&sjtype=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }), "3" == e.state && wx.navigateToMiniProgram({
            appId: e.appid,
            success: function(t) {
                console.log(t);
            }
        });
    },
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail);
        var e = this, a = wx.getStorageSync("city"), o = this.data.wdsq.level, n = wx.getStorageSync("users").id, c = wx.getStorageSync("openid"), s = t.detail.formId, i = e.data.accountIndex, u = e.data.dqdjindex;
        app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: n,
                form_id: s,
                openid: c
            },
            success: function(t) {}
        });
        var l = Number(e.data.accounts[i].money), r = Number(e.data.accounts[u].money), d = e.data.accounts[i].id, g = parseFloat((l - r).toFixed(2));
        console.log(n, c, s, i, u, l, r, g, d, a, o);
        var p = "", f = !0;
        Number(i) <= u ? p = "请选择高于你当前的等级进行升级！" : g < 0 ? p = "升级错误，请联系平台管理员设置正确等级金额！" : (f = !1, 
        wx.showModal({
            title: "提示",
            content: "升级需补差价" + g + "元进行升级",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), wx.showLoading({
                    title: "加载中...",
                    mask: !0
                }), app.util.request({
                    url: "entry/wxapp/SjFx",
                    cachetime: "0",
                    data: {
                        user_id: n,
                        level: d,
                        money: g
                    },
                    success: function(t) {
                        console.log(t), "下单失败" != t.data ? 0 < g ? app.util.request({
                            url: "entry/wxapp/Pay6",
                            cachetime: "0",
                            data: {
                                openid: c,
                                money: g,
                                order_id: t.data
                            },
                            success: function(t) {
                                console.log(t), wx.requestPayment({
                                    timeStamp: t.data.timeStamp,
                                    nonceStr: t.data.nonceStr,
                                    package: t.data.package,
                                    signType: t.data.signType,
                                    paySign: t.data.paySign,
                                    success: function(t) {
                                        console.log("这里是支付成功");
                                    },
                                    complete: function(t) {
                                        console.log(t), "requestPayment:fail cancel" == t.errMsg && wx.showToast({
                                            title: "取消支付",
                                            icon: "loading",
                                            duration: 1e3
                                        }), "requestPayment:ok" == t.errMsg && (wx.showToast({
                                            title: "升级成功"
                                        }), setTimeout(function() {
                                            wx.reLaunch({
                                                url: "../logs/logs"
                                            });
                                        }, 1e3));
                                    }
                                });
                            }
                        }) : (wx.showToast({
                            title: "升级成功"
                        }), setTimeout(function() {
                            wx.reLaunch({
                                url: "../logs/logs"
                            });
                        }, 1e3)) : (wx.showToast({
                            title: "请重试！",
                            icon: "loading"
                        }), wx.hideLoading());
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        })), 1 == f && wx.showModal({
            title: "提示",
            content: p
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "30",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t), 1 == t.data.state || wx.showModal({
                    title: "提示",
                    content: "您的账号异常，请尽快联系管理员",
                    success: function(t) {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});