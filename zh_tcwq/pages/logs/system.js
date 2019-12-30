var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var o = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        });
        var n = wx.getStorageSync("System");
        console.log(n), "1" == t.isbz ? (wx.setNavigationBarTitle({
            title: t.title
        }), o.setData({
            node: wx.getStorageSync("bzinfo")
        })) : "1" == t.ftxz ? (wx.setNavigationBarTitle({
            title: "发帖须知"
        }), o.setData({
            node: n.ft_xuz
        })) : "1" == t.rzxz ? (wx.setNavigationBarTitle({
            title: "入驻须知"
        }), o.setData({
            node: n.rz_xuz
        })) : o.setData({
            node: n.details
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.removeStorageSync("bzinfo");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});