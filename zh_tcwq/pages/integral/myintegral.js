var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        wx.hideShareMenu({}), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var t = this, n = wx.getStorageSync("users").id;
        console.log(n), app.util.request({
            url: "entry/wxapp/Jfmx",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(o) {
                console.log(o);
                var n = o.data;
                t.setData({
                    score: n
                });
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(o) {
                console.log(o), t.setData({
                    integral: o.data.total_score
                });
            }
        });
    },
    tzjfsc: function() {
        wx.redirectTo({
            url: "integral"
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