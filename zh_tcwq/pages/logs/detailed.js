var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var o = this;
        console.log(t);
        var e = t.state;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        });
        var a = wx.getStorageSync("users").id;
        o.setData({
            state: e,
            system: wx.getStorageSync("System")
        }), app.util.request({
            url: "entry/wxapp/MyTiXian",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t);
                for (var e in t.data) t.data[e].time = o.ormatDate(t.data[e].time).slice(0, 16), 
                o.setData({
                    detailed: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Hbmx",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                for (var e in t.data) t.data[e].time = o.ormatDate(t.data[e].time).slice(0, 16);
                var a = t.data.sort(function(t, e) {
                    return (t = Number(t.time)) < (e = Number(e.time)) ? -1 : e < t ? 1 : 0;
                });
                console.log(a), o.setData({
                    detaileds: a
                });
            }
        });
    },
    ormatDate: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + a(e.getMonth() + 1, 2) + "-" + a(e.getDate(), 2) + " " + a(e.getHours(), 2) + ":" + a(e.getMinutes(), 2) + ":" + a(e.getSeconds(), 2);
        function a(t, e) {
            for (var a = "" + t, o = a.length, n = "", r = e; r-- > o; ) n += "0";
            return n + a;
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});