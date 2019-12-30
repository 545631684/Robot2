var app = getApp(), util = require("../../utils/util.js"), siteinfo = require("../../../siteinfo.js");

Page({
    data: {
        countries: [],
        countryIndex: 0,
        lqcountries: [ "付费领取+分享领取", "仅限付费领取", "仅限分享领取" ],
        lqcountryIndex: 1,
        jesz: !0,
        qssz: !0,
        yhqtype: "元",
        start: "",
        timestart: "",
        timeend: "",
        issq: !0,
        is_check: "",
        zsnum: 0,
        fwxy: !0,
        lbimages: [],
        jsimages: [],
        logo: "../image/splogo.png"
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    jyfxsl: function(e) {
        console.log(e.detail.value), "0" == e.detail.value && wx.showToast({
            title: "数量不能为0",
            icon: "loading"
        });
    },
    bindTypeChange: function(e) {
        console.log("picker type 发生选择改变，携带值为", e.detail.value), this.setData({
            countryIndex: e.detail.value
        });
    },
    bindTypeChange1: function(e) {
        console.log("picker1 type 发生选择改变，携带值为", e.detail.value), "1" == this.data.ptxx.is_fxlq ? ("0" == e.detail.value && this.setData({
            lqcountryIndex: e.detail.value,
            jesz: !0,
            qssz: !0
        }), "1" == e.detail.value && this.setData({
            lqcountryIndex: e.detail.value,
            jesz: !0,
            qssz: !1
        }), "2" == e.detail.value && this.setData({
            lqcountryIndex: e.detail.value,
            jesz: !1,
            qssz: !0
        })) : this.setData({
            lqcountryIndex: e.detail.value,
            jesz: !0,
            qssz: !1
        });
    },
    bindTimeChange: function(e) {
        console.log("picker 发生选择改变，携带值为", e.detail.value), this.setData({
            timestart: e.detail.value
        });
    },
    bindTimeChange1: function(e) {
        console.log("picker  发生选择改变，携带值为", e.detail.value), this.setData({
            timeend: e.detail.value
        });
    },
    bindTimeChange2: function(e) {
        console.log("picker  发生选择改变，携带值为", e.detail.value), this.setData({
            jztime: e.detail.value
        });
    },
    gongg: function(e) {
        console.log(e.detail.value);
        var t = parseInt(e.detail.value.length);
        this.setData({
            zsnum: t
        });
    },
    chooselogo: function(e) {
        var t, i = this;
        wx.chooseImage({
            count: 1,
            success: function(e) {
                t = e.tempFilePaths, i.setData({
                    logo: t
                }), console.log(t);
            }
        });
    },
    chooseImage: function(e) {
        var t = this, i = this.data.lbimages, a = i.length;
        console.log(i), wx.chooseImage({
            count: 3 - a,
            success: function(e) {
                i = i.concat(e.tempFilePaths), t.setData({
                    lbimages: i
                }), console.log(i);
            }
        });
    },
    deleteImage: function(e) {
        var t = e.currentTarget.dataset.index, i = this.data.lbimages;
        console.log(t), i.splice(t, 1), this.setData({
            lbimages: i
        }), console.log(i);
    },
    chooseImage1: function(e) {
        var t = this, i = this.data.jsimages, a = i.length;
        console.log(i), wx.chooseImage({
            count: 3 - a,
            success: function(e) {
                i = i.concat(e.tempFilePaths), t.setData({
                    jsimages: i
                }), console.log(i);
            }
        });
    },
    deleteImage1: function(e) {
        var t = e.currentTarget.dataset.index, i = this.data.jsimages;
        console.log(t), i.splice(t, 1), this.setData({
            jsimages: i
        }), console.log(i);
    },
    formSubmit: function(e) {
        var t = this.data.sjid, i = this.data.logo, a = this.data.lbimages, s = this.data.jsimages, o = wx.getStorageSync("users").id;
        console.log("form发生了submit事件，携带数据为：", e.detail.value);
        var l = this.data.countries[e.detail.value.splx], n = e.detail.value.px, c = e.detail.value.spmc, u = e.detail.value.sj, d = e.detail.value.yj, g = e.detail.value.spsl, r = e.detail.value.starttime, p = e.detail.value.endtime, m = e.detail.value.jztime, h = e.detail.value.spjj, f = e.detail.value.spxq;
        console.log(t, o, l, n, c, u, d, g, h, f, r, p, m, i, a, s);
        var v = "", x = !0;
        if ("" == c) v = "请填商品名称！"; else if ("../image/splogo.png" == i) v = "请上传商品主图！"; else if ("" == u || Number(u) <= 0) v = "请填写大于0的售价！"; else if ("" == d || Number(d) <= 0 || Number(d) < Number(u)) v = "请填写合理的原价！"; else if ("" == g) v = "请填写商品数量！"; else if (0 == a.length) v = "请上传顶部轮播图片！"; else if (util.validTime(r, p)) if ("" == m || 0 == m) v = "请填写合理的截止时间！"; else if ("" == f) v = "请填写商品详情！"; else {
            var _ = function() {
                console.log("请求接口", w), app.util.request({
                    url: "entry/wxapp/AddQgGood",
                    cachetime: "0",
                    data: {
                        store_id: t,
                        num: n,
                        name: c,
                        logo: w[0].uploaded_pic_list.toString(),
                        price: d,
                        money: u,
                        number: g,
                        start_time: r,
                        end_time: p,
                        consumption_time: m,
                        details: f,
                        type_id: l.id,
                        img: w[1].uploaded_pic_list.toString(),
                        details_img: w[2].uploaded_pic_list.toString(),
                        content: h
                    },
                    success: function(e) {
                        "1" == e.data && (wx.showModal({
                            title: "提示",
                            content: "提交成功"
                        }), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3)), console.log("Assess", e.data);
                    }
                });
            };
            x = !1;
            var w = [ {
                pic_list: i,
                uploaded_pic_list: []
            }, {
                pic_list: a,
                uploaded_pic_list: []
            }, {
                pic_list: s,
                uploaded_pic_list: []
            } ];
            console.log(w), wx.showLoading({
                title: "正在提交",
                mask: !0
            }), function i(a) {
                if (a == w.length) return _();
                var s = 0;
                if (!w[a].pic_list.length || 0 == w[a].pic_list.length) return i(a + 1);
                for (var e in w[a].pic_list) !function(t) {
                    wx.uploadFile({
                        url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_tcwq",
                        name: "upfile",
                        filePath: w[a].pic_list[t],
                        success: function(e) {
                            if (console.log("上传图片返回值", e), "" != e.data && (w[a].uploaded_pic_list[t] = e.data), 
                            ++s == w[a].pic_list.length) return i(a + 1);
                        }
                    });
                }(e);
            }(0);
        } else v = "请设置合理的活动日期！";
        1 == x && wx.showModal({
            title: "提示",
            content: v
        });
    },
    onLoad: function(e) {
        app.setNavigationBarColor(this);
        var t = e.store_id, i = this, a = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
        console.log(t, a.toString()), this.setData({
            start: a,
            timestart: a,
            timeend: a,
            jztime: a,
            is_couset: 1,
            szlx: 1,
            sjid: t
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: t
            },
            success: function(e) {
                console.log(e);
            }
        }), app.util.request({
            url: "entry/wxapp/QgType",
            cachetime: "0",
            success: function(e) {
                console.log(e), 0 == e.data.length && wx.showModal({
                    title: "提示",
                    content: "平台暂未添加分类，无法发布商品",
                    success: function(e) {
                        wx.navigateBack({});
                    }
                }), i.setData({
                    countries: e.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});