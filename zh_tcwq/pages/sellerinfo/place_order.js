var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        dnzt: !1,
        hydl: !1
    },
    bindDateChange: function(e) {
        console.log("date 发生 change 事件，携带值为", e.detail.value, this.data.datestart), this.setData({
            date: e.detail.value
        }), e.detail.value == this.data.datestart ? console.log("日期没有修改") : console.log("修改了日期");
    },
    switch1Change: function(e) {
        var t = this, a = Number(this.data.cost3), o = this.data.freight2;
        console.log("switch1 发生 change 事件，携带值为", e.detail.value, a, o), t.setData({
            dnzt: e.detail.value
        }), e.detail.value ? t.setData({
            cost2: a - o,
            freight: 0
        }) : t.setData({
            cost2: a,
            freight: o
        });
    },
    onLoad: function(e) {
        var t = this, a = util.formatTime(new Date()), o = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-"), s = util.formatTime(new Date()).substring(11, 16);
        console.log(a, o.toString(), s.toString()), this.setData({
            datestart: o,
            timestart: s,
            date: o,
            time: s
        });
        var n = wx.getStorageSync("url"), i = e.price * e.num;
        t.setData({
            id: e.id,
            url: n,
            price: e.price,
            num: e.num,
            cost: i.toFixed(2),
            name1: e.name1,
            name2: e.name2,
            name3: e.name3,
            store_id: e.store_id
        }), console.log(e + "这是商家的id"), t.getuserinfo(), t.refresh();
    },
    refresh: function(e) {
        var l = this, t = l.data.id;
        app.util.request({
            url: "entry/wxapp/GoodInfo",
            cachetime: "0",
            data: {
                id: t
            },
            success: function(e) {
                console.log(e);
                var t = e.data.spec, a = {}, o = [];
                t.forEach(function(e) {
                    var t = e.spec_id + "_" + e.spec_name;
                    void 0 === a[t] && (a[t] = []), a[t].push(e);
                });
                for (var s = Object.keys(a), n = 0; n < s.length; n++) {
                    var i = s[n].split("_");
                    o.push({
                        spec_id: i[0],
                        spec_name: i[1],
                        value: a[s[n]]
                    });
                }
                console.log(o), e.data.good.imgs = e.data.good.imgs.split(","), e.data.good.lb_imgs = e.data.good.lb_imgs.split(",");
                var c = Number(l.data.cost), r = Number(e.data.good.freight), d = Number(e.data.good.freight), u = c + r;
                u = u.toFixed(2), l.setData({
                    store_good: e.data.good,
                    cost2: u,
                    freight: r,
                    freight2: d,
                    result: o,
                    cost3: u
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: l.data.store_id
            },
            success: function(e) {
                console.log(e), l.setData({
                    store: e.data.store[0]
                });
            }
        });
    },
    updateUserInfo: function(e) {
        console.log(e), "getUserInfo:ok" == e.detail.errMsg && (this.setData({
            hydl: !1
        }), this.getuserinfo());
    },
    getuserinfo: function() {
        var i = this;
        wx.login({
            success: function(e) {
                var t = e.code;
                wx.setStorageSync("code", t), console.log(e), wx.getSetting({
                    success: function(e) {
                        console.log(e), e.authSetting["scope.userInfo"] ? wx.getUserInfo({
                            success: function(e) {
                                wx.setStorageSync("user_info", e.userInfo);
                                var s = e.userInfo.nickName, n = e.userInfo.avatarUrl;
                                i.setData({
                                    user_name: s
                                }), console.log("用户名字"), console.log(e.userInfo.nickName), console.log("用户头像"), 
                                console.log(e.userInfo.avatarUrl), app.util.request({
                                    url: "entry/wxapp/openid",
                                    cachetime: "0",
                                    data: {
                                        code: t
                                    },
                                    success: function(e) {
                                        wx.setStorageSync("key", e.data.session_key);
                                        var t = n, a = s;
                                        wx.setStorageSync("openid", e.data.openid);
                                        var o = e.data.openid;
                                        console.log("这是用户的openid"), console.log(o), app.util.request({
                                            url: "entry/wxapp/Login",
                                            cachetime: "0",
                                            data: {
                                                openid: o,
                                                img: t,
                                                name: a
                                            },
                                            success: function(e) {
                                                console.log("这是用户的登录信息"), console.log(e), wx.setStorageSync("users", e.data), wx.setStorageSync("uniacid", e.data.uniacid), 
                                                i.user_infos();
                                            }
                                        });
                                    }
                                });
                            }
                        }) : (console.log("未授权过"), i.setData({
                            hydl: !0
                        }));
                    }
                });
            }
        });
    },
    user_infos: function(e) {
        var t = this, a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(e) {
                console.log(e), t.setData({
                    user_info: e.data,
                    openid: e.data.openid
                });
            }
        });
    },
    address: function(e) {
        var t = this, a = t.data.user_info.id;
        console.log(a), wx.chooseAddress({
            success: function(e) {
                console.log(e), app.util.request({
                    url: "entry/wxapp/UpdAdd",
                    cachetime: "0",
                    data: {
                        user_id: a,
                        user_name: e.userName,
                        user_tel: e.telNumber,
                        user_address: e.provinceName + e.cityName + e.countyName + e.detailInfo
                    },
                    success: function(e) {
                        console.log(e), t.user_infos();
                    }
                });
            }
        });
    },
    add: function(e) {
        var t = this.data.num + 1, a = this.data.cost1, o = (a *= t.toFixed(2)) + this.data.freight;
        this.setData({
            num: t,
            cost: a,
            cost2: o
        });
    },
    subtraction: function(e) {
        var t = this.data.num;
        t -= 1;
        var a = this.data.cost1, o = (a *= t.toFixed(2)) + this.data.freight;
        this.setData({
            num: t,
            cost: a,
            cost2: o
        });
    },
    note: function(e) {
        console.log(e), this.setData({
            note: e.detail.value
        });
    },
    order: function(e) {
        var t = this;
        console.log(t.data);
        var a = t.data.store_good, o = t.data.user_info.id;
        app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: o,
                form_id: e.detail.formId
            },
            success: function(e) {
                console.log(e.data);
            }
        });
        var s, n = t.data.user_info, i = t.data.openid, c = this.data.freight, r = (Number(a.goods_cost), 
        t.data.cost2), d = t.data.note, u = t.data.result, l = this.data.date;
        if (s = this.data.dnzt ? 1 : 2, console.log("iszt", s, l), 1 == u.length) var g = u[0].spec_name + ":" + t.data.name1;
        if (2 == u.length) g = u[0].spec_name + ":" + t.data.name1 + ";" + u[1].spec_name + ":" + t.data.name2;
        if (3 == u.length) g = u[0].spec_name + ":" + t.data.name1 + ";" + u[1].spec_name + ":" + t.data.name2 + ";" + u[2].spec_name + ":" + t.data.name3;
        console.log(u), console.log(String(g)), d = null == d ? "" : t.data.note, "" != n.user_name || this.data.dnzt ? (console.log(d), 
        app.util.request({
            url: "entry/wxapp/addorder",
            cachetime: "0",
            data: {
                user_id: o,
                store_id: a.store_id,
                money: r,
                user_name: n.user_name,
                address: n.user_address,
                tel: n.user_tel,
                good_id: a.id,
                good_name: a.goods_name,
                good_img: a.imgs[0],
                good_money: t.data.price,
                good_spec: String(g),
                freight: c,
                good_num: t.data.num,
                note: d,
                is_zt: s,
                zt_time: l
            },
            success: function(e) {
                console.log(e);
                var t = e.data;
                console.log(r), app.util.request({
                    url: "entry/wxapp/Pay",
                    cachetime: "0",
                    data: {
                        openid: i,
                        money: r,
                        order_id: t
                    },
                    success: function(e) {
                        console.log(e), wx.requestPayment({
                            timeStamp: e.data.timeStamp,
                            nonceStr: e.data.nonceStr,
                            package: e.data.package,
                            signType: e.data.signType,
                            paySign: e.data.paySign,
                            success: function(e) {
                                console.log("这里是支付成功"), console.log(e), app.util.request({
                                    url: "entry/wxapp/PayOrder",
                                    cachetime: "0",
                                    data: {
                                        order_id: t
                                    },
                                    success: function(e) {
                                        console.log("改变订单状态"), console.log(e), wx.redirectTo({
                                            url: "../logs/order",
                                            success: function(e) {},
                                            fail: function(e) {},
                                            complete: function(e) {}
                                        });
                                    }
                                }), app.util.request({
                                    url: "entry/wxapp/sms2",
                                    cachetime: "0",
                                    data: {
                                        store_id: a.store_id
                                    },
                                    success: function(e) {
                                        console.log(e);
                                    }
                                });
                            },
                            fail: function(e) {
                                console.log("这里是支付失败"), console.log(e), wx.showToast({
                                    title: "支付失败",
                                    duration: 1e3
                                }), wx.redirectTo({
                                    url: "../logs/order",
                                    success: function(e) {},
                                    fail: function(e) {},
                                    complete: function(e) {}
                                });
                            }
                        });
                    }
                });
            }
        })) : wx.showModal({
            title: "提示",
            content: "您还没有填写收货地址喔",
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
    onReady: function() {},
    onShow: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), t.setData({
                    system: e.data
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: e.data.color,
                    animation: {
                        duration: 0,
                        timingFunc: "easeIn"
                    }
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});