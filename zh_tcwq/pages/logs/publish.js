var app = getApp(), _imgArray = [], _imgArray2 = [];

Page({
    data: {
        items: [ {
            name: "正品保证",
            value: "正品保证"
        }, {
            name: "全程包邮",
            value: "全程包邮"
        }, {
            name: "24h发货",
            value: "24h发货"
        }, {
            name: "售后保障",
            value: "售后保障"
        }, {
            name: "极速退款",
            value: "极速退款"
        }, {
            name: "七天包退",
            value: "七天包退"
        } ],
        spec: [ {
            text: "",
            id: 0,
            spec: [ {
                id: "0",
                name: "",
                price: "",
                spec_id: ""
            } ]
        } ],
        add_spec: !1,
        spec1: [ {
            text: "",
            id: 0,
            spec: [ {
                id: "0",
                name: "",
                price: "",
                spec_id: ""
            } ]
        } ],
        classification: !1,
        imgarr1: [],
        imgarr2: []
    },
    onLoad: function(e) {
        _imgArray = [], _imgArray2 = [], console.log("onLoad");
        var a = this, t = e.store_id, s = wx.getStorageSync("url2"), o = wx.getStorageSync("url");
        a.setData({
            url: s,
            url1: o,
            store_id: t
        });
        a.data.add;
        console.log(a.data.spec), app.util.request({
            url: "entry/wxapp/Spec",
            cachetime: "0",
            success: function(e) {
                console.log(e), a.setData({
                    label: e.data
                });
            }
        });
    },
    classification: function(e) {
        var a = this;
        console.log(e);
        var t = e.currentTarget.dataset.index, s = a.data.classification;
        0 == s ? a.setData({
            classification: !0,
            index: t
        }) : a.setData({
            classification: !1,
            index: t
        });
    },
    select: function(e) {
        var a = this;
        console.log(e), console.log(a.data);
        a.data.label;
        var t = a.data.index, s = e.currentTarget.dataset.name, o = e.currentTarget.dataset.id, c = (a.data.add, 
        a.data.text1, a.data.text2, a.data.text3, a.data.id1, a.data.id2, a.data.id3, a.data.spec);
        c[t].text = s, c[t].spec_id = o, console.log(c), a.setData({
            spec: c,
            classification: !1
        });
    },
    imgArray1: function(e) {
        var t = this, s = wx.getStorageSync("uniacid"), o = this.data.imgarr1;
        _imgArray = [], console.log(o), wx.chooseImage({
            count: 4 - o.length,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var a = e.tempFilePaths;
                o = o.concat(a), t.uploadimg({
                    url: t.data.url + "app/index.php?i=" + s + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: o
                });
            }
        });
    },
    uploadimg: function(e) {
        var a = this, t = e.i ? e.i : 0, s = e.success ? e.success : 0, o = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[t],
            name: "upfile",
            formData: null,
            success: function(e) {
                "" != e.data ? (console.log(e), s++, _imgArray.push(e.data), console.log("上传商品主图时候提交的图片数组", _imgArray)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(e) {
                o++, console.log("fail:" + t + "fail:" + o);
            },
            complete: function() {
                console.log(t), ++t == e.path.length ? (a.setData({
                    imgarr1: e.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + s + " 失败：" + o)) : (console.log(t), 
                e.i = t, e.success = s, e.fail = o, a.uploadimg(e));
            }
        });
    },
    delete: function(e) {
        var a = e.currentTarget.dataset.index, t = this.data.imgarr1;
        console.log(t, _imgArray), t.splice(a, 1), _imgArray.splice(a, 1), console.log("删除imgarr1里的图片后剩余的图片", _imgArray), 
        this.setData({
            imgarr1: t
        });
    },
    imgArray2: function(e) {
        var t = this, s = wx.getStorageSync("uniacid"), o = this.data.imgarr2;
        _imgArray2 = [], console.log(o), wx.chooseImage({
            count: 8 - o.length,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var a = e.tempFilePaths;
                o = o.concat(a), t.uploadimg1({
                    url: t.data.url + "app/index.php?i=" + s + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: o
                });
            }
        });
    },
    uploadimg1: function(e) {
        var a = this, t = e.i ? e.i : 0, s = e.success ? e.success : 0, o = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[t],
            name: "upfile",
            formData: null,
            success: function(e) {
                "" != e.data ? (console.log(e), s++, _imgArray2.push(e.data), console.log("上传商品详情页时候提交的图片数组", _imgArray2)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(e) {
                o++, console.log("fail:" + t + "fail:" + o);
            },
            complete: function() {
                console.log(t), ++t == e.path.length ? (a.setData({
                    imgarr2: e.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + s + " 失败：" + o)) : (console.log(t), 
                e.i = t, e.success = s, e.fail = o, a.uploadimg1(e));
            }
        });
    },
    delete1: function(e) {
        var a = e.currentTarget.dataset.index, t = this.data.imgarr2;
        console.log(t, _imgArray2), t.splice(a, 1), _imgArray2.splice(a, 1), console.log("删除imgarr2里的图片后剩余的图片", _imgArray2), 
        this.setData({
            imgarr2: t
        });
    },
    add: function(e) {
        console.log(this.data), console.log(e);
        e.currentTarget.dataset.index;
        var a = e.currentTarget.dataset.id, t = this.data.spec;
        console.log(t);
        var s = this.data.spec1[0].spec[0];
        for (var o in console.log(a), t[a].spec.push(s), t) for (var c in t[o].spec) t[o].spec[c].id = t[o].id;
        console.log(t), 3 < t[a].spec.length ? wx.showModal({
            title: "提示",
            content: "只能添加三条子分类",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : this.setData({
            spec: t
        });
    },
    add1: function(e) {
        var a = e.currentTarget.dataset.index;
        console.log(this.data), console.log(a);
        var t = this.data.spec, s = this.data.spec1[0];
        for (var o in console.log(s), 1 == t.length ? (console.log("只要一个"), s.id = 1) : 2 == t.length && (console.log("只要两个"), 
        s.id = 2), t.push(s), t) for (var c in t[o].spec) t[o].spec[c].id = t[o].id;
        t.length <= 3 ? (console.log(s), console.log(t), this.setData({
            spec: t,
            len: t.length
        })) : wx.showModal({
            title: "提示",
            content: "只能添加三条",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    add2: function(e) {
        console.log(e);
        var a = this.data.spec, t = e.currentTarget.dataset.index;
        console.log(t), a.pop(), console.log(a), this.setData({
            spec: a,
            len: a.length
        });
    },
    checkboxChange: function(e) {
        console.log(e);
        var a = e.detail.value;
        this.setData({
            check_box: a
        });
    },
    add_spec: function(e) {
        var a = this.data.add_spec;
        0 == a ? this.setData({
            add_spec: !0
        }) : this.setData({
            add_spec: !1
        });
    },
    delete_spec_small: function(e) {
        var a = e.currentTarget.dataset.index, t = e.currentTarget.dataset.id, s = this.data.spec;
        for (var o in console.log(a), s[t].spec.splice(1, 1), s) for (var c in s[o].spec) s[o].spec[c].id = s[o].id;
        this.setData({
            spec: s
        });
    },
    spec_0_0_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[0].name = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_0_0_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[0].price = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_0_1_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[1].name = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_0_1_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[1].price = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_0_2_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[2].name = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_0_2_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[0].spec[2].price = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_1_0_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[0].name = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_1_0_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[0].price = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_1_1_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[1].name = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_1_1_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[1].price = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_1_2_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[2].name = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_1_2_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[1].spec[2].price = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_2_0_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[0].name = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_2_0_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[0].price = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_2_1_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[1].name = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_2_1_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[1].price = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_2_2_name: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[2].name = e.detail.value, this.setData({
            spec: a
        });
    },
    spec_2_2_price: function(e) {
        console.log(e);
        var a = this.data.spec;
        a[2].spec[2].price = e.detail.value, this.setData({
            spec: a
        });
    },
    formSubmit: function(e) {
        console.log(e), console.log(_imgArray), console.log(_imgArray2);
        var a = this;
        console.log(a.data.spec);
        var t = e.detail.value.spec_name, s = e.detail.value.spec_num, o = e.detail.value.spec_price, c = e.detail.value.spec_freight, i = e.detail.value.spec_delivery, n = e.detail.value.goods_details, l = a.data.check_box, r = a.data.spec;
        for (var p in r) for (var d in r[p].spec) r[p].spec[d].spec_id = r[p].spec_id, r[p].spec[d].spec_name = r[p].text;
        console.log(r);
        var u = [];
        for (var g in r) u = u.concat(r[g].spec);
        console.log(u);
        var f = 2, h = 2, m = 2, _ = 2, v = 2, x = 2;
        for (var y in l) "正品保证" == l[y] && (f = 1), "全程包邮" == l[y] && (h = 1), "24h发货" == l[y] && (m = 1), 
        "售后保障" == l[y] && (_ = 1), "急速退款" == l[y] && (v = 1), "七天包退" == l[y] && (x = 1);
        var w = "";
        if ("" == t) w = "商品名称不能为空"; else if ("" == o) w = "商品价格不能为空"; else if ("" == s) w = "商品数量不能为空"; else if ("" == c) w = "商品运费不能为空"; else if ("" == i) w = "发货说明不能为空"; else if (0 == _imgArray.length) w = "还没有上传商品图片哦"; else if (1 == a.data.add_spec) for (var D in u) "" == u[D].spec_name ? w = "没有选择规格" : "" == u[D].name ? w = "还有规格名字没输入" : "" == u[D].price && (w = "还有规格价格没输入");
        if ("" != w) wx.showModal({
            title: "提示",
            content: w,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }); else {
            if (1 == a.data.add_spec) {
                var T = [];
                u.map(function(e) {
                    var a = {};
                    a.name = e.name, a.money = e.price, a.spec_id = e.spec_id, T.push(a);
                }), console.log(T);
            } else T = [];
            if (0 < _imgArray.length) var A = _imgArray.join(","); else A = "";
            if (0 < _imgArray2.length) var S = _imgArray2.join(","); else S = "";
            console.log(A), console.log(S), app.util.request({
                url: "entry/wxapp/AddGoods",
                cachetime: "0",
                data: {
                    store_id: a.data.store_id,
                    imgs: S,
                    lb_imgs: A,
                    goods_name: t,
                    goods_num: s,
                    goods_cost: o,
                    freight: c,
                    delivery: i,
                    goods_details: n,
                    sz: T,
                    quality: f,
                    free: h,
                    all_day: m,
                    service: _,
                    refund: v,
                    weeks: x
                },
                success: function(e) {
                    console.log(e), 1 == e.data && (wx.showToast({
                        title: "发布成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 2e3));
                }
            });
        }
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});