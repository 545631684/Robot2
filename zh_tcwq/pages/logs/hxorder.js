var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        console.log(o);
        var e = decodeURIComponent(o.scene);
        console.log(e, wx.getStorageSync("hxsjid"));
        var n = e;
        this.setData({
            oid: n,
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
        var e = this.data.oid, n = this.data.hxsjid;
        console.log("扫的码的订单id", e, n, "核销的商家id", n), wx.showModal({
            title: "提示",
            content: "确定核销此订单吗？",
            success: function(o) {
                o.confirm ? (console.log("用户点击确定"), app.util.request({
                    url: "entry/wxapp/HxOrder",
                    cachetime: "0",
                    data: {
                        order_id: e,
                        store_id: n
                    },
                    success: function(o) {
                        console.log(o), "核销成功!" == o.data && (wx.showToast({
                            title: "核销成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.reLaunch({
                                url: "../index/index"
                            });
                        }, 1e3)), "核销失败!" == o.data && wx.showToast({
                            title: "核销失败",
                            icon: "success",
                            duration: 1e3
                        }), "无核销权限!" == o.data && (wx.showToast({
                            title: "无核销权限!",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.reLaunch({
                                url: "../index/index"
                            });
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