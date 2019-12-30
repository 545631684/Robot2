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
        var e = this;
        wx.getStorageSync("city");
        console.log(wx.getStorageSync("users"), wx.getStorageSync("openid"));
        var a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
                    url: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/FxSet",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), e.setData({
                    img: t.data.img2,
                    fx_details: t.data.fx_details,
                    fxset: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MySx",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t.data), t.data ? e.setData({
                    yqr: t.data.name
                }) : e.setData({
                    yqr: "总店"
                });
            }
        }), app.util.request({
            url: "entry/wxapp/FxLevel",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
                    accounts: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
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
        var e = this, a = t.detail.value.name, n = t.detail.value.tel, o = t.detail.value.checkbox.length, c = wx.getStorageSync("city"), s = wx.getStorageSync("users").id, i = wx.getStorageSync("openid"), u = t.detail.formId, l = e.data.accountIndex, r = Number(e.data.accounts[l].money), d = e.data.accounts[l].id;
        console.log(s, i, u, l, r, d, a, n, c);
        var g = "", p = !0;
        "" == a ? g = "请填写姓名！" : "" == n ? g = "请填写联系电话！" : 11 != n.length ? g = "手机号错误！" : 0 == o ? g = "阅读并同意《合伙人须知》" : (p = !1, 
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/Distribution",
            cachetime: "0",
            data: {
                user_id: s,
                user_name: a,
                user_tel: n,
                level: d,
                money: r,
                cityname: c
            },
            success: function(t) {
                console.log(t), "下单失败" != t.data ? 0 < r ? app.util.request({
                    url: "entry/wxapp/Pay2",
                    cachetime: "0",
                    data: {
                        openid: i,
                        money: r,
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
                                    title: "提交成功"
                                }), setTimeout(function() {
                                    wx.navigateBack({});
                                }, 1e3));
                            }
                        });
                    }
                }) : (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 1e3)) : (wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                }), wx.hideLoading());
            }
        })), 1 == p && wx.showModal({
            title: "提示",
            content: g
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