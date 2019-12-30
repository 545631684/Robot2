var app = getApp();

Page({
    data: {
        bomb: !0,
        kpgg: !0,
        ssq: "",
        xxdz: "",
        djdh: !1,
        qddh: !1
    },
    onLoad: function(t) {
        console.log(t.id), wx.hideShareMenu({}), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var a = wx.getStorageSync("url"), o = wx.getStorageSync("users").id;
        this.setData({
            url: a
        });
        var e = this;
        app.util.request({
            url: "entry/wxapp/JfGoodsInfo",
            cachetime: "0",
            data: {
                id: t.id
            },
            success: function(t) {
                console.log(t), e.setData({
                    spinfo: t.data[0]
                }), wx.setNavigationBarTitle({
                    title: t.data[0].name
                });
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: o
            },
            success: function(t) {
                console.log(t), e.setData({
                    integral: t.data.total_score
                });
            }
        });
    },
    duihuan: function() {
        this.setData({
            bomb: !1
        });
    },
    cancel: function() {
        this.setData({
            bomb: !0
        });
    },
    caomfirm: function() {
        var t = wx.getStorageSync("users").id, a = this, o = a.data.spinfo.id, e = a.data.spinfo.money, n = a.data.spinfo.hb_moeny, s = Number(a.data.integral), i = a.data.spinfo.name, d = a.data.spinfo.img;
        console.log(t, o, Number(e), n, s, i, d), "1" == a.data.spinfo.type ? (a.setData({
            bomb: !0
        }), Number(e) > s ? wx.showModal({
            title: "提示",
            content: "您的积分不足以兑换此物品"
        }) : (a.setData({
            djdh: !0
        }), app.util.request({
            url: "entry/wxapp/Exchange",
            cachetime: "0",
            data: {
                user_id: t,
                good_id: o,
                integral: e,
                hb_money: n,
                type: 1,
                good_name: i,
                good_img: d
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "兑换成功"
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 1e3)) : (wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                }), a.setData({
                    djdh: !1
                }));
            }
        }))) : (a.setData({
            bomb: !0
        }), Number(e) > s ? wx.showModal({
            title: "提示",
            content: "您的积分不足以兑换此物品"
        }) : a.setData({
            kpgg: !1
        }));
    },
    ycgg: function() {
        this.setData({
            kpgg: !0
        });
    },
    dingwei: function(t) {
        console.log(t);
        var o = this;
        wx.chooseLocation({
            success: function(t) {
                console.log(t);
                var a = t.address.indexOf("区");
                console.log(t.address.substring(0, a + 1)), o.setData({
                    location: t.latitude + "," + t.longitude,
                    ssq: t.address.substring(0, a + 1),
                    xxdz: t.address.substring(a + 1) + t.name
                });
            }
        });
    },
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail.value);
        var a = this, o = wx.getStorageSync("users").id, e = a.data.spinfo.id, n = a.data.spinfo.money, s = a.data.spinfo.name, i = a.data.spinfo.img, d = t.detail.value.lxr, c = t.detail.value.tel, l = (a.data.ssq, 
        a.data.ssq + t.detail.value.grxxdz);
        console.log(o, e, n, d, c, l, s, i);
        var u = "", r = !0;
        "" == d ? u = "请填写联系人！" : "" == c ? u = "请填写联系电话！" : /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/.test(c) && 11 == c.length ? "" == l ? u = "请选择位置！" : (r = !1, 
        a.setData({
            qddh: !0
        }), app.util.request({
            url: "entry/wxapp/Exchange",
            cachetime: "0",
            data: {
                user_id: o,
                good_id: e,
                integral: n,
                user_name: d,
                user_tel: c,
                address: l,
                type: 2,
                good_name: s,
                good_img: i
            },
            success: function(t) {
                console.log(t), 1 == t.data ? (wx.showToast({
                    title: "兑换成功"
                }), setTimeout(function() {
                    wx.navigateBack({});
                }, 1e3)) : (wx.showToast({
                    title: "请重试！",
                    icon: "loading"
                }), a.setData({
                    qddh: !1
                }));
            }
        })) : u = "手机号错误", 1 == r && wx.showModal({
            title: "提示",
            content: u
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});