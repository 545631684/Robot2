var dsq, app = getApp();

Page({
    data: {},
    maketel: function(o) {
        var t = this.data.hdinfo.tel;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    location: function() {
        var o = this.data.hdinfo.coordinate.split(","), t = this.data.hdinfo.address;
        console.log(o), wx.openLocation({
            latitude: parseFloat(o[0]),
            longitude: parseFloat(o[1]),
            address: t,
            name: "位置"
        });
    },
    onLoad: function(o) {
        console.log(o);
        var t = this;
        this.setData({
            color: wx.getStorageSync("color")
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        });
        var a = wx.getStorageSync("users").id;
        console.log(a), app.util.request({
            url: "entry/wxapp/ActivityInfo",
            cachetime: "0",
            data: {
                id: o.hdid
            },
            success: function(o) {
                console.log(o), wx.setNavigationBarTitle({
                    title: o.data.title
                }), t.setData({
                    hdinfo: o.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/ActCode",
            cachetime: "0",
            data: {
                id: o.hxid
            },
            success: function(o) {
                console.log(o), t.setData({
                    hxm: o.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        clearInterval(dsq);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});