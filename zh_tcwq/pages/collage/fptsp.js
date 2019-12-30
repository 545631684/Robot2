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
        var t = this.data.sjid, i = this.data.logo, a = this.data.lbimages, s = this.data.jsimages, l = wx.getStorageSync("users").id;
        console.log("form发生了submit事件，携带数据为：", e.detail.value);
        var o = this.data.countries[e.detail.value.splx], n = e.detail.value.px, c = e.detail.value.spmc, u = e.detail.value.sj, d = e.detail.value.yj, r = e.detail.value.ktrs, g = e.detail.value.ddgjg, p = e.detail.value.spsl, m = e.detail.value.spxl, h = e.detail.value.yctsl, f = e.detail.value.starttime, v = e.detail.value.endtime, x = e.detail.value.jztime, _ = e.detail.value.spjj, y = e.detail.value.spxq;
        console.log(t, l, o, n, c, u, d, r, g, p, m, h, _, y, f, v, x, i, a, s);
        var w = "", j = !0;
        if ("" == c) w = "请填商品名称！"; else if ("../image/splogo.png" == i) w = "请上传商品主图！"; else if ("" == u || Number(u) <= 0) w = "请填写大于0的售价！"; else if ("" == d || Number(d) <= 0 || Number(d) < Number(u)) w = "请填写合理的原价！"; else if ("" == g || Number(g) <= 0) w = "请填写大于0的单独购价格！"; else if ("" == p) w = "请填写商品库存！"; else if (0 == a.length) w = "请上传顶部轮播图片！"; else if (util.validTime(f, v)) if (util.validTime(v, x)) if ("" == y) w = "请填写商品详情！"; else {
            var q = function() {
                console.log("请求接口", D), app.util.request({
                    url: "entry/wxapp/SaveGroupGoods",
                    cachetime: "0",
                    data: {
                        store_id: t,
                        num: n,
                        name: c,
                        logo: D[0].uploaded_pic_list.toString(),
                        y_price: d,
                        pt_price: u,
                        dd_price: g,
                        inventory: p,
                        ycd_num: h,
                        ysc_num: m,
                        people: r,
                        is_shelves: 1,
                        start_time: f,
                        end_time: v,
                        xf_time: x,
                        details: y,
                        type_id: o.id,
                        img: D[1].uploaded_pic_list.toString(),
                        details_img: D[2].uploaded_pic_list.toString(),
                        introduction: _
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
            j = !1;
            var D = [ {
                pic_list: i,
                uploaded_pic_list: []
            }, {
                pic_list: a,
                uploaded_pic_list: []
            }, {
                pic_list: s,
                uploaded_pic_list: []
            } ];
            console.log(D), wx.showLoading({
                title: "正在提交",
                mask: !0
            }), function i(a) {
                if (a == D.length) return q();
                var s = 0;
                if (!D[a].pic_list.length || 0 == D[a].pic_list.length) return i(a + 1);
                for (var e in D[a].pic_list) !function(t) {
                    wx.uploadFile({
                        url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_tcwq",
                        name: "upfile",
                        filePath: D[a].pic_list[t],
                        success: function(e) {
                            if (console.log("上传图片返回值", e), "" != e.data && (D[a].uploaded_pic_list[t] = e.data), 
                            ++s == D[a].pic_list.length) return i(a + 1);
                        }
                    });
                }(e);
            }(0);
        } else w = "请填写合理的截止时间！"; else w = "请设置合理的活动日期！";
        1 == j && wx.showModal({
            title: "提示",
            content: w
        });
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "发布拼团商品"
        }), app.setNavigationBarColor(this);
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
            url: "entry/wxapp/GroupType",
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