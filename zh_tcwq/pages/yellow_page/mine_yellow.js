var app = getApp();

Page({
    data: {
        luntext: [ "最新收录", "热门推荐", "附近发现" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35,
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    onLoad: function(t) {
        app.setNavigationBarColor(this), wx.setNavigationBarTitle({
            title: "我的" + getApp().xtxx.hy_title
        });
        var e = wx.getStorageSync("url");
        this.setData({
            url: e,
            system: getApp().xtxx
        });
    },
    refresh: function(t) {
        var f = this, e = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyYellowPage",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                for (var e in console.log(t), t.data) {
                    var a = t.data[e].coordinates.split(",");
                    t.data[e].lat2 = Number(wx.getStorageSync("Location").latitude), t.data[e].lng2 = Number(wx.getStorageSync("Location").longitude);
                    var n = Number(wx.getStorageSync("Location").latitude), o = Number(wx.getStorageSync("Location").longitude), i = a[0], r = a[1], c = n * Math.PI / 180, s = i * Math.PI / 180, l = c - s, u = o * Math.PI / 180 - r * Math.PI / 180, d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(l / 2), 2) + Math.cos(c) * Math.cos(s) * Math.pow(Math.sin(u / 2), 2)));
                    d *= 6378.137;
                    d = (d = Math.round(1e4 * d) / 1e4).toFixed(2);
                    t.data[e].distance = d;
                }
                f.setData({
                    yellow_list: t.data
                });
            }
        });
    },
    cancel: function(a) {
        var n = this;
        wx.showModal({
            title: "提示",
            content: "是否删除此条内容",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(t) {
                if (t.confirm) {
                    console.log("用户点击确定");
                    var e = a.currentTarget.dataset.id;
                    app.util.request({
                        url: "entry/wxapp/DelYellowStore",
                        cachetime: "0",
                        data: {
                            y_id: e
                        },
                        success: function(t) {
                            console.log(t), 1 == t.data && (n.setData({
                                yellow_list: []
                            }), n.refresh());
                        }
                    });
                } else t.cancel && console.log("用户点击取消");
            },
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    yellow_info: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "yellowinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    store_type_id: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../store/business?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    shouye: function(t) {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    yellow: function(t) {
        wx.redirectTo({
            url: "yellow"
        });
    },
    settled: function(t) {
        wx.navigateTo({
            url: "settled"
        });
    },
    onReady: function() {},
    onShow: function() {
        this.refresh();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});