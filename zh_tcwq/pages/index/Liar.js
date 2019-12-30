var dsq, dsq1, a = getApp();

Page({
    data: {
        imgUrls: [ "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg", "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg", "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg" ]
    },
    tggg: function() {
        clearInterval(dsq), clearTimeout(dsq1), wx.reLaunch({
            url: "index"
        });
    },
    jumps: function() {
        wx.navigateTo({
            url: this.data.xtxx.kp_url
        });
    },
    onLoad: function(t) {
        var n = this;
        a.setNavigationBarColor(this), a.getUrl(this), a.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var o = t.data;
                o.gs_img = o.gs_img.split(","), "" != o.kp_img && (o.kp_img = o.kp_img.split(",")), 
                n.setData({
                    xtxx: o,
                    second: o.kp_time,
                    kpggimg: o.kp_img
                });
                var e = Number(o.kp_time);
                "1" == o.model && (dsq = setInterval(function() {
                    e--, n.setData({
                        second: e
                    });
                }, 1e3), dsq1 = setTimeout(function() {
                    clearInterval(dsq), wx.reLaunch({
                        url: "index"
                    });
                }, 1e3 * e));
            }
        });
    },
    maketel: function(t) {
        var o = this.data.xtxx.gs_tel;
        wx.makePhoneCall({
            phoneNumber: o
        });
    },
    location: function() {
        var t = this.data.xtxx.gs_zb.split(","), o = this.data.xtxx;
        console.log(t), wx.openLocation({
            latitude: parseFloat(t[0]),
            longitude: parseFloat(t[1]),
            address: o.gs_add,
            name: "位置"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});