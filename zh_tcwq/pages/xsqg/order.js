var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        color: "#34aaff",
        status: 1,
        order_list: [],
        show_no_data_tip: !1,
        hide: 1,
        qrcode: "",
        pagenum: 1,
        storelist: [],
        mygd: !1,
        jzgd: !0
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "我的抢购"
        }), app.setNavigationBarColor(this);
        var a = this;
        app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var e = t.data;
                "2" == e.model && (getApp().sjid = e.default_store), "4" == e.model && (getApp().sjid = e.default_store), 
                "" == t.data.dc_name && (t.data.dc_name = "店内"), "" == t.data.wm_name && (t.data.wm_name = "外卖"), 
                "" == t.data.yd_name && (t.data.yd_name = "预定"), a.setData({
                    System: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), a.setData({
                    url: t.data
                });
            }
        });
        console.log(t), this.setData({
            status: t.status
        }), this.reLoad();
    },
    reLoad: function() {
        var t, o = this, e = this.data.status || 1, a = wx.getStorageSync("users").id, s = this.data.pagenum;
        1 == e && (t = "2"), 2 == e && (t = "3"), 3 == e && (t = "4"), console.log(t, a, s), 
        app.util.request({
            url: "entry/wxapp/MyQgOrder",
            cachetime: "0",
            data: {
                state: t,
                type: 4 == t ? 1 : "",
                user_id: a,
                page: s,
                pagesize: 10
            },
            success: function(t) {
                console.log("分页返回的列表数据", t.data);
                for (var e = 0; e < t.data.length; e++) t.data[e].dq_time = util.ormatDate(t.data[e].dq_time);
                t.data.length < 10 ? o.setData({
                    mygd: !0,
                    jzgd: !0
                }) : o.setData({
                    jzgd: !0,
                    pagenum: o.data.pagenum + 1
                });
                var a = o.data.storelist;
                a = function(t) {
                    for (var e = [], a = 0; a < t.length; a++) -1 == e.indexOf(t[a]) && e.push(t[a]);
                    return e;
                }(a = a.concat(t.data)), o.setData({
                    order_list: a,
                    storelist: a
                }), console.log(a);
            }
        });
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.pagenum);
        !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.reLoad());
    },
    orderPay: function(t) {
        var e = getApp().getOpenId, a = wx.getStorageSync("users").id, o = t.currentTarget.dataset.id, s = t.currentTarget.dataset.money, n = t.currentTarget.dataset.type;
        console.log(e, a, o, s, n), "5" == n ? wx.showModal({
            title: "提示",
            content: "您的支付方式为餐后支付，请到收银台付款"
        }) : (wx.showLoading({
            title: "正在提交",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/QgPay",
            cachetime: "0",
            data: {
                openid: e,
                money: s,
                order_id: o
            },
            success: function(t) {
                console.log(t), wx.hideLoading(), wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: t.data.signType,
                    paySign: t.data.paySign,
                    success: function(t) {
                        console.log(t.data);
                    },
                    complete: function(t) {
                        console.log(t), "requestPayment:fail cancel" == t.errMsg && wx.showToast({
                            title: "取消支付",
                            icon: "loading",
                            duration: 1e3
                        }), "requestPayment:ok" == t.errMsg && (wx.showToast({
                            title: "支付成功",
                            duration: 1e3
                        }), 1 == n && setTimeout(function() {
                            wx.redirectTo({
                                url: "order?status=2"
                            });
                        }, 1e3), 2 == n && setTimeout(function() {
                            wx.redirectTo({
                                url: "order?status=4"
                            });
                        }, 1e3));
                    }
                });
            }
        }));
    },
    canceldd: function(t) {
        var e = t.currentTarget.dataset.id;
        console.log(e), wx.showModal({
            title: "提示",
            content: "是否取消该订单？",
            cancelText: "否",
            confirmText: "是",
            success: function(t) {
                if (t.cancel) return !0;
                t.confirm && (wx.showLoading({
                    title: "操作中"
                }), app.util.request({
                    url: "entry/wxapp/CancelOrder",
                    cachetime: "0",
                    data: {
                        order_id: e
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "取消成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "order?status=5"
                            });
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                }));
            }
        });
    },
    orderRevoke: function(t) {
        var e = t.currentTarget.dataset.id;
        console.log(e), wx.showModal({
            title: "提示",
            content: "是否删除该订单？",
            cancelText: "否",
            confirmText: "是",
            success: function(t) {
                if (t.cancel) return !0;
                t.confirm && (wx.showLoading({
                    title: "操作中"
                }), app.util.request({
                    url: "entry/wxapp/DelQgOrder",
                    cachetime: "0",
                    data: {
                        order_id: e
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "order?status=3"
                            });
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                }));
            }
        });
    },
    txsj: function(t) {
        console.log("提醒商家" + t.currentTarget.dataset.tel), wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    sqtk: function(e) {
        console.log("申请退款" + e.currentTarget.dataset.id), wx.showModal({
            title: "提示",
            content: "申请退款么",
            success: function(t) {
                if (t.cancel) return !0;
                t.confirm && (wx.showLoading({
                    title: "操作中"
                }), app.util.request({
                    url: "entry/wxapp/TkOrder",
                    cachetime: "0",
                    data: {
                        order_id: e.currentTarget.dataset.id
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "申请成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "order?status=5"
                            });
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                }));
            }
        });
    },
    qrsh: function(t) {
        var e = t.currentTarget.dataset.id;
        console.log(e), wx.showModal({
            title: "提示",
            content: "是否确认已收到货？",
            cancelText: "否",
            confirmText: "是",
            success: function(t) {
                if (t.cancel) return !0;
                t.confirm && (wx.showLoading({
                    title: "操作中"
                }), app.util.request({
                    url: "entry/wxapp/OkOrder",
                    cachetime: "0",
                    data: {
                        order_id: e
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "收货成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "order?status=4"
                            });
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                }));
            }
        });
    },
    orderQrcode: function(a) {
        var o = this, s = o.data.order_list, n = a.target.dataset.index;
        wx.showLoading({
            title: "正在加载",
            mask: !0
        }), o.data.order_list[n].offline_qrcode ? (o.setData({
            hide: 0,
            qrcode: o.data.order_list[n].offline_qrcode
        }), wx.hideLoading()) : e.request({
            url: t.order.get_qrcode,
            data: {
                order_no: s[n].order_no
            },
            success: function(t) {
                0 == t.code ? o.setData({
                    hide: 0,
                    qrcode: t.data.url
                }) : wx.showModal({
                    title: "提示",
                    content: t.msg
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    hide: function(t) {
        this.setData({
            hide: 1
        });
    },
    hxqh: function(t) {
        var e = this, a = t.currentTarget.dataset.id, o = t.currentTarget.dataset.sjid;
        console.log(a, o), wx.showLoading({
            title: "加载中",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/QgOrderCode",
            cachetime: "0",
            data: {
                order_id: a
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    hx_code: t.data,
                    hide: 2
                });
            }
        });
    }
});