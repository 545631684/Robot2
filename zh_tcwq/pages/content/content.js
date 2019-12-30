var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        var n = wx.getStorageSync("System");
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), console.log(n), this.setData({
            tel: n.tel,
            userinfo: wx.getStorageSync("users")
        });
    },
    tel: function(o) {
        wx.makePhoneCall({
            phoneNumber: this.data.tel
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