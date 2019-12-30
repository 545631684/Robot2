var app = getApp(), util = require("../../utils/util.js"), imgArray = [], imgArray1 = [], lbimgArray = [], lbimgArray1 = [], imglogo = "";

Page({
    data: {
        index: 0,
        index_two: 0,
        zsnum: 0,
        lbimages1: [],
        images1: [],
        logo: []
    },
    onLoad: function(e) {
        app.setNavigationBarColor(this), wx.setNavigationBarTitle({
            title: "入驻" + getApp().xtxx.hy_title
        }), imgArray = [], imgArray1 = [], lbimgArray = [], lbimgArray1 = [];
        var o = wx.getStorageSync("System").is_tel, t = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(e) {
                2 == e.data.state && wx.showModal({
                    title: "提示",
                    content: "您的账号异常，请尽快联系管理员",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(e) {
                        wx.navigateBack({
                            delta: 1
                        });
                    },
                    fail: function(e) {},
                    complete: function(e) {}
                });
            }
        });
        var n = wx.getStorageSync("users"), i = this;
        console.log(n), console.log(getApp().imglink, getApp().getuniacid);
        var l = wx.getStorageSync("url");
        app.util.request({
            url: "entry/wxapp/yellowType",
            cachetime: "0",
            success: function(e) {
                console.log(e);
                var t = e.data, a = [];
                t.map(function(e) {
                    var t;
                    t = e.type_name, a.push(t);
                }), console.log(a), i.setData({
                    nav: a,
                    store: t,
                    link: l,
                    is_tel: o,
                    user_info: n
                }), app.util.request({
                    url: "entry/wxapp/yellowType2",
                    cachetime: "0",
                    data: {
                        type_id: t[0].id
                    },
                    success: function(e) {
                        console.log(e);
                        var a = [];
                        e.data.map(function(e) {
                            var t;
                            t = e.name, a.push(t);
                        }), i.setData({
                            store2: e.data,
                            store_type_two: a
                        });
                    }
                });
            }
        }), app.util.request({
            url: "entry/wxapp/YellowSet",
            cachetime: "0",
            success: function(e) {
                console.log(e), 0 == e.data.length && (wx.showModal({
                    title: "提示",
                    content: "平台暂未添加入驻期限，无法入驻"
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 2e3));
                var a = [];
                for (var t in e.data) {
                    var o = e.data;
                    0 == e.data[t].money ? e.data[t].money1 = "免费" : e.data[t].money1 = e.data[t].money + "元", 
                    e.data[t].text = e.data[t].days + "天 " + e.data[t].money1;
                }
                e.data.map(function(e) {
                    var t = {};
                    t.value = e.text, t.name = e.id, a.push(t);
                }), console.log(a), a[0].checked = !0, i.setData({
                    items: a,
                    yellow_set: o,
                    rz_type: a[0].name
                });
            }
        });
        var a = wx.getStorageSync("url2");
        console.log(l), this.setData({
            url: a,
            hy_title: getApp().xtxx.hy_title,
            link: l
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), i.setData({
                    xtxx: e.data
                });
            }
        }), wx.getSystemInfo({
            success: function(e) {
                console.log(e), -1 != e.system.indexOf("iOS") ? (console.log("ios"), i.setData({
                    isios: !0
                })) : console.log("andr");
            }
        });
    },
    getPhoneNumber: function(e) {
        var t = this, a = wx.getStorageSync("key"), o = e.detail.iv, n = e.detail.encryptedData;
        console.log(a), console.log(o), console.log(n), app.util.request({
            url: "entry/wxapp/jiemi",
            cachetime: "0",
            data: {
                sessionKey: a,
                iv: o,
                data: n
            },
            success: function(e) {
                console.log(e), t.setData({
                    num: e.data.phoneNumber
                });
            }
        });
    },
    bindPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        var t = this, a = t.data.store, o = e.detail.value;
        this.setData({
            index: o,
            index_two: 0
        }), console.log(a[o].id), app.util.request({
            url: "entry/wxapp/yellowType2",
            cachetime: "0",
            data: {
                type_id: a[o].id
            },
            success: function(e) {
                console.log(e);
                var a = [];
                e.data.map(function(e) {
                    var t;
                    t = e.name, a.push(t);
                }), t.setData({
                    store2: e.data,
                    store_type_two: a
                });
            }
        });
    },
    bindchange_two: function(e) {
        this.setData({
            index_two: e.detail.value
        });
    },
    radioChange: function(e) {
        console.log("radio发生change事件，携带value值为：", e.detail.value), this.setData({
            rz_type: e.detail.value
        });
    },
    choose: function(e) {
        var a = this, o = a.data.url, n = wx.getStorageSync("uniacid");
        console.log(o), console.log(n), wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                console.log(e);
                var t = e.tempFilePaths[0];
                wx.uploadFile({
                    url: o + "app/index.php?i=" + n + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    filePath: t,
                    name: "upfile",
                    formData: {},
                    success: function(e) {
                        console.log(e);
                        var t = a.data.logo;
                        t[0] = e.data, a.setData({
                            logo: t
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    lbdelete1: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.logo;
        a.splice(t, 1), console.log(a), this.setData({
            logo: a
        });
    },
    gongg: function(e) {
        console.log(e.detail.value);
        var t = parseInt(e.detail.value.length);
        this.setData({
            zsnum: t
        });
    },
    add: function(e) {
        var t = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(e) {
                console.log(e);
                e.latitude, e.longitude, e.speed, e.accuracy;
                t.setData({
                    address: e.address,
                    start_lat: e.latitude,
                    start_lng: e.longitude
                });
            }
        });
    },
    formSubmit: function(e) {
        console.log(e);
        var t = this, a = wx.getStorageSync("city"), o = e.detail.value.name, n = e.detail.value.tel, i = e.detail.value.details, l = e.detail.value.address, s = "", c = t.data.logo, r = t.data.yellow_set, u = (t.data.items, 
        t.data.start_lat + "," + t.data.start_lng);
        console.log(u);
        var d = t.data.store, g = t.data.store2, p = t.data.nav, m = t.data.index, y = t.data.index_two, f = p[m], x = g[y];
        if (2 == t.data.is_tel) var w = 1; else w = t.data.num;
        for (var h in d) if (d[h].type_name == f) var v = d[h].id;
        if (0 < g.length) var _ = g[y].id; else _ = "";
        console.log(d, g, x, v, _);
        var S = t.data.rz_type;
        for (var T in r) if (r[T].id == S) {
            console.log(r[T].money);
            var D = Number(r[T].money);
        }
        if (console.log(r), console.log(t.data.rz_type), console.log(c[0]), "" == o ? s = "公司名称不能为空" : "" == n ? s = "公司电话不能为空" : "" == i ? s = "公司简介不能为空" : null == l || "" == l ? s = "请正确填写公司地址" : 0 == c.length ? s = "请上传公司logo" : null == w && (s = "还没进行手机号验证"), 
        "" != s) wx.showModal({
            title: "提示",
            content: s,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }); else {
            c = c[0];
            var k = wx.getStorageSync("users").id, q = wx.getStorageSync("openid");
            if (0 < D) {
                if (t.data.isios && "2" == t.data.xtxx.is_pgzf) return void wx.showModal({
                    title: "暂不支持",
                    content: "由于相关规范，iOS功能暂不可用",
                    showCancel: !1,
                    confirmText: "好的",
                    confirmColor: "#666"
                });
                app.util.request({
                    url: "entry/wxapp/Pay",
                    cachetime: "0",
                    data: {
                        openid: q,
                        money: D
                    },
                    success: function(e) {
                        console.log(e), wx.requestPayment({
                            timeStamp: e.data.timeStamp,
                            nonceStr: e.data.nonceStr,
                            package: e.data.package,
                            signType: e.data.signType,
                            paySign: e.data.paySign,
                            success: function(e) {
                                console.log("这里是支付成功"), app.util.request({
                                    url: "entry/wxapp/fx",
                                    cachetime: "0",
                                    data: {
                                        user_id: k,
                                        money: D
                                    },
                                    success: function(e) {
                                        console.log(e);
                                    }
                                }), console.log(e), app.util.request({
                                    url: "entry/wxapp/YellowPage",
                                    cachetime: "0",
                                    data: {
                                        user_id: k,
                                        logo: c,
                                        company_name: o,
                                        company_address: l,
                                        type_id: v,
                                        type2_id: _,
                                        link_tel: n,
                                        rz_type: S,
                                        coordinates: u,
                                        content: i,
                                        imgs: "",
                                        tel2: w,
                                        cityname: a
                                    },
                                    success: function(e) {
                                        console.log(e), app.util.request({
                                            url: "entry/wxapp/SaveHyPayLog",
                                            cachetime: "0",
                                            data: {
                                                hy_id: e.data,
                                                money: D
                                            },
                                            success: function(e) {
                                                console.log(e);
                                            }
                                        }), wx.showModal({
                                            title: "提示",
                                            content: "提交成功等待审核"
                                        }), setTimeout(function() {
                                            wx.navigateBack({
                                                delta: 1
                                            });
                                        }, 2e3);
                                    }
                                });
                            },
                            fail: function(e) {
                                console.log("这里是支付失败"), console.log(e), wx.showToast({
                                    title: "支付失败",
                                    duration: 1e3
                                });
                            }
                        });
                    }
                });
            } else app.util.request({
                url: "entry/wxapp/YellowPage",
                cachetime: "0",
                data: {
                    user_id: k,
                    logo: c,
                    company_name: o,
                    company_address: l,
                    type_id: v,
                    type2_id: _,
                    link_tel: n,
                    rz_type: S,
                    coordinates: u,
                    content: i,
                    imgs: "",
                    tel2: w,
                    cityname: a
                },
                success: function(e) {
                    console.log(e), wx.showToast({
                        title: "入驻成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 2e3);
                }
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});