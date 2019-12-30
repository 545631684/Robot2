var interval, app = getApp(), screenWidth = 0, screenHeight = 0, screenWidth1 = 0, screenHeight1 = 0, screenWidth2 = 0, screenHeight2 = 0;

Page({
    data: {
        activeIndex: 0,
        activeIndex2: 0,
        sliderOffset: 0,
        sliderLeft: 15,
        comments: !1,
        wechat: !1,
        share: !1,
        tabs2: [ "商家详情" ],
        tabs3: [],
        star: [ {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        } ],
        star1: [ {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        } ],
        index: 0,
        swiperCurrent: 0,
        marqueePace: 1,
        marqueeDistance: 0,
        marquee_margin: 30,
        size: 14,
        interval: 20,
        hydl: !1,
        inputShowed: !1,
        inputVal: ""
    },
    showInput: function() {
        this.setData({
            inputShowed: !0
        });
    },
    hideInput: function() {
        this.setData({
            inputVal: "",
            inputShowed: !1
        });
    },
    clearInput: function() {
        this.setData({
            inputVal: "",
            ssjgarr: []
        });
    },
    inputTyping: function(t) {
        this.setData({
            inputVal: t.detail.value
        });
    },
    search: function(t) {
        var e = this.data.inputVal, a = this;
        console.log(e), a.setData({
            ssjgarr: []
        }), "" != e ? app.util.request({
            url: "entry/wxapp/GoodList",
            cachetime: "0",
            data: {
                keywords: e,
                store_id: a.data.id
            },
            success: function(t) {
                console.log(t), a.setData({
                    ssjgarr: t.data
                }), 0 == t.data.length && wx.showToast({
                    title: "无此商品",
                    icon: "loading"
                });
            }
        }) : wx.showToast({
            title: "请输入内容",
            icon: "loading"
        });
    },
    updateUserInfo: function(t) {
        console.log(t), "getUserInfo:ok" == t.detail.errMsg && (this.setData({
            hydl: !1
        }), this.getuserinfo());
    },
    getuserinfo: function() {
        var n = this;
        wx.login({
            success: function(t) {
                var e = t.code;
                wx.setStorageSync("code", e), console.log(t), wx.getSetting({
                    success: function(t) {
                        console.log(t), t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                            success: function(t) {
                                wx.setStorageSync("user_info", t.userInfo);
                                var s = t.userInfo.nickName, i = t.userInfo.avatarUrl;
                                n.setData({
                                    user_name: s
                                }), console.log("用户名字"), console.log(t.userInfo.nickName), console.log("用户头像"), 
                                console.log(t.userInfo.avatarUrl), app.util.request({
                                    url: "entry/wxapp/openid",
                                    cachetime: "0",
                                    data: {
                                        code: e
                                    },
                                    success: function(t) {
                                        wx.setStorageSync("key", t.data.session_key);
                                        var e = i, a = s;
                                        wx.setStorageSync("openid", t.data.openid);
                                        var o = t.data.openid;
                                        console.log("这是用户的openid"), console.log(o), app.util.request({
                                            url: "entry/wxapp/Login",
                                            cachetime: "0",
                                            data: {
                                                openid: o,
                                                img: e,
                                                name: a
                                            },
                                            success: function(t) {
                                                console.log("这是用户的登录信息"), console.log(t), wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid), 
                                                n.setData({
                                                    user_id: t.data.id,
                                                    user_info: t.data
                                                }), n.reload();
                                            }
                                        });
                                    }
                                });
                            }
                        }) : (console.log("未授权过"), n.setData({
                            hydl: !0
                        }));
                    }
                });
            }
        });
    },
    comments1: function(t) {
        0 == this.data.wechat ? this.setData({
            wechat: !0
        }) : this.setData({
            wechat: !1
        });
    },
    comments2: function(t) {
        0 == this.data.share ? this.setData({
            share: !0
        }) : this.setData({
            share: !1
        });
    },
    more: function(t) {
        var e = this.data.id;
        wx.navigateTo({
            url: "shop?store_id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    goods_info: function(t) {
        var e = this.data.id, a = t.currentTarget.id;
        wx.navigateTo({
            url: "good_info?id=" + a + "&store_id=" + e + "&logo=" + this.data.logo,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    previewImage: function(t) {
        var e = this.data.url, a = [], o = this.data.store.weixin_logo;
        a.push(e + this.data.store.weixin_logo), wx.previewImage({
            current: e + o,
            urls: a
        });
    },
    previewImage3: function(t) {
        var e = this.data.url, a = [], o = this.data.store.ewm_logo;
        a.push(e + this.data.store.ewm_logo), wx.previewImage({
            current: e + o,
            urls: a
        });
    },
    previewImage2: function(t) {
        this.data.url;
        var e = [];
        e.push(this.data.bath), wx.previewImage({
            urls: e
        });
    },
    previewImage1: function(t) {
        var e = this.data.url, a = [], o = t.currentTarget.id, s = this.data.store.images;
        for (var i in s) a.push(e + s[i]);
        wx.previewImage({
            current: e + s[o],
            urls: a
        });
    },
    tabClick2: function(t) {
        this.setData({
            sliderOffset2: t.currentTarget.offsetLeft,
            activeIndex2: t.currentTarget.id,
            tabname: t.currentTarget.dataset.tabname
        });
    },
    tabClick: function(t) {
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        });
    },
    Demonstration: function(t) {
        "" != this.data.store.vr_link && wx.navigateTo({
            url: "../car/car?sjid=" + this.data.id,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    swiperChange: function(t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    onLoad: function(t) {
        var s = this;
        wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    width: t.windowWidth,
                    height: t.windowHeight
                });
            }
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(t) {
                var e = t.data, a = [], o = s.data.tabs2;
                console.log(t, "1" != e.is_coupon || "1" != e.is_yhqqx), "1" == e.is_coupon && "1" == e.is_yhqqx && a.push("优惠券"), 
                "1" == e.is_xsqg && "1" == e.is_qgqx && a.push("限时抢购"), "1" == e.g_qx && "1" == e.g_open && a.push("拼团商品"), 
                1 == t.data.is_pl && o.push("用户评论"), s.setData({
                    system: t.data,
                    tabs3: a,
                    tabs2: o,
                    tabname: a[0]
                }), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.color
                });
            }
        });
        var e = decodeURIComponent(t.scene);
        if (app.getUrl(this), null == t.scene) {
            if (wx.getStorageSync("users")) var a = wx.getStorageSync("users"), o = wx.getStorageSync("users").id; else this.getuserinfo();
            var i = t.id;
        } else {
            i = e;
            this.getuserinfo();
        }
        app.util.request({
            url: "entry/wxapp/StoreCoupon",
            cachetime: "0",
            data: {
                store_id: i
            },
            success: function(t) {
                console.log(t);
                for (var e = 0; e < t.data.length; e++) t.data[e].rate = parseInt(100 * (1 - Number(t.data[e].surplus) / Number(t.data[e].number)));
                s.setData({
                    coupons: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/QgGoods",
            cachetime: "0",
            data: {
                type_id: "",
                store_id: i,
                page: 1,
                pagesize: 10,
                type: ""
            },
            success: function(t) {
                console.log("分页返回的列表数据", t.data);
                for (var e = 0; e < t.data.length; e++) t.data[e].discount = (Number(t.data[e].money) / Number(t.data[e].price) * 10).toFixed(1), 
                t.data[e].yqnum = ((Number(t.data[e].number) - Number(t.data[e].surplus)) / Number(t.data[e].number) * 100).toFixed(1);
                var a = [];
                a = function(t) {
                    for (var e = [], a = 0; a < t.length; a++) -1 == e.indexOf(t[a]) && e.push(t[a]);
                    return e;
                }(a = a.concat(t.data)), s.setData({
                    order_list: a
                }), console.log(a);
            }
        }), app.util.request({
            url: "entry/wxapp/GroupGoods",
            cachetime: "0",
            data: {
                store_id: i,
                type_id: "",
                page: 1,
                display: ""
            },
            success: function(t) {
                console.log("商品列表", t), s.setData({
                    group_list: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreCode",
            cachetime: "0",
            data: {
                store_id: i
            },
            success: function(t) {
                s.setData({
                    bath: t.data
                }), s.reload();
            }
        }), s.setData({
            id: i,
            user_id: o,
            user_info: a
        }), wx.getSystemInfo({
            success: function(t) {
                var e = t.windowWidth, a = t.windowHeight;
                s.setData({
                    sys_width: e,
                    sys_height: a
                });
            },
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    reload: function(t) {
        var u = this, l = u.data.star1, g = u.data.star;
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: u.data.id
            },
            success: function(t) {
                for (var e in console.log(t), t.data.star3 = g, t.data.store[0].img1 = t.data.store[0].ad.split(","), 
                t.data.store[0].images = t.data.store[0].img.split(","), t.data.store[0].coordinates = t.data.store[0].coordinates.split(","), 
                t.data.store[0].star = l.slice(0, t.data.store[0].score), t.data.store[0].details = t.data.store[0].details.replace(/↵/g, "\n"), 
                t.data.pl) t.data.pl[e].score = parseInt(t.data.pl[e].score);
                var a = Number(t.data.store[0].score), o = "../image/xing.png";
                0 == (a = parseInt(a)) ? t.data.star3 = u.data.star1 : 1 == a ? t.data.star3[0].img = o : 2 == a ? (t.data.star3[0].img = o, 
                t.data.star3[1].img = o) : 3 == a ? (t.data.star3[0].img = o, t.data.star3[1].img = o, 
                t.data.star3[2].img = o) : 4 == a ? (t.data.star3[0].img = o, t.data.star3[1].img = o, 
                t.data.star3[2].img = o, t.data.star3[3].img = o) : 5 == a && (t.data.star3[0].img = o, 
                t.data.star3[1].img = o, t.data.star3[2].img = o, t.data.star3[3].img = o, t.data.star3[4].img = o), 
                u.setData({
                    score: a,
                    star3: t.data.star3
                }), app.util.request({
                    url: "entry/wxapp/IsCollection",
                    cachetime: "0",
                    data: {
                        store_id: u.data.id,
                        user_id: u.data.user_id
                    },
                    success: function(t) {
                        1 == t.data ? u.setData({
                            Collection: !0
                        }) : u.setData({
                            Collection: !1
                        });
                    }
                }), wx.setNavigationBarTitle({
                    title: t.data.store[0].store_name
                });
                var s = t.data.store[0], i = u.data.url;
                console.log(i), console.log(u.data.bath);
                var n = i + s.logo;
                if ("" == s.ewm_logo || null == s.ewm_logo) var r = u.data.bath; else r = i + s.ewm_logo;
                console.log(n), console.log(r), wx.downloadFile({
                    url: n,
                    success: function(t) {
                        console.log(t), u.setData({
                            logo: t.tempFilePath
                        }), wx.downloadFile({
                            url: r,
                            success: function(t) {
                                console.log(t), u.setData({
                                    logo1: t.tempFilePath
                                }), u.ctx();
                            }
                        });
                    }
                }), u.setData({
                    store: t.data.store[0],
                    comment: t.data.pl
                });
                var c = t.data.store[0].details.length * u.data.size, d = wx.getSystemInfoSync().windowWidth;
                console.log(c, d), u.setData({
                    length: c,
                    windowWidth: d
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreGoodList",
            cachetime: "0",
            data: {
                store_id: u.data.id
            },
            success: function(t) {
                for (var e in console.log(t), t.data) t.data[e].imgs = t.data[e].imgs.split(",")[0], 
                t.data[e].lb_imgs = t.data[e].lb_imgs.split(",");
                var a = [];
                for (var o in t.data) 1 == t.data[o].is_show && a.push(t.data[o]);
                a = a.slice(0, 4);
                u.setData({
                    store_good: a
                });
            }
        });
    },
    formid_one: function(t) {
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
    },
    dizhi: function(t) {
        var e = Number(this.data.store.coordinates[0]), a = Number(this.data.store.coordinates[1]);
        wx.openLocation({
            latitude: e,
            longitude: a,
            name: this.data.store.store_name,
            address: this.data.store.address
        });
    },
    shouye: function(t) {
        wx.reLaunch({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    fabu: function(t) {
        wx.navigateTo({
            url: "../index/index",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    phone: function(t) {
        var e = this.data.store.tel;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    reply: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            comments: !0,
            relpay: !0,
            reflex_id: e
        });
    },
    star: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.star, o = "../image/xing.png", s = "../image/star_none.png";
        0 == e ? (a[0].img = o, a[1].img = s, a[2].img = s, a[3].img = s, a[4].img = s) : 1 == e ? (a[0].img = o, 
        a[1].img = o, a[2].img = s, a[3].img = s, a[4].img = s) : 2 == e ? (a[0].img = o, 
        a[1].img = o, a[2].img = o, a[3].img = s, a[4].img = s) : 3 == e ? (a[0].img = o, 
        a[1].img = o, a[2].img = o, a[3].img = o, a[4].img = s) : 4 == e && (a[0].img = o, 
        a[1].img = o, a[2].img = o, a[3].img = o, a[4].img = o), this.setData({
            index: e + 1,
            star: a
        });
    },
    Collection: function(t) {
        var e = this, a = e.data.id, o = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/Collection",
            cachetime: "0",
            data: {
                store_id: a,
                user_id: o
            },
            success: function(t) {
                1 == t.data ? (e.setData({
                    Collection: !0
                }), wx.showToast({
                    title: "收藏成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                })) : (wx.showToast({
                    title: "取消收藏成功",
                    icon: "fail",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), e.setData({
                    Collection: !1
                }));
            }
        });
    },
    textarea: function(t) {
        var e = t.detail.value;
        this.setData({
            value: e
        });
    },
    comments: function(t) {
        var e = this, a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                1 == t.data.state ? e.setData({
                    comments: !0,
                    relpay: !1
                }) : wx.showModal({
                    title: "提示",
                    content: "您的账号异常，请尽快联系管理员",
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "",
                    confirmText: "确定",
                    confirmColor: "",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                });
            }
        });
    },
    formid_three: function(t) {
        app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: t.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {}
        });
        this.setData({
            comments: !1
        });
    },
    settled: function(t) {
        wx.navigateTo({
            url: "../settled/settled"
        });
    },
    formid_two: function(t) {
        console.log("点击完成评论"), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: t.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(t) {}
        });
        var e = this, a = e.data.index, o = e.data.value, s = e.data.id, i = wx.getStorageSync("users").id, n = e.data.reflex_id;
        var r, c, d, u = (r = new Date(), c = r.getMonth() + 1, d = r.getDate(), 1 <= c && c <= 9 && (c = "0" + c), 
        0 <= d && d <= 9 && (d = "0" + d), r.getFullYear() + "-" + c + "-" + d + " " + r.getHours() + ":" + r.getMinutes() + ":" + r.getSeconds());
        null == o || "" == o ? wx.showModal({
            title: "提示",
            content: "请输入评论的内容",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 0 == e.data.relpay ? 0 == a ? wx.showModal({
            title: "提示",
            content: "小主，给个评分吧",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : app.util.request({
            url: "entry/wxapp/StoreComments",
            cachetime: "0",
            data: {
                store_id: s,
                user_id: i,
                details: o,
                score: a
            },
            success: function(t) {
                console.log("评论完成"), console.log(t), e.setData({
                    comments: !1
                }), wx.showToast({
                    title: "发表成功",
                    icon: "",
                    image: "",
                    duration: 2e3,
                    mask: !0,
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                }), setTimeout(function() {
                    e.reload();
                }, 2e3);
                var i = t.data;
                app.util.request({
                    url: "entry/wxapp/GetFormid",
                    cachetime: "0",
                    data: {
                        user_id: e.data.store.user_id
                    },
                    success: function(t) {
                        console.log("搜索form_id"), console.log(t);
                        var e, a, o = [];
                        for (var s in t.data) t.data[s].hours = t.data[s].time.slice(10, 19), t.data[s].time = (t.data[s].time, 
                        a = e = void 0, e = new Date(), (a = new Date(e)).setDate(e.getDate() + 7), a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate() + t.data[s].hours), 
                        u <= t.data[s].time ? o.push(t.data[s]) : app.util.request({
                            url: "entry/wxapp/DelFormid",
                            cachetime: "0",
                            data: {
                                user_id: t.data[s].id,
                                form_id: t.data[s].form_id
                            },
                            success: function(t) {
                                console.log("删除form_id"), console.log(t);
                            }
                        });
                        app.util.request({
                            url: "entry/wxapp/StorehfMessage",
                            cachetime: "0",
                            data: {
                                pl_id: i,
                                form_id: o[0].form_id,
                                user_id: o[0].user_id,
                                openid: o[0].openid
                            },
                            success: function(t) {
                                console.log("发送模板消息"), console.log(t), app.util.request({
                                    url: "entry/wxapp/DelFormid",
                                    cachetime: "0",
                                    data: {
                                        form_id: o[0].form_id,
                                        user_id: o[0].user_id
                                    },
                                    success: function(t) {
                                        console.log("删除已经使用的模板消息"), console.log(t);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }) : app.util.request({
            url: "entry/wxapp/reply",
            cachetime: "0",
            data: {
                id: n,
                reply: o
            },
            success: function(t) {
                1 == t.data && (e.setData({
                    reply: !1,
                    comments: !1
                }), e.reload());
            }
        });
    },
    onReady: function() {},
    ctx: function(t) {
        var e = this, a = e.data, o = (a.width, a.height, wx.createCanvasContext("ctx"));
        o.drawImage(a.logo1, 0, 0, 150, 150), o.save(), o.beginPath(), o.arc(75, 75, 35, 0, 2 * Math.PI), 
        o.clip(), o.drawImage(a.logo, 35, 35, 75, 75), o.restore(), o.draw(), setTimeout(function(t) {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 150,
                height: 150,
                canvasId: "ctx",
                success: function(t) {
                    console.log(t.tempFilePath), e.setData({
                        logos: t.tempFilePath
                    });
                }
            });
        }, 500);
    },
    previewImage_logo: function(t) {
        var e = [];
        e.push(this.data.logos), wx.previewImage({
            current: this.data.logos,
            urls: e
        });
    },
    onShow: function() {},
    scrolltxt: function() {
        var a = this, o = a.data.length, s = a.data.windowWidth;
        interval = setInterval(function() {
            console.log("interval");
            var t = o + s, e = a.data.marqueeDistance;
            e < t ? a.setData({
                marqueeDistance: e + a.data.marqueePace
            }) : (a.setData({
                marqueeDistance: 0
            }), clearInterval(interval), a.scrolltxt());
        }, a.data.interval);
    },
    onHide: function() {},
    onUnload: function() {
        clearInterval(interval);
    },
    onPullDownRefresh: function() {
        this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var e = this, t = wx.getStorageSync("users").id, a = e.data.store.store_name, o = e.data.store.id;
        return app.util.request({
            url: "entry/wxapp/StoreFxNum",
            cachetime: "0",
            data: {
                store_id: o
            },
            success: function(t) {
                e.reload();
            }
        }), {
            title: a,
            path: "/zh_tcwq/pages/sellerinfo/sellerinfo?user_id=" + t + "&id=" + o + "&type=1",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});