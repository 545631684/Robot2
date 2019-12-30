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
        classification: !1
    },
    onLoad: function(a) {
        var r = this, e = a.id, o = a.store_id;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var t = wx.getStorageSync("url2"), i = wx.getStorageSync("url");
        r.setData({
            url: t,
            url1: i,
            store_id: o,
            id: e
        });
        r.data.add;
        app.util.request({
            url: "entry/wxapp/Spec",
            cachetime: "0",
            success: function(a) {
                console.log(a), r.setData({
                    label: a.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/GoodInfo",
            cachetime: "0",
            data: {
                id: e
            },
            success: function(a) {
                console.log(a), "" == a.data.good.imgs ? a.data.good.imgs = [] : a.data.good.imgs = a.data.good.imgs.split(",");
                var e = a.data.good;
                a.data.good.lb_imgs = a.data.good.lb_imgs.split(","), _imgArray = a.data.good.lb_imgs, 
                _imgArray2 = a.data.good.imgs;
                for (var o = r.data.items, t = 0; t < o.length; t++) "正品保证" == o[t].value ? 1 == e.quality ? o[t].checked = !0 : o[t].checked = !1 : "全程包邮" == o[t].value ? 1 == e.free ? o[t].checked = !0 : o[t].checked = !1 : "24h发货" == o[t].value ? 1 == e.all_day ? o[t].checked = !0 : o[t].checked = !1 : "售后保障" == o[t].value ? 1 == e.service ? o[t].checked = !0 : o[t].checked = !1 : "极速退款" == o[t].value ? 1 == e.refund ? o[t].checked = !0 : o[t].checked = !1 : "七天包退" == o[t].value && (1 == e.weeks ? o[t].checked = !0 : o[t].checked = !1);
                console.log(o);
                var i = a.data.spec, n = {}, l = [];
                i.forEach(function(a) {
                    var e = a.spec_id + "_" + a.spec_name;
                    void 0 === n[e] && (n[e] = []), n[e].push(a);
                });
                var c = Object.keys(n);
                for (t = 0; t < c.length; t++) {
                    var s = c[t].split("_");
                    l.push({
                        spec_id: s[0],
                        spec_name: s[1],
                        value: n[c[t]]
                    });
                }
                r.data.add;
                if (1 == l.length) l[0].spec_name;
                if (2 == l.length) l[0].spec_name, l[1].spec_name;
                if (3 == l.length) l[0].spec_name, l[1].spec_name, l[2].spec_name;
                r.setData({
                    add: l,
                    spec: i,
                    store_good: a.data.good,
                    items: o,
                    imgArray1: _imgArray,
                    imgArray2: _imgArray2
                });
            }
        });
    },
    getIdDataSet: function(a) {
        for (var e = new Array(), o = a.length, t = 0; t < o; t++) e.push(a[t].coupons_id);
        return e;
    },
    classify: function(a, e) {
        for (var o = new Array(), t = new Array(), i = a.length, n = 0; n < i; n++) -1 === e.indexOf(a[n].id) ? t.push(a[n]) : o.push(a[n]);
        console.log(o), console.log(t), this.setData({
            received: o,
            unreceive: t
        });
    },
    classification: function(a) {
        var e = this;
        console.log(a);
        var o = a.currentTarget.dataset.index, t = e.data.classification;
        0 == t ? e.setData({
            classification: !0,
            index: o
        }) : e.setData({
            classification: !1,
            index: o
        });
    },
    select: function(a) {
        var e = this;
        console.log(a), console.log(e.data);
        e.data.label;
        var o = e.data.index, t = a.currentTarget.dataset.name, i = a.currentTarget.dataset.id, n = (e.data.add, 
        e.data.text1), l = e.data.text2, c = e.data.text3, s = e.data.id1, r = e.data.id2, d = e.data.id3;
        if (0 == o) if (null == n) n = t, s = i; else n = n, s = s;
        if (1 == o) if (null == l) l = t, r = i; else l = l, r = r;
        if (2 == o) if (null == c) c = t, d = i; else c = c, d = d;
        e.setData({
            id1: s,
            id2: r,
            id3: d,
            text1: n,
            text2: l,
            text3: c,
            classification: !1
        });
    },
    imgArray1: function(a) {
        var o = this, t = wx.getStorageSync("uniacid"), e = 4 - _imgArray.length;
        console.log(e), 0 < e && e <= 9 ? wx.chooseImage({
            count: e,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var e = a.tempFilePaths;
                o.uploadimg({
                    url: o.data.url + "app/index.php?i=" + t + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: e
                });
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传4张图片",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    uploadimg: function(a) {
        var e = this, o = a.i ? a.i : 0, t = a.success ? a.success : 0, i = a.fail ? a.fail : 0;
        wx.uploadFile({
            url: a.url,
            filePath: a.path[o],
            name: "upfile",
            formData: null,
            success: function(a) {
                "" != a.data ? (console.log(a), t++, _imgArray.push(a.data), e.setData({
                    imgArray1: _imgArray
                }), console.log("上传商家轮播图时候提交的图片数组", _imgArray)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(a) {
                i++, console.log("fail:" + o + "fail:" + i);
            },
            complete: function() {
                console.log(o), ++o == a.path.length ? (e.setData({
                    images: a.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + t + " 失败：" + i)) : (console.log(o), 
                a.i = o, a.success = t, a.fail = i, e.uploadimg(a));
            }
        });
    },
    delete: function(a) {
        var e = a.currentTarget.dataset.index, o = this.data.imgArray1;
        console.log(o, _imgArray), o.splice(e, 1), _imgArray.splice(e, 1), console.log("删除imgarr1里的图片后剩余的图片", _imgArray), 
        this.setData({
            imgArray1: o
        });
    },
    imgArray2: function(a) {
        var o = this, t = wx.getStorageSync("uniacid"), e = 8 - _imgArray2.length;
        console.log(e), 0 < e && e <= 9 ? wx.chooseImage({
            count: e,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var e = a.tempFilePaths;
                o.uploadimg1({
                    url: o.data.url + "app/index.php?i=" + t + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: e
                });
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传9张图片",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    uploadimg1: function(a) {
        var e = this, o = a.i ? a.i : 0, t = a.success ? a.success : 0, i = a.fail ? a.fail : 0;
        wx.uploadFile({
            url: a.url,
            filePath: a.path[o],
            name: "upfile",
            formData: null,
            success: function(a) {
                "" != a.data ? (console.log(a), t++, _imgArray2.push(a.data), e.setData({
                    imgArray2: _imgArray2
                }), console.log("上传商家轮播图时候提交的图片数组", _imgArray)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(a) {
                i++, console.log("fail:" + o + "fail:" + i);
            },
            complete: function() {
                console.log(o), ++o == a.path.length ? (e.setData({
                    images: a.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + t + " 失败：" + i)) : (console.log(o), 
                a.i = o, a.success = t, a.fail = i, e.uploadimg1(a));
            }
        });
    },
    delete1: function(a) {
        var e = a.currentTarget.dataset.index, o = this.data.imgArray2;
        console.log(o, _imgArray2), o.splice(e, 1), _imgArray2.splice(e, 1), console.log("删除imgarr2里的图片后剩余的图片", _imgArray2), 
        this.setData({
            imgArray2: o
        });
    },
    add: function(a) {
        var e = this;
        console.log(e.data), console.log(a);
        var o = a.currentTarget.dataset.index, t = a.currentTarget.dataset.id, i = e.data.add, n = (e.data.add2, 
        e.data.add[t][o]);
        for (var l in i) for (var c in i[l]) i[l][c].id = l;
        for (var s in i[t].push(n), i) for (var r in i[s]) i[s][r].id = s;
        console.log(i), e.setData({
            add: i,
            len: i.length
        });
    },
    add1: function(a) {
        var e = this;
        console.log(e.data);
        var o = e.data.add, t = (e.data.add2, e.data.add2[0]);
        if (console.log(t), o.length < 3) {
            for (var i in o.push(t), o) for (var n in o[i]) o[i][n].id = i;
            e.setData({
                add: o,
                len: o.length
            });
        } else wx.showModal({
            title: "提示",
            content: "只能添加三条",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    add2: function(a) {
        console.log(a);
        var e = this.data.add, o = a.currentTarget.dataset.index;
        console.log(o), this.data.add.splice(o, 1), this.setData({
            add: this.data.add,
            len: e.length
        });
    },
    checkboxChange: function(a) {
        console.log(a);
        var e = a.detail.value;
        this.setData({
            check_box: e
        });
    },
    formSubmit: function(a) {
        console.log(a);
        var e = this, o = e.data.spec, t = a.detail.value.spec_name, i = a.detail.value.spec_num, n = a.detail.value.spec_price, l = a.detail.value.spec_freight, c = a.detail.value.spec_delivery, s = a.detail.value.goods_details, r = e.data.check_box;
        console.log(r);
        var d = 2, g = 2, u = 2, f = 2, m = 2, h = 2;
        for (var p in r) "正品保证" == r[p] && (d = 1), "全程包邮" == r[p] && (g = 1), "24h发货" == r[p] && (u = 1), 
        "售后保障" == r[p] && (f = 1), "极速退款" == r[p] && (m = 1), "七天包退" == r[p] && (h = 1);
        var v = "";
        if ("" == t ? v = "商品名称不能为空" : "" == n ? v = "商品价格不能为空" : "" == i ? v = "商品数量不能为空" : "" == l ? v = "商品运费不能为空" : "" == c && (v = "发货说明不能为空"), 
        "" != v) wx.showModal({
            title: "提示",
            content: v,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        }); else {
            var _ = [];
            if (o.map(function(a) {
                var e = {};
                e.name = a.name, e.money = a.money, e.num = a.num, e.spec_id = a.spec_id, _.push(e);
            }), console.log(_), 0 < _imgArray.length) var y = _imgArray.join(","); else y = "";
            if (0 < _imgArray2.length) var x = _imgArray2.join(","); else x = "";
            console.log(e.data.id), console.log(e.data.store_id), console.log(x), console.log(y), 
            console.log(t), console.log(i), console.log(n), console.log(l), console.log(c), 
            console.log(s), console.log(_), console.log(d), console.log(g), console.log(u), 
            console.log(f), console.log(m), console.log(h), app.util.request({
                url: "entry/wxapp/UpdGoods",
                cachetime: "0",
                data: {
                    good_id: e.data.id,
                    store_id: e.data.store_id,
                    imgs: x,
                    lb_imgs: y,
                    goods_name: t,
                    goods_num: i,
                    goods_cost: n,
                    freight: l,
                    delivery: c,
                    goods_details: s,
                    sz: _,
                    quality: d,
                    free: g,
                    all_day: u,
                    service: f,
                    refund: m,
                    weeks: h
                },
                success: function(a) {
                    console.log(a), 1 == a.data && (wx.showToast({
                        title: "修改成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(a) {},
                        fail: function(a) {},
                        complete: function(a) {}
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
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});