Page({
    data: {
        msgList: [ {
            name: "王呵呵",
            money: "0.01",
            time: "2017-11-11-12:09"
        }, {
            name: "李哈哈",
            money: "1.12",
            time: "2017-11-11-13:33"
        } ],
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        circular: !0
    },
    onLoad: function(n) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
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