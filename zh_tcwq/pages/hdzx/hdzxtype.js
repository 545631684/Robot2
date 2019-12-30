function getRandomColor() {
    for (var t = [], e = 0; e < 3; ++e) {
        var o = Math.floor(256 * Math.random()).toString(16);
        o = 1 == o.length ? "0" + o : o, t.push(o);
    }
    return "#" + t.join("");
}

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
        console.log(t.name), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        }), t.name && wx.setNavigationBarTitle({
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
        var o = this, e = util.formatTime(new Date()), a = util.formatTime(new Date()).replace(/\//g, "-").toString();
        console.log(e, a);
        var n = wx.getStorageSync("city"), i = o.data.page, r = o.data.seller;
        console.log(n), app.util.request({
            url: "entry/wxapp/Activity",
            cachetime: "0",
            data: {
                type_id: t,
                page: i,
                pagesize: 5,
                cityname: n
            },
            success: function(t) {
                console.log(t.data), t.data.length < 5 ? o.setData({
                    refresh_top: !0
                }) : o.setData({
                    refresh_top: !1,
                    page: i + 1
                }), r = r.concat(t.data), r = function(t) {
                    for (var e = [], o = 0; o < t.length; o++) -1 == e.indexOf(t[o]) && e.push(t[o]);
                    return e;
                }(r), console.log(r);
                for (var e = 0; e < r.length; e++) r[e].end_time > a ? r[e].isgq = 2 : r[e].isgq = 1;
                o.setData({
                    seller: r
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