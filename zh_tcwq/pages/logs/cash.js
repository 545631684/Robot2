var app = getApp();

Page({
    data: {
        hidden: !1,
        hidden2: !0,
        hidden3: !0,
        hidden4: !1,
        hidden5: !0,
        hidden6: !1,
        button: !1,
        cash_wei: !1,
        cash_wei2: !1,
        tx_money: 0,
        sxf: 0,
        sh_money: 0,
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
    onLoad: function(e) {
        wx.hideShareMenu({});
        var t = this;
        console.log(e), t.setData({
            state: e.state,
            system: wx.getStorageSync("System")
        }), 2 == e.state && t.setData({
            store_id: e.store_id,
            profit: e.profit
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), t.reload();
    },
    reload: function(e) {
        var i = this, t = wx.getStorageSync("users").id;
        if (1 == i.data.state) app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(e) {
                console.log(e);
                var o = e.data;
                app.util.request({
                    url: "entry/wxapp/MyTiXian",
                    cachetime: "0",
                    data: {
                        user_id: e.data.id
                    },
                    success: function(e) {
                        console.log(e);
                        var t = 0;
                        for (var a in e.data) t += Number(e.data[a].tx_cost);
                        console.log(t);
                        var n = Number(o.money);
                        n = n.toFixed(2), console.log(n), i.setData({
                            money: n
                        });
                    }
                });
            }
        }); else {
            i.data.store_id;
            i.setData({
                money: i.data.profit
            });
        }
        console.log(wx.getStorageSync("System"));
        var a = wx.getStorageSync("System"), n = a.tx_sxf / 100, o = a.tx_sxf, s = a.tx_money;
        i.setData({
            tx_price: s,
            tx_sxf: n,
            tx_sxf1: o,
            user_id: t
        });
        wx.getStorageSync("img"), wx.getStorageSync("url"), wx.getStorageSync("name"), wx.getStorageSync("openid");
    },
    check: function(e) {
        this.setData({
            hidden: !1,
            hidden2: !0,
            hidden3: !0,
            hidden4: !1,
            hidden5: !0,
            hidden6: !1,
            cash_wei: !1,
            cash_wei2: !1,
            cash_zhi: !0,
            cash_zhi2: !0,
            cash_ka: !0,
            cash_ka2: !0
        });
    },
    check2: function(e) {
        this.setData({
            hidden: !0,
            hidden2: !1,
            hidden3: !1,
            hidden4: !0,
            hidden5: !0,
            hidden6: !1,
            cash_wei: !0,
            cash_wei2: !0,
            cash_ka: !0,
            cash_ka2: !0,
            cash_zhi2: !1,
            cash_zhi: !1
        });
    },
    check3: function(e) {
        this.setData({
            hidden: !0,
            hidden2: !1,
            hidden3: !0,
            hidden4: !1,
            hidden5: !1,
            hidden6: !0,
            cash_wei: !0,
            cash_wei2: !0,
            cash_zhi: !0,
            cash_zhi2: !0,
            cash_ka: !1,
            cash_ka2: !1
        });
    },
    bindblur: function(e) {
        var t = this, a = Number(e.detail.value), n = Number(t.data.money);
        if (console.log(a, n), n < a) return wx.showModal({
            title: "提示",
            content: "您的提现金额超出可提现金额"
        }), t.setData({
            button: !1
        }), void (a = n);
        var o = t.data.tx_sxf, i = a - a * o;
        t.setData({
            tx_money: a,
            sxf: Number(a * o).toFixed(2),
            sh_money: Number(i).toFixed(2)
        }), 0 < a ? t.setData({
            button: !0
        }) : t.setData({
            button: !1
        });
    },
    formSubmit: function(e) {
        var t = this;
        console.log(e), console.log(t.data);
        var a = e.detail.formId, n = t.data.store_id, o = t.data.state, i = t.data.user_id, s = Number(t.data.tx_price), c = t.data.sh_money, u = (t.data.sxf, 
        t.data.tx_money);
        console.log(u, s);
        var l = wx.getStorageSync("openid");
        if (u < s) wx.showModal({
            title: "提示",
            content: "不到提现门槛，再接再厉哦",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }); else {
            if (1 == t.data.hidden2) {
                var d = 2;
                console.log("提现的方式为微信" + d);
            } else if (1 == t.data.hidden4) {
                d = 1;
                console.log("提现的方式为支付宝" + d);
            } else if (1 == t.data.hidden6) {
                d = 3;
                console.log("提现的方式为银联" + d);
            }
            if (1 == d) {
                var r = e.detail.value.zfname, f = e.detail.value.zfkahao, h = e.detail.value.zfka;
                "" == r || null == r ? wx.showToast({
                    title: "姓名不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : "" == f || "" == h ? wx.showToast({
                    title: "账号不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : h != f ? wx.showToast({
                    title: "输入不一致",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : h == f && (t.setData({
                    button: !1
                }), app.util.request({
                    url: "entry/wxapp/TiXian",
                    cachetime: "0",
                    method: "POST",
                    data: {
                        user_id: i,
                        type: d,
                        tx_cost: u,
                        sj_cost: c,
                        name: r,
                        username: h,
                        method: o,
                        store_id: n
                    },
                    success: function(e) {
                        console.log(e), wx.showToast({
                            title: "提现成功",
                            icon: "",
                            image: "",
                            duration: 2e3,
                            mask: !0,
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        }), app.util.request({
                            url: "entry/wxapp/txmessage",
                            cachetime: "0",
                            data: {
                                form_id: a,
                                openid: l,
                                txsh_id: e.data
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        });
                        var t = getCurrentPages();
                        (console.log(t), 1 < t.length) && t[t.length - 2].refresh1();
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1e3);
                    }
                }));
            } else if (2 == d) {
                var m = e.detail.value.wxname, g = e.detail.value.wxkahao, x = e.detail.value.wxka;
                "" == m || null == m ? wx.showToast({
                    title: "姓名不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : "" == g || "" == x ? wx.showToast({
                    title: "账号不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : x != g ? wx.showToast({
                    title: "输入不一致",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : g == x && (t.setData({
                    button: !1
                }), app.util.request({
                    url: "entry/wxapp/TiXian",
                    cachetime: "0",
                    method: "POST",
                    data: {
                        user_id: i,
                        type: d,
                        tx_cost: u,
                        sj_cost: c,
                        name: m,
                        username: x,
                        method: o,
                        store_id: n
                    },
                    success: function(e) {
                        console.log(e), wx.showToast({
                            title: "提现成功",
                            icon: "",
                            image: "",
                            duration: 2e3,
                            mask: !0,
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        }), app.util.request({
                            url: "entry/wxapp/txmessage",
                            cachetime: "0",
                            data: {
                                form_id: a,
                                openid: l,
                                txsh_id: e.data
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        });
                        var t = getCurrentPages();
                        (console.log(t), 1 < t.length) && t[t.length - 2].refresh1();
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1e3);
                    }
                }));
            } else if (3 == d) {
                var w = e.detail.value.ylname, p = e.detail.value.ylka, _ = e.detail.value.ylkahao, y = e.detail.value.ylyhmc;
                "" == w || null == w ? wx.showToast({
                    title: "姓名不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : "" == p || "" == _ ? wx.showToast({
                    title: "账号不能为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : p != _ ? wx.showToast({
                    title: "输入不一致",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : "" == y ? wx.showToast({
                    title: "银行名称为空",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(e) {},
                    fail: function(e) {},
                    complete: function(e) {}
                }) : (t.setData({
                    button: !1
                }), app.util.request({
                    url: "entry/wxapp/TiXian",
                    cachetime: "0",
                    method: "POST",
                    data: {
                        user_id: i,
                        type: d,
                        tx_cost: u,
                        sj_cost: c,
                        name: w,
                        username: p,
                        method: o,
                        store_id: n,
                        bank: y
                    },
                    success: function(e) {
                        console.log(e), wx.showToast({
                            title: "提现成功",
                            icon: "",
                            image: "",
                            duration: 2e3,
                            mask: !0,
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        }), app.util.request({
                            url: "entry/wxapp/txmessage",
                            cachetime: "0",
                            data: {
                                form_id: a,
                                openid: l,
                                txsh_id: e.data
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        });
                        var t = getCurrentPages();
                        (console.log(t), 1 < t.length) && t[t.length - 2].refresh1();
                        setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 1e3);
                    }
                }));
            }
        }
    },
    onReady: function() {},
    onShow: function() {
        console.log(this.data);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});