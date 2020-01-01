var app = getApp();

Page({
    data: {
        djss: !1,
        luntext: [ "附近", "新入", "热门" ],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 35,
        currentTab: 0,
        swiperCurrent: 0,
        indicatorDots: !1,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3,
        circular: !0,
        refresh_top: !1,
        star: [ {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        } ],
        star1: [ {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/star_none.png"
        } ],
        star2: [ {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/star_none.png"
        } ],
        star3: [ {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/star_none.png"
        } ],
        star4: [ {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/Robot/images/star_none.png"
        } ]
    },
    hddb: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
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
    tabClick: function(t) {
        var a = t.currentTarget.id;
        console.log(this.data, this.data.business, a);
        this.data.business;
        this.setData({
            refresh_top: !1,
            page: 1,
            type: parseInt(a) + 1,
            business: [],
            activeIndex: t.currentTarget.id
        }), this.refresh();
    },
    redinfo: function(t) {
        var a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/MyDistribution",
            cachetime: "0",
            data: {
                user_id: a
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
        var a = this, e = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid), n = t.currentTarget.dataset.src, i = (t.currentTarget.dataset.wb_src, 
        t.currentTarget.dataset.id), s = t.currentTarget.dataset.sjtype, r = t.currentTarget.dataset.type;
        if (1 == r) {
            if (console.log(n), "../distribution/jrhhr" == n) return a.redinfo(), !1;
            wx.navigateTo({
                url: n,
                success: function(t) {
                    a.setData({
                        averdr: !0
                    });
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        } else 2 == r ? wx.navigateTo({
            url: "../car/car?vr=" + i + "&sjtype=" + s,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 3 == r && wx.navigateToMiniProgram({
            appId: e,
            path: "",
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(t) {
                a.setData({
                    averdr: !0
                });
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        app.pageOnLoad(this), app.setNavigationBarColor(this), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight
                });
            }
        }), a.setData({
            store_name: wx.getStorageSync("System").link_name,
            msgList1: wx.getStorageSync("msgList1"),
            System: wx.getStorageSync("System"),
            userinfo: wx.getStorageSync("users")
        }), app.getLocation(function(t) {
            console.log(t), a.setData({
                lat: t.latitude,
                lng: t.longitude
            }), a.refresh();
        }), a.reload();
    },
    reload: function(t) {
        var s = this, a = wx.getStorageSync("url");
        s.setData({
            url: a
        }), app.util.request({
            url: "entry/wxapp/StoreType",
            cachetime: "0",
            success: function(t) {
                var a = t.data;
                a.length <= 5 ? s.setData({
                    height: 165
                }) : 5 < a.length && s.setData({
                    height: 340
                });
                for (var e = [], n = 0, i = a.length; n < i; n += 10) e.push(a.slice(n, n + 10));
                s.setData({
                    nav: e
                });
            }
        });
        var e = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: e
            },
            success: function(t) {
                var a = [];
                for (var e in t.data) 2 == t.data[e].type && a.push(t.data[e]);
                s.setData({
                    slide: a
                });
            }
        });
    },
    refresh: function() {
        var n = this, t = wx.getStorageSync("city"), e = n.data.page || 1, a = n.data.type || 1, i = n.data.business || [];
        console.log("城市为" + t, e, a, i), app.util.request({
            url: "entry/wxapp/StoreList",
            cachetime: "0",
            data: {
                type: a,
                lat: n.data.lat,
                lng: n.data.lng,
                page: e,
                cityname: t
            },
            success: function(t) {
                for (var a in console.log(t), t.data) t.data[a].distance = (parseFloat(t.data[a].juli) / 1e3).toFixed(2), 
                t.data[a].ad = t.data[a].ad.split(",");
                0 == t.data.length ? (n.setData({
                    refresh_top: !0
                }), 1 == e && n.setData({
                    store: [],
                    business: [],
                    fjpx: [],
                    store1: []
                })) : (n.setData({
                    page: e + 1,
                    refresh_top: !1
                }), i = i.concat(t.data), n.setData({
                    store: i,
                    business: i
                }));
            }
        }), app.util.request({
            url: "entry/wxapp/news",
            cachetime: "0",
            data: {
                cityname: t
            },
            success: function(t) {
                var a = [];
                for (var e in t.data) 2 == t.data[e].type && a.push(t.data[e]);
                n.setData({
                    msgList: a
                });
            }
        });
    },
    sellted: function(t) {
        wx.navigateTo({
            url: "../settled/settled",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    store: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    notice: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../notice/notice?id=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    phone: function(t) {
        var a = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    store_type_id: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.name;
        wx.navigateTo({
            url: "business?id=" + a + "&typename=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    bindinput: function(t) {
        var a = t.detail.value;
        this.setData({
            value: a
        });
    },
    sqss: function() {
        this.setData({
            djss: !1
        });
    },
    search: function(t) {
        var a = this.data.value, e = this;
        console.log(a), e.setData({
            ssjgarr: [],
            djss: !1
        }), "" != a ? app.util.request({
            url: "entry/wxapp/StoreList",
            cachetime: "0",
            data: {
                keywords: a,
                page: 1,
                pagesize: 50
            },
            success: function(t) {
                console.log(t), e.setData({
                    djss: !0,
                    ssjgarr: t.data
                });
            }
        }) : wx.showToast({
            title: "请输入内容",
            icon: "loading"
        });
    },
    onReady: function() {
        this.setData({
            first: 1
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload(), this.setData({
            page: 1,
            business: [],
            store: []
        });
        var a = this;
        app.getLocation(function(t) {
            console.log(t), a.setData({
                lat: t.latitude,
                lng: t.longitude
            }), a.refresh();
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        0 == this.data.refresh_top && this.refresh();
    },
    onShareAppMessage: function() {}
});