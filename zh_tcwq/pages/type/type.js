var _Page;

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var app = getApp(), Data = require("../../utils/util.js");

Page((_defineProperty(_Page = {
    data: {
        index: 0,
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        circular: !0,
        averdr: !1,
        hotels: !1,
        refresh_top: !1,
        scroll_top: !0,
        index_class: !1,
        sxtab: [ "全部" ],
        activesxtab: 0
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    swiperChange1: function(t) {
        this.setData({
            swiperCurrent1: t.detail.current
        });
    },
    redinfo: function(t) {
        var e = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyDistribution",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(t) {
                console.log(t.data), "2" == t.data.state ? (console.log("是分销商"), wx.navigateTo({
                    url: "../distribution/yaoqing"
                })) : "1" == t.data.state ? wx.showModal({
                    title: "提示",
                    content: "您的申请正在审核中，请耐心等待"
                }) : wx.navigateTo({
                    url: "../distribution/jrhhr"
                });
            }
        });
    },
    jumps: function(t) {
        var e = this, a = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid), n = t.currentTarget.dataset.src, i = t.currentTarget.dataset.id, r = t.currentTarget.dataset.sjtype;
        console.log(i);
        var o = t.currentTarget.dataset.type;
        if (1 == o) {
            if (console.log(n), "../distribution/jrhhr" == n) return e.redinfo(), !1;
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
    city_select: function(t) {
        wx.navigateTo({
            url: "city",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    delete: function(t) {
        this.setData({
            averdr: !0
        });
    },
    changeIndicatorDots: function(t) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        });
    },
    changeAutoplay: function(t) {
        this.setData({
            autoplay: !this.data.autoplay
        });
    },
    intervalChange: function(t) {
        this.setData({
            interval: t.detail.value
        });
    },
    durationChange: function(t) {
        this.setData({
            duration: t.detail.value
        });
    },
    seller: function(t) {
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo"
        });
    },
    settled: function(t) {
        wx.navigateTo({
            url: "../settled/settled"
        });
    },
    onLoad: function(t) {
        console.log("onLoad");
        var a = this;
        app.pageOnLoad(this), app.setNavigationBarColor(this), wx.getLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t), a.setData({
                    lat: t.latitude,
                    lng: t.longitude
                }), a.seller();
            }
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url2",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url2", t.data);
            }
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(t) {
                console.log(t), 1e4 < Number(t.data.total_num) && (t.data.total_num = (Number(t.data.total_num) / 1e4).toFixed(2) + "万"), 
                a.setData({
                    System: t.data,
                    userinfo: wx.getStorageSync("users")
                }), "1" == t.data.fj_tz && a.setData({
                    sxtab: [ "全部", "附近" ]
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Views",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var e = t.data;
                "" == e ? e = 0 : 1e4 < Number(e) && (e = (Number(e) / 1e4).toFixed(2) + "万"), a.setData({
                    views: e
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Num",
            cachetime: "0",
            success: function(t) {
                a.setData({
                    Num: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("url", t.data), a.setData({
                    url: t.data
                });
            }
        }), a.refresh();
    },
    hddb: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 1e3
        });
    },
    refresh: function(t) {
        var r = this, e = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Storelist",
            cachetime: "0",
            data: {
                cityname: e
            },
            success: function(t) {
                t.data.length <= 5 ? r.setData({
                    store: t.data
                }) : r.setData({
                    store: t.data.slice(0, 6)
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: e
            },
            success: function(t) {
                console.log(t);
                var e = [], a = [], n = [];
                for (var i in t.data) 8 == t.data[i].type && e.push(t.data[i]), 5 == t.data[i].type && a.push(t.data[i]), 
                7 == t.data[i].type && n.push(t.data[i]);
                r.setData({
                    slide: e,
                    advert: a,
                    ggslide: n
                });
            }
        }), app.util.request({
            url: "entry/wxapp/news",
            cachetime: "0",
            data: {
                cityname: e
            },
            success: function(t) {
                var e = [];
                for (var a in t.data) 4 == t.data[a].type && e.push(t.data[a]);
                r.setData({
                    msgList: e
                });
            }
        }), app.util.request({
            url: "entry/wxapp/type",
            cachetime: "0",
            success: function(t) {
                var e = t.data;
                e.length <= 5 ? r.setData({
                    height: 165
                }) : 5 < e.length && r.setData({
                    height: 330
                });
                for (var a = [], n = 0, i = e.length; n < i; n += 10) a.push(e.slice(n, n + 10));
                console.log(a, e), r.setData({
                    nav: a,
                    navs: e
                });
            }
        });
    }
}, "seller", function(t) {
    var o = this, e = (o.data.index_class, wx.getStorageSync("city")), a = o.data.activeIndex, n = a ? o.data.navs[a].id : "", i = "1" == o.data.activesxtab ? "1" : "2", s = o.data.page, c = o.data.seller;
    console.log(a, e, s, n, i), null != s && "" != s || (s = 1), null != c && "" != c || (c = []), 
    app.util.request({
        url: "entry/wxapp/list2",
        cachetime: "0",
        data: {
            type_id: n,
            fj_tz: i,
            lat: o.data.lat,
            lng: o.data.lng,
            page: s,
            cityname: e
        },
        success: function(t) {
            if (console.log(t.data), 0 == t.data.length) o.setData({
                refresh_top: !0
            }); else {
                o.setData({
                    refresh_top: !1,
                    page: s + 1
                }), c = c.concat(t.data), c = function(t) {
                    for (var e = [], a = 0; a < t.length; a++) -1 == e.indexOf(t[a]) && e.push(t[a]);
                    return e;
                }(c);
            }
            if (0 < t.data.length) {
                for (var e in t.data) {
                    var a = app.ormatDate(t.data[e].tz.sh_time);
                    t.data[e].tz.img = t.data[e].tz.img.split(","), t.data[e].tz.details = t.data[e].tz.details.replace("↵", " "), 
                    4 < t.data[e].tz.img.length && (t.data[e].tz.img_length = Number(t.data[e].tz.img.length) - 4), 
                    4 <= t.data[e].tz.img.length ? t.data[e].tz.img1 = t.data[e].tz.img.slice(0, 4) : t.data[e].tz.img1 = t.data[e].tz.img, 
                    t.data[e].tz.time = a.slice(0, 16), Number(t.data[e].juli) < 1e3 ? t.data[e].tz.juli = Number(t.data[e].tz.juli) + "m" : t.data[e].tz.juli = (Number(t.data[e].tz.juli) / 1e3).toFixed(2) + "km";
                }
                for (var n in c) {
                    for (var i in c[n].label) c[n].label[i].number = (void 0, r = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")", 
                    r);
                    o.setData({
                        seller: c
                    });
                }
            } else o.setData({
                seller: c
            });
            var r;
        }
    });
}), _defineProperty(_Page, "commend", function(t) {
    var e = t.currentTarget.id;
    this.setData({
        page: "",
        seller: "",
        index_class: !0,
        activeIndex: e
    }), this.seller();
}), _defineProperty(_Page, "whole", function(t) {
    this.setData({
        activesxtab: t.currentTarget.dataset.index,
        activeIndex: null,
        page: 1,
        seller: [],
        index_class: !1
    }), this.seller();
}), _defineProperty(_Page, "bindinput", function(t) {
    var e = t.detail.value;
    "" != e && app.util.request({
        url: "entry/wxapp/list2",
        cachetime: "0",
        data: {
            keywords: e
        },
        success: function(t) {
            0 == t.data.length ? wx.showModal({
                title: "提示",
                content: "没有这个帖子",
                showCancel: !0,
                cancelText: "取消",
                confirmText: "确定",
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            }) : wx.navigateTo({
                url: "../infodetial/infodetial?id=" + t.data[0].tz.id,
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
        }
    });
}), _defineProperty(_Page, "ormatDate", function(t) {
    var e = new Date(1e3 * t);
    return e.getFullYear() + "-" + a(e.getMonth() + 1, 2) + "-" + a(e.getDate(), 2) + " " + a(e.getHours(), 2) + ":" + a(e.getMinutes(), 2) + ":" + a(e.getSeconds(), 2);
    function a(t, e) {
        for (var a = "" + t, n = a.length, i = "", r = e; r-- > n; ) i += "0";
        return i + a;
    }
}), _defineProperty(_Page, "thumbs_up", function(t) {
    var a = this, n = a.data.seller, i = t.currentTarget.dataset.id, r = wx.getStorageSync("users").id, e = (Number(t.currentTarget.dataset.num), 
    function(e) {
        n[e].tz.id == i && (n[e].thumbs_up = !0, app.util.request({
            url: "entry/wxapp/Like",
            cachetime: "0",
            data: {
                information_id: i,
                user_id: r
            },
            success: function(t) {
                1 != t.data ? wx.showModal({
                    title: "提示",
                    content: "不能重复点赞",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确认",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }) : (n[e].tz.givelike = Number(n[e].tz.givelike) + 1, a.setData({
                    seller: n
                }));
            }
        }));
    });
    for (var o in n) e(o);
}), _defineProperty(_Page, "previewImage", function(t) {
    console.log(t);
    var e = t.currentTarget.dataset.id, a = this.data.url, n = [], i = t.currentTarget.dataset.inde, r = this.data.seller;
    for (var o in r) if (r[o].tz.id == e) {
        var s = r[o].tz.img;
        for (var c in s) n.push(a + s[c]);
        wx.previewImage({
            current: a + s[i],
            urls: n
        });
    }
}), _defineProperty(_Page, "red", function(t) {
    wx.navigateTo({
        url: "../redbag/redbag",
        success: function(t) {},
        fail: function(t) {},
        complete: function(t) {}
    });
}), _defineProperty(_Page, "yellow_page", function(t) {
    wx.reLaunch({
        url: "../yellow_page/yellow"
    });
}), _defineProperty(_Page, "post1", function(t) {
    wx.switchTab({
        url: "../fabu/fabu/fabu"
    });
}), _defineProperty(_Page, "store_info", function(t) {
    var e = t.currentTarget.id;
    wx.navigateTo({
        url: "../sellerinfo/sellerinfo?id=" + e,
        success: function(t) {},
        fail: function(t) {},
        complete: function(t) {}
    });
}), _defineProperty(_Page, "notice", function(t) {
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
        url: "../notice/notice?id=" + e,
        success: function(t) {},
        fail: function(t) {},
        complete: function(t) {}
    });
}), _defineProperty(_Page, "post", function(t) {
    wx, wx.reLaunch({
        url: "../shun/shun",
        success: function(t) {},
        fail: function(t) {},
        complete: function(t) {}
    });
}), _defineProperty(_Page, "phone", function(t) {
    var e = t.currentTarget.dataset.id;
    wx.makePhoneCall({
        phoneNumber: e
    });
}), _defineProperty(_Page, "more", function(t) {
    wx.switchTab({
        url: "../store/store",
        success: function(t) {},
        fail: function(t) {},
        complete: function(t) {}
    });
}), _defineProperty(_Page, "jump", function(t) {
    var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name;
    wx.navigateTo({
        url: "../marry/marry?id=" + e + "&name=" + a,
        success: function(t) {},
        fail: function(t) {},
        complete: function(t) {}
    });
}), _defineProperty(_Page, "see", function(t) {
    this.data.seller;
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
        url: "../infodetial/infodetial?id=" + e,
        success: function(t) {},
        fail: function(t) {},
        complete: function(t) {}
    });
}), _defineProperty(_Page, "formid_one", function(t) {
    console.log("搜集第一个formid"), console.log(t), app.util.request({
        url: "entry/wxapp/SaveFormid",
        cachetime: "0",
        data: {
            user_id: wx.getStorageSync("users").id,
            form_id: t.detail.formId,
            openid: wx.getStorageSync("openid")
        },
        success: function(t) {}
    });
}), _defineProperty(_Page, "onReady", function() {
    this.setData({
        first: 1
    });
}), _defineProperty(_Page, "onShow", function() {}), _defineProperty(_Page, "onHide", function() {}), 
_defineProperty(_Page, "onUnload", function() {
    wx.removeStorageSync("city_type");
}), _defineProperty(_Page, "onPullDownRefresh", function() {
    this.setData({
        page: 1,
        seller: [],
        refresh_top: !1
    }), this.refresh(), this.seller(), wx.stopPullDownRefresh();
}), _defineProperty(_Page, "onReachBottom", function() {
    0 == this.data.refresh_top && this.seller();
}), _defineProperty(_Page, "onShareAppMessage", function() {}), _Page));