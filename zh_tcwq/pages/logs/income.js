var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        this.setData({
            System: wx.getStorageSync("System")
        }), this.Refresh();
    },
    refresh1: function() {
        this.Refresh();
    },
    Refresh: function(t) {
        var c = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        });
        var e = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                console.log(t);
                var a = t.data;
                app.util.request({
                    url: "entry/wxapp/MyTiXian",
                    cachetime: "0",
                    data: {
                        user_id: t.data.id
                    },
                    success: function(t) {
                        console.log(t);
                        var e = 0;
                        for (var n in t.data) e += Number(t.data[n].tx_cost);
                        console.log(e);
                        var o = Number(a.money);
                        o = o.toFixed(2), console.log(o), c.setData({
                            money: o
                        });
                    }
                });
            }
        });
    },
    detailed2: function(t) {
        wx.navigateTo({
            url: "detailed?state=2",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    detailed3: function(t) {
        wx.navigateTo({
            url: "detailed?state=1",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    cash: function(t) {
        wx.navigateTo({
            url: "cash?state=1",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});