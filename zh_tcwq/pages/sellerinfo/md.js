var qqmapsdk, app = getApp(), QQMapWX = require("../../../utils/qqmap-wx-jssdk.js"), util = require("../../utils/util.js");

Page({
    data: {
        listarr: [ "代金券", "折扣券" ],
        activeIndex: 0,
        focus: !0,
        disabled: !0,
        qlq: !0,
        djq: [],
        zkq: [],
        discounttext: "0",
        checkboxChange: [],
        radioChange: "",
        isyhq: !1,
        yhqnum: 0,
        kdje: 0,
        yhqname: "",
        total: 0,
        showModal: !1,
        zffs: 1,
        zfz: !1,
        zfwz: "微信支付",
        btntype: "btn_ok1",
        marqueePace: 1,
        marqueeDistance: 0,
        size: 14,
        interval: 20
    },
    scrolltxt: function() {
        var e = this, o = e.data.length, s = e.data.windowWidth, n = setInterval(function() {
            var t = o + s, a = e.data.marqueeDistance;
            a < t ? e.setData({
                marqueeDistance: a + e.data.marqueePace
            }) : (e.setData({
                marqueeDistance: 0
            }), clearInterval(n), e.scrolltxt());
        }, e.data.interval);
    },
    qrmd: function(t) {
        var e = Number(this.data.total), a = wx.getStorageSync("users").id, o = this.data.mdinfo.id, s = wx.getStorageSync("openid"), n = t.detail.formId;
        if (console.log(e, a, o, s, n), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: a,
                form_id: n,
                openid: s
            },
            success: function(t) {}
        }), 0 == e) return wx.showModal({
            title: "提示",
            content: "消费金额不能为0哦~"
        }), !1;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/AddDmOrder",
            cachetime: "0",
            data: {
                user_id: a,
                money: e,
                store_id: o
            },
            success: function(t) {
                console.log(t);
                var a = t.data;
                app.util.request({
                    url: "entry/wxapp/pay4",
                    cachetime: "0",
                    data: {
                        openid: s,
                        money: e,
                        order_id: a
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
                                    content: "支付成功",
                                    showCancel: !1
                                }), setTimeout(function() {
                                    wx.navigateBack({});
                                }, 1e3));
                            }
                        });
                    }
                });
            }
        });
    },
    radioChange1: function(t) {
        console.log("radio1发生change事件，携带value值为：", t.detail.value), "wxzf" == t.detail.value && this.setData({
            zffs: 1,
            zfwz: "微信支付",
            btntype: "btn_ok1"
        }), "yezf" == t.detail.value && this.setData({
            zffs: 2,
            zfwz: "余额支付",
            btntype: "btn_ok2"
        }), "jfzf" == t.detail.value && this.setData({
            zffs: 3,
            zfwz: "积分支付",
            btntype: "btn_ok3"
        });
    },
    yczz: function() {
        this.setData({
            showModal: !1
        });
    },
    qlq: function() {
        console.log(this.data), 0 != this.data.xfje ? this.setData({
            qlq: !1
        }) : wx.showToast({
            title: "请输入消费金额",
            icon: "loading",
            duration: 1e3
        });
    },
    qdzz: function() {
        this.setData({
            qlq: !0
        });
    },
    hqjd: function(t) {
        this.setData({
            focus: !0
        });
    },
    sqjd: function(t) {
        console.log(t.detail.value), this.setData({
            focus: !1,
            xfje: Number(t.detail.value)
        });
    },
    jstotal: function() {
        console.log(this.data);
        var t = (Number(this.data.xfje) - Number(this.data.discounttext)).toFixed(2);
        -1 !== this.data.checkboxChange.indexOf("quan") ? (t = (t - Number(this.data.kdje)).toFixed(2), 
        console.log("选择了优惠券"), this.setData({
            isyhq: !0
        })) : (console.log("没有选择券"), this.setData({
            isyhq: !1
        })), t <= 0 && (t = 0), this.setData({
            total: t
        });
    },
    checkboxChange: function(t) {
        this.setData({
            checkboxChange: t.detail.value
        }), this.jstotal(), console.log("checkbox发生change事件，携带value值为：", t.detail.value);
    },
    radioChange: function(t) {
        this.setData({
            radioChange: t.detail.value
        }), console.log("radio发生change事件，携带value值为：", t.detail.value);
    },
    xzq: function(t) {
        if (console.log(t.currentTarget.dataset, this.data.xfje), Number(t.currentTarget.dataset.full) > this.data.xfje) return wx.showModal({
            title: "提示",
            content: "您的消费金额不满足此优惠券条件"
        }), !1;
        this.setData({
            activeradio: t.currentTarget.dataset.rdid,
            yhqnum: 1,
            yhqfull: t.currentTarget.dataset.full,
            yhqname: t.currentTarget.dataset.type,
            yhqkdje: t.currentTarget.dataset.kdje
        }), "代金券" == t.currentTarget.dataset.type && this.setData({
            kdje: t.currentTarget.dataset.kdje
        }), "折扣券" == t.currentTarget.dataset.type && this.setData({
            kdje: ((1 - .1 * Number(t.currentTarget.dataset.kdje)) * Number(this.data.xfje)).toFixed(2)
        }), this.jstotal();
    },
    bindinput: function(t) {
        console.log(t.detail.value, this.data.yhqfull, this.data.yhqname, this.data.yhqkdje), 
        "" != t.detail.value ? this.setData({
            disabled: !1,
            total: Number(t.detail.value).toFixed(2)
        }) : this.setData({
            disabled: !0,
            total: 0
        });
    },
    tabClick: function(t) {
        var a = t.currentTarget.id;
        console.log(a), this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    yuan: function() {
        console.log("yuan");
        wx.showModal({
            title: "会员等级说明",
            content: this.data.userInfo.details,
            showCancel: !1
        });
    },
    ji: function() {
        console.log("ji"), wx.showModal({
            title: "积分规则",
            content: "1积分可抵一元，最高可抵订单金额50%",
            showCancel: !1
        });
    },
    lqyhq: function(t, a) {
        var n = this;
        app.util.request({
            url: "entry/wxapp/MyCoupons2",
            cachetime: "0",
            data: {
                user_id: t,
                store_id: a
            },
            success: function(t) {
                console.log("优惠券信息", t.data);
                for (var a = t.data, e = [], o = [], s = 0; s < a.length; s++) "1" == a[s].type && "2" == a[s].state && e.push(a[s]), 
                "2" == a[s].type && "2" == a[s].state && o.push(a[s]);
                console.log(e, o), n.setData({
                    djq: e,
                    zkq: o
                });
            }
        });
    },
    onLoad: function(t) {
        console.log(t, this.data);
        var o = this, a = wx.getStorageSync("url"), e = t.sjid;
        console.log(e);
        var s = wx.getStorageSync("users").id;
        console.log(s), o.lqyhq(s, e), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: s
            },
            success: function(t) {
                if (console.log("用户信息", t.data), null != t.data.discount) var a = t.data.discount; else a = 100;
                o.setData({
                    userInfo: t.data,
                    discount: a,
                    integral: t.data.integral
                }), "0" == t.data.grade && (wx.showModal({
                    title: "提示",
                    content: "开卡成为会员能享受优惠买单哦~"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../my/login"
                    });
                }, 1500));
            }
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: e
            },
            success: function(t) {
                console.log("门店信息", t.data), o.setData({
                    mdinfo: t.data.store[0]
                }), wx.setNavigationBarTitle({
                    title: "欢迎光临" + t.data.store[0].store_name
                });
                var a = t.data.store[0].details.length * o.data.size, e = wx.getSystemInfoSync().windowWidth;
                console.log(a, e), o.setData({
                    length: a,
                    windowWidth: e
                }), o.scrolltxt();
            }
        }), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), o.setData({
                    xtxx: t.data,
                    url: a,
                    jf_proportion: t.data.jf_proportion
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.color
                }), "1" == t.data.is_yue ? o.setData({
                    kqyue: !0
                }) : o.setData({
                    kqyue: !1
                }), "1" == t.data.is_jf && "1" == t.data.is_jfpay ? o.setData({
                    kqjf: !0
                }) : o.setData({
                    kqjf: !1
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {}
});