var app = getApp();

Page({
    data: {
        disabled: !0,
        zh: "",
        mm: "",
        logintext: "登录",
        werchat: !1,
        hydl: !1
    },
    onLoad: function(t) {
        app.setNavigationBarColor(this), wx.setNavigationBarTitle({
            title: "平台管理员登录"
        }), app.getUrl(this), this.setData({
            bqxx: getApp().xtxx
        });
    },
    name: function(t) {
        console.log(t), this.setData({
            name: t.detail.value
        });
    },
    password: function(t) {
        console.log(t), this.setData({
            password: t.detail.value
        });
    },
    sign: function(t) {
        console.log(this.data), wx.redirectTo({
            url: "tzlb"
        }), app.util.request({
            url: "entry/wxapp/StoreLogin",
            cachetime: "0",
            data: {
                user_name: this.data.name,
                pwd: this.data.password
            },
            success: function(t) {
                if (console.log(t), "账号不存在!" == t.data || "密码不正确!" == t.data) wx.showModal({
                    title: "提示",
                    content: "当前账号未绑定操作员",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }); else {
                    wx.setStorageSync("store_info", t.data);
                    var e = t.data.id;
                    console.log(e), wx.redirectTo({
                        url: "../redbag/merchant?id=" + t.data.id,
                        success: function(t) {},
                        fail: function(t) {},
                        complete: function(t) {}
                    });
                }
            }
        });
    },
    weixin: function(t) {
        0 == this.data.werchat ? this.setData({
            werchat: !0
        }) : 1 == this.data.werchat && this.setData({
            werchat: !1
        });
    },
    queding: function(t) {
        this.setData({
            werchat: !1
        }), app.util.request({
            url: "entry/wxapp/sjdlogin",
            cachetime: "0",
            data: {
                user_id: this.data.user_id
            },
            success: function(t) {
                if (console.log(t), 0 == t.data) wx.showModal({
                    title: "提示",
                    content: "当前账号未绑定操作员",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }); else if ("1" == t.data.state) wx.showModal({
                    title: "提示",
                    content: "您的入驻申请正在后台审核，请耐心等待"
                }); else if ("2" == t.data.state) {
                    wx.setStorageSync("store_info", t.data);
                    t.data.user_id;
                    wx.redirectTo({
                        url: "../redbag/merchant?id=" + t.data.id,
                        success: function(t) {},
                        fail: function(t) {},
                        complete: function(t) {}
                    });
                } else "3" == t.data.state && wx.showModal({
                    title: "提示",
                    content: "您的入驻申请已被拒绝，请联系平台处理"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this;
        console.log(this), app.getUserInfo(function(t) {
            console.log(t), "" != t.img && "" != t.name || wx.navigateTo({
                url: "/zh_tcwq/pages/index/getdl"
            }), e.setData({
                userinfo: t
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});