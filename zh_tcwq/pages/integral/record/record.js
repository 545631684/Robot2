var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        wx.hideShareMenu({}), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var o = this, t = wx.getStorageSync("users").id, e = wx.getStorageSync("url");
        app.util.request({
            url: "entry/wxapp/Dhmx",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(n) {
                console.log(n), o.setData({
                    score: n.data,
                    url: e
                });
            }
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