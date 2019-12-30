var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var n = this;
        console.log(o), app.util.request({
            url: "entry/wxapp/Storewallet",
            cachetime: "0",
            data: {
                store_id: o.store_id
            },
            success: function(o) {
                console.log(o), n.setData({
                    score: o.data
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