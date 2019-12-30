var app = getApp();

Page({
    data: {
        list: []
    },
    kindToggle: function(o) {
        var n = o.currentTarget.id, t = this.data.list;
        console.log(n), wx.setStorageSync("bzinfo", t[n].answer), wx.navigateTo({
            url: "../logs/system?isbz=1&title=" + t[n].question
        });
    },
    onLoad: function(o) {
        var n = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), console.log(this), app.util.request({
            url: "entry/wxapp/GetHelp",
            cachetime: "0",
            success: function(o) {
                console.log(o.data), n.setData({
                    list: o.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});