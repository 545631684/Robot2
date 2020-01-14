var qqmapsdk, app = getApp(), Data = require("../../utils/util.js"), QQMapWX = require("../../../utils/qqmap-wx-jssdk.js");

Page({
    data: {
        activeIndex: 0,
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
        seller: [],
        store1: [],
        yellow_list: [],
        pc: [],
        hdlist: [],
        zxlist: [],
        page: 1,
        star: [ {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        } ],
        star1: [ {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/star_none.png"
        } ],
        star2: [ {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/star_none.png"
        } ],
        star3: [ {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/star_none.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/star_none.png"
        } ],
        star4: [ {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/xing.png"
        }, {
            img: "https://wechat.ql888.net/attachment/DDimage/star_none.png"
        } ],
        newslist:[
          [
            { icon: "/zh_tcwq/images/icon1.png", 
            news:"这是一条消息内容展示提示，庆祝2020年新年快乐，财源滚滚，一帆风顺，笑口常开",
            imgs: ["/zh_tcwq/images/img1.png", "/zh_tcwq/images/img2.png", "/zh_tcwq/images/img3.png", "/zh_tcwq/images/img4.png"]
            },
            {
              icon: "/zh_tcwq/images/icon1.png",
              news: "这是一条消息内容展示提示，庆祝2020年新年快乐，财源滚滚，一帆风顺，笑口常开",
              imgs: ["/zh_tcwq/images/img1.png", "/zh_tcwq/images/img2.png", "/zh_tcwq/images/img3.png", "/zh_tcwq/images/img4.png"]
            }
          ],
          ]
    },
    updateUserInfo: function(t) {
        console.log(t), "getUserInfo:ok" == t.detail.errMsg && (this.setData({
            hydl: !1
        }), this.reload());
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
    jumps: function(t) {
        var e = this, a = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid), n = t.currentTarget.dataset.src, i = t.currentTarget.dataset.id, s = t.currentTarget.dataset.sjtype;
        console.log(i, s);
        var o = t.currentTarget.dataset.type;
        if (1 == o) {
            if (console.log(n), "../distribution/jrhhr" == n) return e.redinfo(), !1;
            if ("../store/store" == n) return wx.reLaunch({
                url: "../store/store"
            }), !1;
            if ("../fabu/fabu/fabu" == n) return wx.reLaunch({
                url: "../fabu/fabu/fabu"
            }), !1;
            if ("../logs/logs" == n) return wx.reLaunch({
                url: "../logs/logs"
            }), !1;
            if ("../type/type" == n) return wx.reLaunch({
                url: "../type/type"
            }), !1;
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
            url: "../car/car?vr=" + i + "&sjtype=" + s,
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
    settled: function(t) {
        wx.navigateTo({
            url: "../settled/settled"
        });
    },
    newlist: function(arr) {
      let items=[],len = arr.length,num = len%2==0?len/2:Math.floor(len/2)+1;
      for(let i=0;i<num;i++){
        let temp = arr.slice(i*2,i*2+2)
        items.push(temp)
      }
      this.setData({
        newslist:items
      })
    },
    fenliexinxi(){
        wx.navigateTo({
          url: '/zh_tcwq/pages/type/type',
        })
    },
    onLoad: function(t) {
        app.setNavigationBarColor(this), app.pageOnLoad(this), console.log("onLoad"), console.log(t);
        var e = decodeURIComponent(t.scene);
        if (console.log("scene", e), "undefined" != e) var a = e;
        if (null != t.userid) {
            console.log("转发获取到的userid:", t.userid);
            a = t.userid;
        }
        console.log("fxzuid", a), this.setData({
            fxzuid: a
        });
        var n = this;
        app.util.request({
            url: "entry/wxapp/System",
            cachetime: "30",
            success: function(t) {
                console.log(t), wx.setStorageSync("color", t.data.color), 1e4 < Number(t.data.total_num) && (t.data.total_num = (Number(t.data.total_num) / 1e4).toFixed(2) + "万"), 
                n.setData({
                    System: t.data
                });
            }
        }), 
        wx.getSystemInfo({
            success: function(t) {
                n.setData({
                    windowHeight: t.windowHeight
                }), console.log(t);
            }
        }), 
        // app.util.request({
        //     url: "entry/wxapp/Url2",
        //     cachetime: "0",
        //     success: function(t) {
        //         wx.setStorageSync("url2", t.data);
        //     }
        // }), 
        // app.util.request({
        //     url: "entry/wxapp/Llz",
        //     cachetime: "0",
        //     data: {
        //         cityname: wx.getStorageSync("city"),
        //         type: 2
        //     },
        //     success: function(t) {
        //         console.log(t), n.setData({
        //             unitid: t.data
        //         });
        //     }
        // }), 
        app.getUrl(this), 
        n.seller()
        this.reload();
      this.gitIndexData();
      console.log("sdasdasdasd")
      console.log(this.data.seller)
    },
    gitIndexData: function(){
      let s = this
      // app.util.request({
      //   url: "entry/wxapp/StoreCoupon",
      //   cachetime: "0",
      //   success: function (t) {
      //     console.log(t,"门店")
      //   }
      // })
      app.util.request({
        url: "entry/wxapp/AllCoupon",
        cachetime: "0",
        success: function (t) {
          for (var e = 0; e < t.data.length; e++) t.data[e].rate = parseInt(100 * (1 - Number(t.data[e].surplus) / Number(t.data[e].number)));
          s.setData({
            coupons: t.data
          });
        }
      })
      app.util.request({
        url: "entry/wxapp/JfGoods",
        cachetime: "0",
        success: function (t) {
          s.setData({
            commodity: t.data
          });
        }
      })
      this.hdbmbk()
    },
    yhjPage: function(){
      wx.reLaunch({
        url: "../wdq/yhqzx"
      });
    },
    jifenshangc: function(){
      wx.reLaunch({
        url: "../integral/integral"
      });
    },
    interinfo: function (t) {
      wx.navigateTo({
        url: "../integral/integralinfo/integralinfo?id=" + t.currentTarget.id
      });
    },
    reload: function(t) {
        var c = this, a = this.data.fxzuid;
        console.log(a), wx.login({
            success: function(t) {
                var e = t.code;
                wx.setStorageSync("code", e), app.util.request({
                    url: "entry/wxapp/openid",
                    cachetime: "0",
                    data: {
                        code: e
                    },
                    success: function(t) {
                        console.log(t), wx.setStorageSync("key", t.data.session_key), wx.setStorageSync("openid", t.data.openid);
                        var e = t.data.openid;
                        app.util.request({
                            url: "entry/wxapp/Login",
                            cachetime: "0",
                            data: {
                                openid: e
                            },
                            success: function(t) {
                                console.log(t), c.setData({
                                    userinfo: t.data
                                }), wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid), 
                                null != a && app.util.request({
                                    url: "entry/wxapp/Binding",
                                    cachetime: "0",
                                    data: {
                                        fx_user: t.data.id,
                                        user_id: a
                                    },
                                    success: function(t) {
                                        console.log(t);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }), wx.getLocation({
            type: "wgs84",
            success: function(t) {
                wx.setStorageSync("Location", t);
                var e = t.latitude + "," + t.longitude;
                app.util.request({
                    url: "entry/wxapp/map",
                    cachetime: "0",
                    data: {
                        op: e
                    },
                    success: function(i) {
                        console.log(i), app.util.request({
                            url: "entry/wxapp/System",
                            cachetime: "30",
                            success: function(t) {
                                console.log(t);
                                var a = t.data;
                                "1" == t.data.dw_more && c.setData({
                                    dwcity: i.data.result.address_component.district
                                }), "2" == t.data.dw_more && c.setData({
                                    dwcity: i.data.result.address_component.city
                                }), wx.setStorageSync("System", t.data), 1 == t.data.many_city ? (wx.setStorageSync("city", t.data.cityname), 
                                c.setData({
                                    city: t.data.cityname
                                })) : (console.log(wx.getStorageSync("city_type")), 1 != wx.getStorageSync("city_type") ? (wx.setStorageSync("city", c.data.dwcity), 
                                c.setData({
                                    city: c.data.dwcity
                                })) : (c.setData({
                                    city: wx.getStorageSync("city")
                                }), console.log("choosecity")));
                                var e = wx.getStorageSync("city");
                                c.refresh(), console.log(e), "1" == t.data.is_city ? wx.setNavigationBarTitle({
                                    // title: e + " " + t.data.pt_name
                                    title: t.data.pt_name
                                }) : wx.setNavigationBarTitle({
                                    title: t.data.pt_name
                                });
                                var n = t.data.gd_key;
                                "" == n && wx.showModal({
                                    title: "配置提示",
                                    content: "请在后台配置高德地图的key",
                                    showCancel: !0,
                                    cancelText: "取消",
                                    confirmText: "确定",
                                    success: function(t) {},
                                    fail: function(t) {},
                                    complete: function(t) {}
                                }), new (require("../amap-wx.js").AMapWX)({
                                    key: n
                                }).getWeather({
                                    success: function(t) {
                                        var e, a, n = t.liveData.city, i = t.liveData.weather, s = t.liveData.reporttime.slice(0, 10), o = (0 == (e = new Date(s)).getDay() && (a = "星期日"), 
                                        1 == e.getDay() && (a = "星期一"), 2 == e.getDay() && (a = "星期二"), 3 == e.getDay() && (a = "星期三"), 
                                        4 == e.getDay() && (a = "星期四"), 5 == e.getDay() && (a = "星期五"), 6 == e.getDay() && (a = "星期六"), 
                                        a), r = t.temperature.data;
                                        c.setData({
                                            area: n,
                                            reporttime: s,
                                            weather: i,
                                            w1: o,
                                            temperature: r
                                        });
                                    },
                                    fail: function(t) {}
                                }), app.util.request({
                                    url: "entry/wxapp/GetPlate",
                                    cachetime: "0",
                                    success: function(t) {
                                        if (console.log(t), 0 != t.data.length && t.data) {
                                            "1" == (e = t.data)[0].type && c.seller(), "2" == e[0].type && c.sjbk(), "3" == e[0].type && c.hybk(), 
                                            "4" == e[0].type && c.sfcbk(), "5" == e[0].type && c.hdbmbk(), "6" == e[0].type && c.zxbk();
                                        } else {
                                            var e = [ {
                                                type: "1",
                                                 name: "最新资讯"
                                            } ];
                                             "1" == a.is_sjrz && e.push({
                                                type: "2",
                                                name: "热门商家"
                                            }), "1" == a.is_pageopen && "1" == a.is_hyqx && e.push({
                                                type: "3",
                                                name: "黄页114"
                                            }), "1" == a.is_pcfw && "1" == a.is_pcqx && e.push({
                                                type: "4",
                                                name: "顺风车"
                                            }), "1" == a.is_hd && "1" == a.is_hdqx && e.push({
                                                type: "5",
                                                name: "活动报名"
                                            }), e.push({
                                                type: "6",
                                              name: "碧享优惠"
                                            }), c.seller();
                                        }
                                        c.setData({
                                            bkname: e[0].type,
                                            bkarr: e
                                        }), console.log(e);
                                    }
                                }), app.util.request({
                                    url: "entry/wxapp/SaveHotCity",
                                    cachetime: "0",
                                    data: {
                                        cityname: e,
                                        user_id: wx.getStorageSync("users").id
                                    },
                                    success: function(t) {
                                        console.log(t);
                                    }
                                });
                            }
                        });
                    }
                });
            },
            fail: function(t) {
                app.util.request({
                    url: "entry/wxapp/System",
                    cachetime: "0",
                    success: function(t) {
                        console.log(t);
                        var e = t.data.gd_key;
                        "" == e && wx.showModal({
                            title: "配置提示",
                            content: "请在后台配置高德地图的key",
                            showCancel: !0,
                            cancelText: "取消",
                            confirmText: "确定",
                            success: function(t) {},
                            fail: function(t) {},
                            complete: function(t) {}
                        }), new (require("../amap-wx.js").AMapWX)({
                            key: e
                        }).getWeather({
                            success: function(t) {
                                var e, a, n = t.liveData.city, i = t.liveData.weather, s = t.liveData.reporttime.slice(0, 10), o = (0 == (e = new Date(s)).getDay() && (a = "星期日"), 
                                1 == e.getDay() && (a = "星期一"), 2 == e.getDay() && (a = "星期二"), 3 == e.getDay() && (a = "星期三"), 
                                4 == e.getDay() && (a = "星期四"), 5 == e.getDay() && (a = "星期五"), 6 == e.getDay() && (a = "星期六"), 
                                a), r = t.temperature.data;
                                c.setData({
                                    area: n,
                                    reporttime: s,
                                    weather: i,
                                    w1: o,
                                    temperature: r
                                });
                            },
                            fail: function(t) {}
                        });
                        var a = [ "最新信息" ];
                        "1" == t.data.is_sjrz && a.push("热门商家"), "1" == t.data.is_pageopen && "1" == t.data.is_hyqx && a.push("黄页114"), 
                        "1" == t.data.is_pcfw && "1" == t.data.is_pcqx && a.push("顺风车"), "1" == t.data.is_hd && "1" == t.data.is_hdqx && a.push("活动报名"), 
                        console.log(a), wx.setStorageSync("System", t.data), wx.setStorageSync("city", t.data.cityname), 
                        c.setData({
                            city: t.data.cityname
                        });
                        var n = wx.getStorageSync("city");
                        console.log(n), c.setData({
                            bkarr: a
                        }), c.refresh(), c.seller();
                    }
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Views",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var e = t.data;
                "" == e ? e = 0 : 1e4 < Number(e) && (e = (Number(e) / 1e4).toFixed(2) + "万"), c.setData({
                    views: e
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Num",
            cachetime: "0",
            success: function(t) {
                c.setData({
                    Num: t.data
                });
            }
        });
    },
    refresh: function(t) {
        var o = this, e = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: e
            },
            success: function(t) {
                console.log(t);
                var e = [], a = [], n = [], i = [];
                for (var s in t.data) 1 == t.data[s].type && e.push(t.data[s]), 5 == t.data[s].type && a.push(t.data[s]), 
                7 == t.data[s].type && n.push(t.data[s]), 10 == t.data[s].type && i.push(t.data[s]);
                o.setData({
                    slide: e,
                    advert: a,
                    ggslide: n,
                    zjggbk: i
                });
            }
        }), app.util.request({
            url: "entry/wxapp/RmStore",
            cachetime: "0",
            data: {
                cityname: e
            },
            success: function(t) {
                t.data.length <= 5 ? o.setData({
                    store: t.data
                }) : o.setData({
                    store: t.data.slice(0, 10)
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
                for (var a in t.data) 1 == t.data[a].type && e.push(t.data[a]);
                o.setData({
                    msgList: e
                });
            }
        }), app.util.request({
            url: "entry/wxapp/GetNav",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var e = t.data;
                e.length <= 5 ? o.setData({
                    height: 150
                }) : 5 < e.length && o.setData({
                    height: 300
                });
                for (var a = [], n = 0, i = e.length; n < i; n += 10) a.push(e.slice(n, n + 10));
                o.setData({
                    nav: a,
                    navs: e
                });
            }
        });
    },
    sjbk: function() {
        var a = this, t = wx.getStorageSync("city");
        console.log("城市为" + t), console.log("page数量为" + a.data.page);
        var n = a.data.page, i = a.data.store1;
        app.util.request({
            url: "entry/wxapp/StoreList",
            cachetime: "0",
            data: {
                type: 1,
                lat: wx.getStorageSync("Location").latitude,
                lng: wx.getStorageSync("Location").longitude,
                page: n,
                cityname: t
            },
            success: function(t) {
                for (var e in console.log(t), t.data) t.data[e].distance = (parseFloat(t.data[e].juli) / 1e3).toFixed(2), 
                t.data[e].ad = t.data[e].ad.split(",");
                0 == t.data.length ? a.setData({
                    refresh_top: !0
                }) : (a.setData({
                    refresh_top: !1,
                    page: n + 1,
                    issljz: !0
                }), i = i.concat(t.data)), a.setData({
                    store1: i
                });
            }
        });
    },
    seller: function(t) {
        var o = this, e = (o.data.index_class, wx.getStorageSync("city")), a = "1" == o.data.activeIndex ? "1" : "2", r = o.data.page, c = o.data.seller;
        console.log(e, r, a), app.util.request({
            url: "entry/wxapp/list2",
            cachetime: "0",
            data: {
                page: o.data.page,
                cityname: e,
                fj_tz: a,
                lat: wx.getStorageSync("Location").latitude,
                lng: wx.getStorageSync("Location").longitude
            },
            success: function(t) {
                if (console.log(t.data), 0 == t.data.length) o.setData({
                    refresh_top: !0
                }); else {
                    o.setData({
                        refresh_top: !1,
                        page: r + 1,
                        issljz: !0
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
                        t.data[e].tz.time = a.slice(0, 16), Number(t.data[e].tz.juli) < 1e3 ? t.data[e].tz.juli = Number(t.data[e].tz.juli) + "m" : t.data[e].tz.juli = (Number(t.data[e].tz.juli) / 1e3).toFixed(2) + "km";
                    }
                    for (var n in c) {
                        for (var i in c[n].label) c[n].label[i].number = (void 0, s = "rgb(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ")", 
                        s);
                        o.setData({
                            seller: c
                        });
                    }
                } else o.setData({
                    seller: c
                });
                var s;
            }
        });
        o.newlist(o.data.seller)
    },
    hybk: function() {
        var a = this, t = (a.data.index_class, wx.getStorageSync("city")), n = (wx.getStorageSync("index"), 
        a.data.page), i = a.data.yellow_list;
        console.log(t), app.util.request({
            url: "entry/wxapp/YellowPageList",
            cachetime: "0",
            data: {
                type: 1,
                lat: wx.getStorageSync("Location").latitude,
                lng: wx.getStorageSync("Location").longitude,
                page: n,
                cityname: t
            },
            success: function(t) {
                if (console.log(t), 0 == t.data.length ? a.setData({
                    refresh_top: !0
                }) : (a.setData({
                    refresh_top: !1,
                    page: n + 1,
                    issljz: !0
                }), i = i.concat(t.data)), 0 < t.data.length) {
                    for (var e in t.data) t.data[e].distance = (parseFloat(t.data[e].juli) / 1e3).toFixed(2);
                    a.setData({
                        yellow_list: i
                    });
                } else a.setData({
                    yellow_list: i
                });
            }
        });
    },
    sfcbk: function() {
        var a = this, t = (a.data.index_class, wx.getStorageSync("city")), n = (wx.getStorageSync("index"), 
        a.data.page), i = a.data.pc;
        console.log(t), app.util.request({
            url: "entry/wxapp/CarList",
            cachetime: "0",
            data: {
                page: n,
                cityname: t
            },
            success: function(t) {
                if (console.log(t), 0 == t.data.length ? a.setData({
                    refresh_top: !0
                }) : (a.setData({
                    refresh_top: !1,
                    page: n + 1,
                    issljz: !0
                }), i = i.concat(t.data)), 0 < t.data.length) {
                    for (var e in t.data) t.data[e].tz.time = app.ormatDate(t.data[e].tz.time).slice(5, 16), 
                    t.data[e].tz.start_time1 = t.data[e].tz.start_time.slice(5, 10), t.data[e].tz.start_time2 = t.data[e].tz.start_time.slice(10, 17), 
                    2 == t.data[e].tz.is_open ? (t.data[e].tz.class2 = "car3", t.data[e].tz.class3 = "car4", 
                    t.data[e].tz.class4 = "car5") : (t.data[e].tz.class2 = "", t.data[e].tz.class3 = "", 
                    t.data[e].tz.class4 = ""), "人找车" == t.data[e].tz.typename ? (t.data[e].tz.class = "color1", 
                    t.data[e].tz.class1 = "car1") : "车找人" == t.data[e].tz.typename ? (t.data[e].tz.class = "color2", 
                    t.data[e].tz.class1 = "car2") : "货找车" == t.data[e].tz.typename ? (t.data[e].tz.class = "color1", 
                    t.data[e].tz.class1 = "car1") : "车找货" == t.data[e].tz.typename && (t.data[e].tz.class = "color2", 
                    t.data[e].tz.class1 = "car2");
                    a.setData({
                        pc: i
                    });
                } else a.setData({
                    pc: i
                });
            }
        });
    },
    hdbmbk: function(t) {
        var a = this, e = Data.formatTime(new Date()), n = Data.formatTime(new Date()).replace(/\//g, "-").toString();
        console.log(e, n);
        var i = wx.getStorageSync("city"), s = a.data.page, o = a.data.hdlist;
        console.log(i), app.util.request({
            url: "entry/wxapp/Activity",
            cachetime: "0",
            data: {
                type_id: "",
                page: s,
                pagesize: 10,
                cityname: i
            },
            success: function(t) {
                console.log(t.data,"活动报名"), 0 == t.data.length ? a.setData({
                    refresh_top: !0
                }) : a.setData({
                    refresh_top: !1,
                    page: s + 1,
                    issljz: !0
                }), o = function(t) {
                    for (var e = [], a = 0; a < t.length; a++) -1 == e.indexOf(t[a]) && e.push(t[a]);
                    return e;
                }(o = o.concat(t.data)), console.log(o,"**************/*/*/*//*/*//*/*//");
                for (var e = 0; e < o.length; e++) o[e].end_time > n ? o[e].isgq = 2 : o[e].isgq = 1;
                a.setData({
                    hdlist: o
                });
            }
        });
    },
    zxbk: function() {
        var c = this, l = Data.formatTime(new Date()), t = wx.getStorageSync("city"), u = c.data.zxlist;
        app.util.request({
            url: "entry/wxapp/ZxList",
            data: {
                page: c.data.page,
                cityname: t
            },
            success: function(t) {
                for (var e in console.log(t.data), 0 == t.data.length ? c.setData({
                    refresh_top: !0
                }) : c.setData({
                    refresh_top: !1,
                    page: c.data.page + 1,
                    issljz: !0
                }), t.data) {
                    t.data[e].time = t.data[e].time.slice(0, 16), null == t.data[e].img ? t.data[e].type = 1 : t.data[e].type = 2;
                    var a = l, n = t.data[e].time.replace(/-/g, "/"), i = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g, s = Math.abs(Date.parse(a.replace(i, "$2-$3-$1$4")) - Date.parse(n.replace(i, "$2-$3-$1$4"))) / 1e3, o = Math.floor(s / 3600), r = Math.floor(s % 3600 / 60);
                    t.data[e].m = o, t.data[e].h = r, console.log(o + " 小时 " + r + " 分钟"), t.data[e].imgs = t.data[e].imgs.split(",").slice(0, 3);
                }
                u = u.concat(t.data), c.setData({
                    zxlist: u
                });
            }
        });
    },
    bkswiperChange: function(t) {
        var e = this;
        console.log("===== swiperChange " + t.detail.current), e.setData({
            refresh_top: !1,
            activeIndex: t.detail.current
        });
        var a = e.data.bkarr[t.detail.current];
        console.log(a), "最新信息" == a && e.seller(), "热门商家" == a && e.sjbk(), "黄页114" == a && e.hybk(), 
        "顺风车" == a && e.sfcbk();
    },
    commend: function(t) {
        var e = this;
        t.currentTarget.dataset.index;
        var a = t.currentTarget.id, n = t.currentTarget.dataset.name;
        wx.setStorageSync("index", a), console.log(n), e.setData({
            index_class: !0,
            activeIndex: t.currentTarget.dataset.index,
            toView: "a" + (t.currentTarget.dataset.index - 1),
            bkname: n,
            refresh_top: !1,
            swipecurrent: t.currentTarget.id,
            seller: [],
            store1: [],
            yellow_list: [],
            pc: [],
            hdlist: [],
            zxlist: [],
            page: 1,
            issljz: !1
        }), "1" == n ? e.seller() : "2" == n ? e.sjbk() : "3" == n ? e.hybk() : "4" == n ? e.sfcbk() : "5" == n ? e.hdbmbk() : "6" == n && e.zxbk();
    },
    whole: function(t) {
        wx.removeStorage({
            key: "index",
            success: function(t) {}
        }), this.setData({
            page: 1,
            seller: [],
            index_class: !1
        }), this.seller();
    },
    bindinput: function(t) {
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
    },
    ormatDate: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + a(e.getMonth() + 1, 2) + "-" + a(e.getDate(), 2) + " " + a(e.getHours(), 2) + ":" + a(e.getMinutes(), 2) + ":" + a(e.getSeconds(), 2);
        function a(t, e) {
            for (var a = "" + t, n = a.length, i = "", s = e; s-- > n; ) i += "0";
            return i + a;
        }
    },
    thumbs_up: function(t) {
        var a = this, n = a.data.seller, i = t.currentTarget.dataset.id, s = wx.getStorageSync("users").id, e = (Number(t.currentTarget.dataset.num), 
        function(e) {
            n[e].tz.id == i && (n[e].thumbs_up = !0, app.util.request({
                url: "entry/wxapp/Like",
                cachetime: "0",
                data: {
                    information_id: i,
                    user_id: s
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
    },
    previewImage: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id, a = this.data.url, n = [], i = t.currentTarget.dataset.inde, s = this.data.seller;
        for (var o in s) if (s[o].tz.id == e) {
            var r = s[o].tz.img;
            for (var c in r) n.push(a + r[c]);
            wx.previewImage({
                current: a + r[i],
                urls: n
            });
        }
    },
    red: function(t) {
        wx.navigateTo({
            url: "../redbag/redbag",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
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
    yellow_page: function(t) {
        wx.reLaunch({
            url: "../yellow_page/yellow"
        });
    },
    post1: function(t) {
        wx.reLaunch({
            url: "../fabu/fabu/fabu"
        });
    },
    store_info: function(t) {
        var e = t.currentTarget.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    notice: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../notice/notice?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    post: function(t) {
        wx, wx.reLaunch({
            url: "../shun/shun",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    phone: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    more: function(t) {
        console.log(t), wx.reLaunch({
            url: "../store/store"
        });
    },
    jump: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name;
        wx.navigateTo({
            url: "../marry/marry?id=" + e + "&name=" + a,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    carinfo: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../shun/shuninfo2/shuninfo2?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    yellow_info: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.user_id;
        console.log(a), wx.navigateTo({
            url: "../yellow_page/yellowinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    store: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    message: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../message/message_info?id=" + e
        });
    },
    see: function(t) {
        this.data.seller;
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../infodetial/infodetial?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
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
    hddb: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    onReady: function() {
        this.setData({
            first: 1
        }), wx.removeStorageSync("city_type");
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.removeStorageSync("city_type");
    },
    onPullDownRefresh: function() {
        var e = this;
        this.setData({
            page: 1,
            seller: [],
            store1: [],
            yellow_list: [],
            pc: [],
            hdlist: [],
            zxlist: [],
            activeIndex: 0,
            swipecurrent: 0,
            refresh_top: !1
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(t) {
                console.log(t), wx.setStorageSync("color", t.data.color), 1e4 < Number(t.data.total_num) && (t.data.total_num = (Number(t.data.total_num) / 1e4).toFixed(2) + "万"), 
                e.setData({
                    System: t.data
                });
            }
        }), e.reload(), wx.stopPullDownRefresh();
            e.seller()
            this.gitIndexData();
    },
    onReachBottom: function() {
        var t = this, e = this.data.bkname;
        0 == this.data.refresh_top && this.data.issljz ? (console.log("上拉触底", e), "1" == e ? t.seller() : "2" == e ? t.sjbk() : "3" == e ? t.hybk() : "4" == e ? t.sfcbk() : "5" == e ? t.hdbmbk() : "6" == e && t.zxbk()) : console.log("dobutno");
    },
    onShareAppMessage: function() {
        var t = this.data.System.zf_title;
        return "" == t && (t = this.data.System.pt_name), console.log(t), {
            title: t,
            path: "/zh_tcwqyun/pages/index/index",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});