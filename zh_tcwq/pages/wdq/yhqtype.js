var app = getApp(), util = require("../../utils/util.js");

Page({
    inputValue: "",
    data: {
        page: 1,
        refresh_top: !1,
        seller: [],
        typeid: ""
    },
    onLoad: function(t) {
        console.log(t.name), app.setNavigationBarColor(this), t.name && wx.setNavigationBarTitle({
            title: t.name
        }), this.setData({
            titlename: t.name,
            typeid: t.id,
            System: wx.getStorageSync("System")
        });
        var e = this;
        wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                e.setData({
                    url: t.data
                });
            }
        }), this.seller(this.data.typeid);
    },
    seller: function(t) {
        console.log("typeid为", t);
        var o = this, e = util.formatTime(new Date()), n = util.formatTime(new Date()).replace(/\//g, "-").toString();
        console.log(e, n);
        wx.getStorageSync("city");
        var i = o.data.page, a = o.data.store_id || "", s = o.data.seller, r = null == this.data.store_id ? wx.getStorageSync("city") : "";
        console.log(a, r), app.util.request({
            url: "entry/wxapp/CouponList",
            cachetime: "0",
            data: {
                type_id: t,
                store_id: a,
                page: i,
                pagesize: 10,
                cityname: r
            },
            success: function(t) {
                console.log(t.data);
                for (var e = 0; e < t.data.length; e++) t.data[e].rate = parseInt(100 * (1 - Number(t.data[e].surplus) / Number(t.data[e].number)));
                t.data.length < 10 ? o.setData({
                    refresh_top: !0
                }) : o.setData({
                    refresh_top: !1,
                    page: i + 1
                }), s = s.concat(t.data), s = function(t) {
                    for (var e = [], a = 0; a < t.length; a++) -1 == e.indexOf(t[a]) && e.push(t[a]);
                    return e;
                }(s), console.log(s);
                for (var a = 0; a < s.length; a++) s[a].end_time > n ? s[a].isgq = 2 : s[a].isgq = 1;
                o.setData({
                    seller: s
                });
            }
        });
    },
    onReady: function(t) {
        this.videoContext = wx.createVideoContext("myVideo");
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        console.log("上拉触底"), 0 == this.data.refresh_top ? this.seller(this.data.typeid) : console.log("没有更多了");
    }
});