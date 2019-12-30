var app = getApp();

Page({
    data: {
        activeIndex: 0,
        index: 0,
        tabs2: [ "商品信息", "商品推荐" ],
        select_spec: !1,
        spec_index_one: 0,
        spec_index: 0,
        spec_index_two: 0,
        money_one: 0,
        money_two: 0,
        money_three: 0,
        num: 1
    },
    openshare: function() {
        this.setData({
            share_modal_active: "active"
        });
    },
    showShareModal: function() {
        this.setData({
            share_modal_active: "active"
        });
    },
    shareModalClose: function() {
        this.setData({
            share_modal_active: ""
        });
    },
    Demonstration: function(e) {
        wx.navigateTo({
            url: "../car/car?goodid=" + this.data.store_good.id
        });
    },
    cartaddformSubmit: function(e) {
        console.log("formid", e.detail.formId);
        var t = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: t,
                form_id: e.detail.formId
            },
            success: function(e) {
                console.log(e.data);
            }
        });
    },
    onLoad: function(e) {
        console.log(e), app.getUserInfo(function(e) {
            console.log(e);
        });
        var t = this, a = decodeURIComponent(e.scene);
        if (null == e.id) var o = a; else o = e.id;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    width: e.windowWidth,
                    height: e.windowHeight
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(e) {
                console.log(e), wx.setStorageSync("url", e.data), t.setData({
                    url: e.data
                }), app.util.request({
                    url: "entry/wxapp/StoreGoodCode",
                    cachetime: "0",
                    data: {
                        store_id: o
                    },
                    success: function(e) {
                        console.log("这是商品的二维码"), console.log(e), t.setData({
                            shop_code: e.data
                        }), t.refresh();
                    }
                });
            }
        }), t.setData({
            id: o,
            logo: e.logo,
            system: wx.getStorageSync("System")
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
    },
    refresh: function(e) {
        var f = this, t = f.data.id;
        app.util.request({
            url: "entry/wxapp/GoodInfo",
            cachetime: "0",
            data: {
                id: t
            },
            success: function(e) {
                console.log(e), f.setData({
                    store_id: e.data.good.store_id
                }), e.data.good.imgs = e.data.good.imgs.split(","), e.data.good.lb_imgs = e.data.good.lb_imgs.split(",");
                var t = f.data.shop_code, a = f.data.url + e.data.good.lb_imgs[0];
                if (console.log(t), console.log(a), wx.downloadFile({
                    url: t,
                    success: function(e) {
                        console.log(e.tempFilePath), f.setData({
                            code_big: e.tempFilePath
                        }), wx.downloadFile({
                            url: a,
                            success: function(e) {
                                console.log(e.tempFilePath), f.setData({
                                    code_small: e.tempFilePath
                                }), f.ctx();
                            }
                        });
                    }
                }), 0 == e.data.spec.length) {
                    var o = [];
                    f.setData({
                        goods_cost: e.data.good.goods_cost,
                        store_good: e.data.good,
                        result: o
                    });
                } else {
                    var s = e.data.spec, n = {};
                    o = [];
                    s.forEach(function(e) {
                        var t = e.spec_id + "_" + e.spec_name;
                        void 0 === n[t] && (n[t] = []), n[t].push(e);
                    });
                    for (var i = Object.keys(n), c = 0; c < i.length; c++) {
                        var d = i[c].split("_");
                        o.push({
                            spec_id: d[0],
                            spec_name: d[1],
                            value: n[i[c]]
                        });
                    }
                    console.log(o);
                    var r, l = Number(e.data.good.goods_cost);
                    if (1 == o.length) {
                        var u = Number(o[0].value[0].money), m = 0, g = 0;
                        f.setData({
                            money1: u,
                            money2: m,
                            money3: g
                        });
                    } else if (2 == o.length) {
                        u = Number(o[0].value[0].money), m = Number(o[1].value[0].money), g = 0;
                        f.setData({
                            money1: u,
                            money2: m,
                            money3: g
                        });
                    } else if (3 == o.length) {
                        u = Number(o[0].value[0].money), m = Number(o[1].value[0].money), g = Number(o[2].value[0].money);
                        f.setData({
                            money1: u,
                            money2: m,
                            money3: g
                        });
                    }
                    r = u + m + g, console.log(r);
                    var h = (l + r).toFixed(2);
                    console.log(h), f.setData({
                        result: o,
                        goods_cost: h,
                        price: l,
                        store_good: e.data.good
                    });
                }
            }
        });
    },
    add: function(e) {
        wx.reLaunch({
            url: "../logs/logs",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    ctx: function(e) {
        var t = this, a = t.data, o = (a.width, a.height, wx.createCanvasContext("ctx"));
        o.drawImage(a.code_big, 0, 0, 150, 150), o.save(), o.beginPath(), o.arc(75, 75, 35, 0, 2 * Math.PI), 
        o.clip(), o.drawImage(a.code_small, 35, 35, 75, 75), o.restore(), o.draw(), setTimeout(function(e) {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 150,
                height: 150,
                canvasId: "ctx",
                success: function(e) {
                    console.log(e.tempFilePath), t.setData({
                        logos: e.tempFilePath
                    });
                }
            });
        }, 500);
    },
    liji: function(e) {
        this.setData({
            select_spec: !0
        });
    },
    add_num: function(e) {
        var t = this.data.num + 1, a = this.data.store_good.goods_num;
        t < a ? this.setData({
            num: t
        }) : this.setData({
            num: a
        });
    },
    subtraction: function(e) {
        var t = this.data.num;
        1 < (t -= 1) ? this.setData({
            num: t
        }) : this.setData({
            num: 1
        });
    },
    tabClick: function(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    order: function(e) {
        console.log("formid", e.detail.formId);
        var t = this, a = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: a,
                form_id: e.detail.formId
            },
            success: function(e) {
                console.log(e.data);
            }
        });
        var o = t.data.result, s = t.data.store_good, n = t.data.store_id, i = t.data.goods_cost, c = t.data.num;
        if (console.log(n), 0 == o.length) wx.redirectTo({
            url: "place_order?id=" + s.id + "&store_id=" + n + "&price=" + i + "&num=" + c,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }); else {
            if (1 == o.length) var d = o[0].value[t.data.spec_index].name, r = 0, l = 0; else if (2 == o.length) d = o[0].value[t.data.spec_index].name, 
            r = o[1].value[t.data.spec_index_one].name, l = 0; else if (3 == o.length) d = o[0].value[t.data.spec_index].name, 
            r = o[1].value[t.data.spec_index_one].name, l = o[2].value[t.data.spec_index_two].name;
            wx.redirectTo({
                url: "place_order?id=" + s.id + "&store_id=" + n + "&price=" + i + "&num=" + c + "&name1=" + d + "&name2=" + r + "&name3=" + l,
                success: function(e) {},
                fail: function(e) {},
                complete: function(e) {}
            });
        }
    },
    select_spec: function(e) {
        var t = this.data.select_spec;
        0 == t ? this.setData({
            select_spec: !0
        }) : this.setData({
            select_spec: !1
        });
    },
    spec_index: function(e) {
        var t = this.data.price, a = e.currentTarget.dataset.index, o = Number(e.currentTarget.dataset.price), s = t + this.data.money2 + this.data.money3 + o;
        this.setData({
            spec_index: a,
            money1: Number(o),
            goods_cost: s.toFixed(2)
        });
    },
    spec_index_one: function(e) {
        console.log(e);
        var t = this.data.price, a = e.currentTarget.dataset.index, o = Number(e.currentTarget.dataset.price), s = t + this.data.money1 + this.data.money3 + o;
        this.setData({
            spec_index_one: a,
            money2: Number(o),
            goods_cost: s.toFixed(2)
        });
    },
    spec_index_two: function(e) {
        console.log(e);
        var t = this.data.price, a = e.currentTarget.dataset.index, o = Number(e.currentTarget.dataset.price), s = t + this.data.money2 + this.data.money1 + o;
        this.setData({
            spec_index_two: a,
            money3: o,
            goods_cost: s.toFixed(2)
        });
    },
    canvas: function(e) {
        var t = this.data;
        wx.navigateTo({
            url: "../extra/canvas?url=" + t.url + "&id=" + t.id
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var e = this.data.id, t = this.data.store_id;
        return console.log(e, t), {
            title: this.data.store_good.goods_name,
            path: "/zh_tcwq/pages/sellerinfo/good_info?id=" + e + "&store_id=" + t
        };
    }
});