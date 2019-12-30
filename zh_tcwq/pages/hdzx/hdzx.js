function getRandomColor() {
    for (var t = [], e = 0; e < 3; ++e) {
        var a = Math.floor(256 * Math.random()).toString(16);
        a = 1 == a.length ? "0" + a : a, t.push(a);
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
        typeid: "",
        infortype: [ {
            id: 0,
            type_name: "推荐"
        } ],
        activeIndex: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        slide: [ {
            img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513057315830&di=28c50097b1b069b2de68f70d625df8e2&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa8014c086e061d95cb1b561170f40ad162d9cabe.jpg"
        }, {
            img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=570437944,358180613&fm=27&gp=0.jpg"
        } ]
    },
    jumps: function(t) {
        var e = this, a = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid), n = t.currentTarget.dataset.src, i = t.currentTarget.dataset.id, r = t.currentTarget.dataset.sjtype;
        console.log(i);
        var o = t.currentTarget.dataset.type;
        if (1 == o) {
            if (console.log(n), "../distribution/jrhhr" == n) return !1;
            wx.navigateTo({
                url: n,
                success: function(t) {
                    e.setData({
                        averdr: !0
                    });
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        } else 2 == o ? wx.navigateTo({
            url: "../car/car?vr=" + i + "&sjtype=" + r,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 3 == o && wx.navigateToMiniProgram({
            appId: a,
            path: "",
            extraData: {
                foo: "bar"
            },
            success: function(t) {
                e.setData({
                    averdr: !0
                });
            }
        });
    },
    onLoad: function(t) {
        console.log(t.name), app.pageOnLoad(this), app.setNavigationBarColor(this), t.name && wx.setNavigationBarTitle({
            title: t.name
        }), this.setData({
            titlename: t.name,
            System: wx.getStorageSync("System")
        });
        var r = this, e = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: e
            },
            success: function(t) {
                console.log(t);
                var e = [];
                for (var a in t.data) 11 == t.data[a].type && e.push(t.data[a]);
                r.setData({
                    slide: e
                });
            }
        }), app.util.request({
            url: "entry/wxapp/ActType",
            cachetime: "0",
            success: function(t) {
                var e = t.data;
                e.length <= 5 ? r.setData({
                    height: 165
                }) : 5 < e.length && r.setData({
                    height: 340
                });
                for (var a = [], n = 0, i = e.length; n < i; n += 10) a.push(e.slice(n, n + 10));
                console.log(a, e), r.setData({
                    nav: a,
                    navs: e
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                r.setData({
                    url: t.data
                });
            }
        }), this.seller(this.data.typeid);
    },
    tabClick: function(t) {
        var e = this;
        if (console.log(t.currentTarget.id, t.currentTarget.dataset.index), 0 == t.currentTarget.dataset.index) var a = ""; else a = t.currentTarget.id;
        this.setData({
            page: 1,
            refresh_top: !1,
            seller: [],
            activeIndex: t.currentTarget.dataset.index,
            typeid: a
        }), setTimeout(function() {
            e.seller(a);
        }, 300);
    },
    selectednavbar: function(t) {
        console.log(t), wx.navigateTo({
            url: "hdzxtype?id=" + t.currentTarget.dataset.id + "&name=" + t.currentTarget.dataset.name
        });
    },
    seller: function(t) {
        console.log("typeid为", t);
        var a = this, e = util.formatTime(new Date()), n = util.formatTime(new Date()).replace(/\//g, "-").toString();
        console.log(e, n);
        var i = wx.getStorageSync("city"), r = a.data.page, o = a.data.seller;
        console.log(i), app.util.request({
            url: "entry/wxapp/Activity",
            cachetime: "0",
            data: {
                type_id: t,
                page: r,
                pagesize: 5,
                cityname: i
            },
            success: function(t) {
                console.log(t.data), t.data.length < 5 ? a.setData({
                    refresh_top: !0
                }) : a.setData({
                    refresh_top: !1,
                    page: r + 1
                }), o = o.concat(t.data), o = function(t) {
                    for (var e = [], a = 0; a < t.length; a++) -1 == e.indexOf(t[a]) && e.push(t[a]);
                    return e;
                }(o), console.log(o);
                for (var e = 0; e < o.length; e++) o[e].end_time > n ? o[e].isgq = 2 : o[e].isgq = 1;
                a.setData({
                    seller: o
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