var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        console.log(o);
        var t = decodeURIComponent(o.scene);
        console.log(t, wx.getStorageSync("hxsjid"));
        var e = t;
        this.setData({
            yhqid: e,
            hxsjid: wx.getStorageSync("hxsjid")
        }), wx.getStorageSync("hxsjid") || wx.showModal({
            title: "您未携带商家信息",
            content: "点击确定，登录商家中心核销",
            showCancel: !1,
            success: function(o) {
                wx.reLaunch({
                    url: "/zh_tcwq/pages/logs/bbaa"
                });
            }
        });
    },
    hx: function() {
        var t = this.data.yhqid, e = this.data.hxsjid;
        console.log("扫的码的yhqid", t, e, "核销的商家id", e), wx.showModal({
            title: "提示",
            content: "确定核销此优惠券吗？",
            success: function(o) {
                o.confirm ? (console.log("用户点击确定"), app.util.request({
                    url: "entry/wxapp/HxCoupon",
                    cachetime: "0",
                    data: {
                        id: t,
                        store_id: e
                    },
                    success: function(o) {
                        console.log(o), "核销成功" == o.data && (wx.showToast({
                            title: "核销成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3)), "核销失败" == o.data && wx.showToast({
                            title: "核销失败",
                            icon: "success",
                            duration: 1e3
                        }), "无核销权限" == o.data && (wx.showToast({
                            title: "无核销权限!",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3)), "不能重复核销 " == o.data && (wx.showToast({
                            title: "不能重复核销 !",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3));
                    }
                })) : o.cancel && (console.log("用户点击取消"), wx.reLaunch({
                    url: "../../index/index"
                }));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        wx.removeStorageSync("hxsjid");
    },
    onUnload: function() {
        wx.removeStorageSync("hxsjid");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});