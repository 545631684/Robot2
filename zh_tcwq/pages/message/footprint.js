var app = getApp();

Page({
    data: {
        index: 0,
        types: 1
    },
    onLoad: function(e) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var t = wx.getStorageSync("url");
        this.setData({
            url: t
        }), this.refresh();
    },
    refresh: function(e) {
        var u = this, t = wx.getStorageSync("users").id;
        var o, n, a, l = (o = new Date(), n = o.getMonth() + 1, a = o.getDate(), 1 <= n && n <= 9 && (n = "0" + n), 
        0 <= a && a <= 9 && (a = "0" + a), o.getFullYear() + "/" + n + "/" + a + " " + o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds());
        app.util.request({
            url: "entry/wxapp/MyFootprint",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(e) {
                console.log(e);
                var t = e.data;
                for (var o in t) {
                    t[o].time = t[o].time.slice(0, 16), null == t[o].img ? t[o].type = 1 : t[o].type = 2;
                    var n = l, a = t[o].zx_time.replace(/-/g, "/"), i = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g, r = Math.abs(Date.parse(n.replace(i, "$2-$3-$1$4")) - Date.parse(a.replace(i, "$2-$3-$1$4"))) / 1e3, s = Math.floor(r / 3600), c = Math.floor(r % 3600 / 60);
                    t[o].m = s, t[o].h = c, console.log(s + " 小时 " + c + " 分钟"), t[o].imgs = t[o].imgs.split(",").slice(0, 3);
                }
                u.setData({
                    info: t,
                    info1: t
                });
            }
        });
    },
    message: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "message_info?id=" + t,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});