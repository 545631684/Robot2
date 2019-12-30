var app = getApp();

Page({
    data: {
        array: [ "待付款", "待发货", "待收货", "已完成", "售后/退款" ],
        activeIndex: 0,
        index: 0
    },
    onLoad: function(a) {
        var t = this, e = wx.getStorageSync("url");
        null != a.activeIndex && t.setData({
            activeIndex: a.activeIndex,
            store_id: a.store_id
        }), t.setData({
            url: e
        }), t.refresh();
    },
    refresh: function() {
        var n = this, i = n.data.activeIndex, a = n.data.store_id;
        app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: a
            },
            success: function(a) {
                console.log(a);
                var t = [], e = [], o = [], s = [], r = [];
                for (var d in a.data) a.data[d].time = app.ormatDate(a.data[d].time), 1 == a.data[d].state ? t.push(a.data[d]) : 2 == a.data[d].state ? e.push(a.data[d]) : 3 == a.data[d].state ? o.push(a.data[d]) : 4 == a.data[d].state ? s.push(a.data[d]) : 5 != a.data[d].state && 6 != a.data[d].state && 7 != a.data[d].state || r.push(a.data[d]);
                console.log(t), 0 == i ? n.setData({
                    order: t
                }) : 1 == i ? n.setData({
                    order: e
                }) : 2 == i ? n.setData({
                    order: o
                }) : 3 == i ? n.setData({
                    order: s
                }) : 4 == i && n.setData({
                    order: r
                }), console.log(t);
            }
        });
    },
    select: function(a) {
        console.log(a);
        var n = this, t = n.data.store_id, i = a.currentTarget.dataset.index;
        app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: t
            },
            success: function(a) {
                console.log(a);
                var t = [], e = [], o = [], s = [], r = [];
                for (var d in a.data) a.data[d].time = app.ormatDate(a.data[d].time), 1 == a.data[d].state ? t.push(a.data[d]) : 2 == a.data[d].state ? e.push(a.data[d]) : 3 == a.data[d].state ? o.push(a.data[d]) : 4 == a.data[d].state ? s.push(a.data[d]) : 5 != a.data[d].state && 6 != a.data[d].state && 7 != a.data[d].state || r.push(a.data[d]);
                console.log(t), 0 == i ? n.setData({
                    order: t
                }) : 1 == i ? n.setData({
                    order: e
                }) : 2 == i ? n.setData({
                    order: o
                }) : 3 == i ? n.setData({
                    order: s
                }) : 4 == i && n.setData({
                    order: r
                });
            }
        }), n.setData({
            activeIndex: i,
            index: i
        });
    },
    order_info: function(a) {
        console.log(a);
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "mine_order_info?id=" + t,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    onReady: function() {},
    onShow: function() {
        app.setNavigationBarColor(this), this.refresh();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});