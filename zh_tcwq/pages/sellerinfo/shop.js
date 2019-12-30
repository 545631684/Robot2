var app = getApp();

Page({
    data: {
        array: [ "全部", "新品上架", "热门商品" ],
        activeindex: 0,
        index: 0
    },
    onLoad: function(t) {
        console.log(t);
        var o = t.store_id;
        this.setData({
            store_id: o
        }), this.refresh();
    },
    refresh: function(t) {
        var n = this, i = wx.getStorageSync("url"), o = (n.data.activeindex, n.data.store_id);
        app.util.request({
            url: "entry/wxapp/GoodList",
            cachetime: "0",
            data: {
                store_id: o
            },
            success: function(t) {
                console.log(t);
                var o = t.data;
                for (var e in o) o[e].lb_imgs = o[e].lb_imgs.split(",")[0];
                n.setData({
                    store_shop: o,
                    shop: o,
                    url: i
                });
            }
        });
    },
    select: function(t) {
        console.log(t);
        var o = t.currentTarget.dataset.index, e = this.data.shop;
        if (this.setData({
            activeindex: o,
            index: o
        }), 2 == o) {
            e = e.sort(function(t, o) {
                t = Number(t.sales);
                return (o = Number(o.sales)) < t ? -1 : t < o ? 1 : 0;
            });
            this.setData({
                store_shop: e
            });
        }
        1 == o && this.refresh(), 0 == o && this.refresh();
    },
    modify: function(t) {
        console.log(t);
        var o = t.currentTarget.dataset.id, e = this.data.store_id;
        wx.navigateTo({
            url: "modify?id=" + o + "&store_id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    goods_info: function(t) {
        console.log(t);
        var o = this.data.store_id, e = t.currentTarget.id;
        wx.navigateTo({
            url: "good_info?id=" + e + "&store_id=" + o,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), this.refresh();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});