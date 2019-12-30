var app = getApp(), searchTitle = "";

Page({
    data: {
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        searchLogShowed: !0,
        refresh_top: !1,
        seller: [],
        page: 1
    },
    showInput: function() {
        this.setData({
            inputShowed: !0,
            searchLogShowed: !0
        });
    },
    searchData: function() {
        console.log(searchTitle);
        var t = this;
        t.setData({
            refresh_top: !1,
            seller: [],
            page: 1
        }), "" != searchTitle ? (t.refresh(searchTitle), t.setData({
            djss: !0
        })) : wx.showToast({
            title: "搜索内容为空",
            icon: "loading",
            duration: 1e3
        });
    },
    clearInput: function() {
        this.setData({
            inputVal: ""
        }), searchTitle = "";
    },
    inputTyping: function(t) {
        this.setData({
            inputVal: t.detail.value,
            searchLogShowed: !0
        }), searchTitle = t.detail.value;
    },
    onLoad: function(t) {
        console.log("onLoad");
        var a = this;
        app.setNavigationBarColor(this), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                a.setData({
                    url: t.data,
                    color: wx.getStorageSync("color"),
                    system: wx.getStorageSync("System")
                });
            }
        }), wx.getLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t), a.setData({
                    lat: t.latitude,
                    lng: t.longitude
                });
            }
        });
    },
    see: function(t) {
        this.data.seller;
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../infodetial/infodetial?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    previewImage: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.id, e = this.data.url, o = [], n = t.currentTarget.dataset.inde, i = this.data.seller;
        for (var r in i) if (i[r].tz.id == a) {
            var s = i[r].tz.img;
            for (var l in s) o.push(e + s[l]);
            wx.previewImage({
                current: e + s[n],
                urls: o
            });
        }
    },
    phone: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    refresh: function(t) {
        console.log(t);
        var i = this, r = (wx.getStorageSync("city"), i.data.page), s = i.data.seller;
        console.log(s, r), app.util.request({
            url: "entry/wxapp/list2",
            cachetime: "0",
            data: {
                keywords: t,
                page: r
            },
            success: function(t) {
                for (var a in i.setData({
                    page: r + 1,
                    djss: !1
                }), console.log(t), t.data.length < 10 ? i.setData({
                    refresh_top: !0
                }) : i.setData({
                    refresh_top: !1
                }), s = function(t) {
                    for (var a = [], e = 0; e < t.length; e++) -1 == a.indexOf(t[e]) && a.push(t[e]);
                    return a;
                }(s = s.concat(t.data)), t.data) {
                    var e = app.ormatDate(t.data[a].tz.sh_time);
                    t.data[a].tz.img = t.data[a].tz.img.split(","), t.data[a].tz.details = t.data[a].tz.details.replace("↵", " "), 
                    4 < t.data[a].tz.img.length && (t.data[a].tz.img_length = Number(t.data[a].tz.img.length) - 4), 
                    4 <= t.data[a].tz.img.length ? t.data[a].tz.img1 = t.data[a].tz.img.slice(0, 4) : t.data[a].tz.img1 = t.data[a].tz.img, 
                    t.data[a].tz.time = e.slice(0, 16), Number(t.data[a].tz.juli) < 1e3 ? t.data[a].tz.juli = Number(t.data[a].tz.juli) + "m" : t.data[a].tz.juli = (Number(t.data[a].tz.juli) / 1e3).toFixed(2) + "km";
                }
                for (var o in s) {
                    for (var n in s[o].label) s[o].label[n].number = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")";
                    i.setData({
                        seller: s
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh(searchTitle);
    },
    onShareAppMessage: function() {}
});