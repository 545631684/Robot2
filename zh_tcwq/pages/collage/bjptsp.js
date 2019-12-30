var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, app = getApp(), util = require("../../utils/util.js"), siteinfo = require("../../../siteinfo.js");

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
    jyfxsl: function(t) {
        console.log(t.detail.value), "0" == t.detail.value && wx.showToast({
            title: "数量不能为0",
            icon: "loading"
        });
    },
    bindTypeChange: function(t) {
        console.log("picker type 发生选择改变，携带值为", t.detail.value), this.setData({
            countryIndex: t.detail.value
        });
    },
    bindTypeChange1: function(t) {
        console.log("picker1 type 发生选择改变，携带值为", t.detail.value), "1" == this.data.ptxx.is_fxlq ? ("0" == t.detail.value && this.setData({
            lqcountryIndex: t.detail.value,
            jesz: !0,
            qssz: !0
        }), "1" == t.detail.value && this.setData({
            lqcountryIndex: t.detail.value,
            jesz: !0,
            qssz: !1
        }), "2" == t.detail.value && this.setData({
            lqcountryIndex: t.detail.value,
            jesz: !1,
            qssz: !0
        })) : this.setData({
            lqcountryIndex: t.detail.value,
            jesz: !0,
            qssz: !1
        });
    },
    bindTimeChange: function(t) {
        console.log("picker 发生选择改变，携带值为", t.detail.value), this.setData({
            timestart: t.detail.value
        });
    },
    bindTimeChange1: function(t) {
        console.log("picker  发生选择改变，携带值为", t.detail.value), this.setData({
            timeend: t.detail.value
        });
    },
    bindTimeChange2: function(t) {
        console.log("picker  发生选择改变，携带值为", t.detail.value), this.setData({
            jztime: t.detail.value
        });
    },
    gongg: function(t) {
        console.log(t.detail.value);
        var e = parseInt(t.detail.value.length);
        this.setData({
            zsnum: e
        });
    },
    chooselogo: function(t) {
        var e, i = this;
        wx.chooseImage({
            count: 1,
            success: function(t) {
                e = t.tempFilePaths, i.setData({
                    logo: e
                }), console.log(e);
            }
        });
    },
    chooseImage: function(t) {
        var e = this, i = this.data.lbimages, a = i.length;
        console.log(i), wx.chooseImage({
            count: 3 - a,
            success: function(t) {
                i = i.concat(t.tempFilePaths), e.setData({
                    lbimages: i
                }), console.log(i);
            }
        });
    },
    lbdeleteImage: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.lbimg;
        console.log(e), i.splice(e, 1), this.setData({
            lbimg: i
        }), console.log(i);
    },
    deleteImage: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.lbimages;
        console.log(e), i.splice(e, 1), this.setData({
            lbimages: i
        }), console.log(i);
    },
    chooseImage1: function(t) {
        var e = this, i = this.data.jsimages, a = i.length;
        console.log(i), wx.chooseImage({
            count: 3 - a,
            success: function(t) {
                i = i.concat(t.tempFilePaths), e.setData({
                    jsimages: i
                }), console.log(i);
            }
        });
    },
    jsdeleteImage: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.jsimg;
        console.log(e), i.splice(e, 1), this.setData({
            jsimg: i
        }), console.log(i);
    },
    deleteImage1: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.jsimages;
        console.log(e), i.splice(e, 1), this.setData({
            jsimages: i
        }), console.log(i);
    },
    formSubmit: function(t) {
        var a = this.data.QgGoodInfo.store_id, o = this.data.QgGoodInfo.id, s = (this.data.QgGoodInfo.state, 
        "string" == typeof this.data.logo ? this.data.QgGoodInfo.logo : this.data.logo), l = this.data.lbimg, e = this.data.lbimages, i = this.data.jsimages, n = this.data.jsimg, d = wx.getStorageSync("users").id;
        console.log("form发生了submit事件，携带数据为：", t.detail.value);
        var c = this.data.countries[t.detail.value.splx], u = t.detail.value.px, r = t.detail.value.spmc, g = t.detail.value.sj, p = t.detail.value.yj, m = t.detail.value.ktrs, f = t.detail.value.ddgjg, h = t.detail.value.spsl, v = t.detail.value.spxl, _ = t.detail.value.yctsl, y = t.detail.value.starttime, x = t.detail.value.endtime, b = t.detail.value.jztime, j = t.detail.value.spjj, w = t.detail.value.spxq;
        console.log(a, d, c, u, r, g, p, m, f, h, v, _, j, w, y, x, b, _typeof(this.data.logo), s, l, e, i, n);
        var D = "", I = !0;
        if ("" == r) D = "请填商品名称！"; else if ("../image/splogo.png" == s) D = "请上传商品主图！"; else if ("" == g || Number(g) <= 0) D = "请填写大于0的售价！"; else if ("" == p || Number(p) <= 0 || Number(p) < Number(g)) D = "请填写合理的原价！"; else if ("" == f || Number(f) <= 0) D = "请填写大于0的单独购价格！"; else if ("" == h) D = "请填写商品库存！"; else if (l.length + e.length == 0) D = "请上传顶部轮播图片！"; else if (util.validTime(y, x)) if (util.validTime(x, b)) if ("" == w) D = "请填写商品详情！"; else {
            var q = function() {
                var t = "object" == (void 0 === s ? "undefined" : _typeof(s)) ? S[2].uploaded_pic_list.toString() : s, e = l.concat(S[0].uploaded_pic_list), i = n.concat(S[1].uploaded_pic_list);
                console.log("请求接口", S, t, e, i), app.util.request({
                    url: "entry/wxapp/SaveGroupGoods",
                    cachetime: "0",
                    data: {
                        store_id: a,
                        num: u,
                        name: r,
                        logo: t,
                        y_price: p,
                        pt_price: g,
                        dd_price: f,
                        inventory: h,
                        ycd_num: _,
                        ysc_num: v,
                        people: m,
                        is_shelves: z.data.QgGoodInfo.is_shelves,
                        start_time: y,
                        end_time: x,
                        xf_time: b,
                        details: w,
                        type_id: c.id,
                        introduction: j,
                        img: e.toString(),
                        details_img: i.toString(),
                        id: o
                    },
                    success: function(t) {
                        "1" == t.data && (wx.showModal({
                            title: "提示",
                            content: "提交成功"
                        }), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3)), console.log("Assess", t.data);
                    }
                });
            };
            I = !1;
            var z = this;
            if ("object" == (void 0 === s ? "undefined" : _typeof(s))) var S = [ {
                pic_list: e,
                uploaded_pic_list: []
            }, {
                pic_list: i,
                uploaded_pic_list: []
            }, {
                pic_list: s,
                uploaded_pic_list: []
            } ]; else S = [ {
                pic_list: e,
                uploaded_pic_list: []
            }, {
                pic_list: i,
                uploaded_pic_list: []
            } ];
            console.log(S), wx.showLoading({
                title: "正在提交",
                mask: !0
            }), function i(a) {
                if (a == S.length) return q();
                var o = 0;
                if (!S[a].pic_list.length || 0 == S[a].pic_list.length) return i(a + 1);
                for (var t in S[a].pic_list) !function(e) {
                    wx.uploadFile({
                        url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_tcwq",
                        name: "upfile",
                        filePath: S[a].pic_list[e],
                        success: function(t) {
                            if (console.log("上传图片返回值", t), "" != t.data && (S[a].uploaded_pic_list[e] = t.data), 
                            ++o == S[a].pic_list.length) return i(a + 1);
                        }
                    });
                }(t);
            }(0);
        } else D = "请填写合理的截止时间！"; else D = "请设置合理的活动日期！";
        1 == I && wx.showModal({
            title: "提示",
            content: D
        });
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "编辑商品"
        }), app.setNavigationBarColor(this);
        var o = this, s = wx.getStorageSync("url"), t = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
        console.log(e, t.toString()), this.setData({
            start: t,
            spid: e.spid,
            url: s
        }), app.util.request({
            url: "entry/wxapp/GroupType",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var a = t.data;
                0 == t.data.length && wx.showModal({
                    title: "提示",
                    content: "平台暂未添加分类，无法发布商品",
                    success: function(t) {
                        wx.navigateBack({});
                    }
                }), app.util.request({
                    url: "entry/wxapp/GetGoodDetails",
                    cachetime: "0",
                    data: {
                        goods_id: e.spid
                    },
                    success: function(t) {
                        console.log(t), t.data.logobf = s + t.data.logo, t.data.img = t.data.img.split(","), 
                        t.data.details_img = "" == t.data.details_img ? [] : t.data.details_img.split(","), 
                        t.data.start_time = util.ormatDate(t.data.start_time).substring(0, 10), t.data.end_time = util.ormatDate(t.data.end_time).substring(0, 10), 
                        t.data.xf_time = util.ormatDate(t.data.xf_time).substring(0, 10);
                        for (var e = t.data, i = 0; i < a.length; i++) t.data.type_id == a[i].id && o.setData({
                            countryIndex: i
                        });
                        o.setData({
                            QgGoodInfo: e,
                            logo: e.logobf,
                            lbimg: e.img,
                            jsimg: e.details_img,
                            px: e.num,
                            spmc: e.name,
                            sj: e.pt_price,
                            yj: e.y_price,
                            ktrs: e.people,
                            ddgjg: e.dd_price,
                            spsl: e.inventory,
                            yctsl: e.ycd_num,
                            spxl: e.ysc_num,
                            spjj: e.introduction,
                            timestart: e.start_time,
                            timeend: e.end_time,
                            jztime: e.xf_time,
                            spxq: e.details
                        });
                    }
                }), o.setData({
                    countries: t.data
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