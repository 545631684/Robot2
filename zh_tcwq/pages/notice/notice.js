var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        console.log(n), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var o = this;
        app.util.request({
            url: "entry/wxapp/newsinfo",
            cachetime: "0",
            data: {
                id: n.id
            },
            success: function(n) {
                console.log(n), o.setData({
                    newsinfo: n.data
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