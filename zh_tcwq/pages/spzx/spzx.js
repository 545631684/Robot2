function getRandomColor() {
    for (var t = [], e = 0; e < 3; ++e) {
        var a = Math.floor(256 * Math.random()).toString(16);
        a = 1 == a.length ? "0" + a : a, t.push(a);
    }
    return "#" + t.join("");
}

var app = getApp();

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
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    onLoad: function(t) {
        console.log(t.name), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        }), t.name && wx.setNavigationBarTitle({
            title: t.name
        }), this.setData({
            titlename: t.name,
            System: wx.getStorageSync("System")
        });
        var a = this;
        app.util.request({
            url: "entry/wxapp/VideoType",
            cachetime: "0",
            success: function(t) {
                console.log(t, a.data.infortype);
                var e = a.data.infortype.concat(t.data);
                console.log(e), a.setData({
                    infortype: e
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                a.setData({
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
    seller: function(t) {
        console.log("typeid为", t);
        var e = this, a = wx.getStorageSync("city"), o = e.data.page, n = e.data.seller;
        console.log(a), app.util.request({
            url: "entry/wxapp/VideoList",
            cachetime: "0",
            data: {
                type_id: t,
                page: o,
                pagesize: 5,
                cityname: a
            },
            success: function(t) {
                console.log(t.data), t.data.length < 5 ? e.setData({
                    refresh_top: !0
                }) : e.setData({
                    refresh_top: !1,
                    page: o + 1
                }), n = n.concat(t.data), n = function(t) {
                    for (var e = [], a = 0; a < t.length; a++) -1 == e.indexOf(t[a]) && e.push(t[a]);
                    return e;
                }(n), console.log(n), e.setData({
                    seller: n
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
    },
    onShareAppMessage: function() {
        var t = this.data.titlename;
        return console.log(t), {
            title: t,
            path: "/zh_tcwq/pages/spzx/spzx?name=" + t,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});