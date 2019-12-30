var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, app = getApp(), util = require("../../../utils/util.js"), siteinfo = require("../../../../siteinfo.js");

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
        var e, a = this;
        wx.chooseImage({
            count: 1,
            success: function(t) {
                e = t.tempFilePaths, a.setData({
                    logo: e
                }), console.log(e);
            }
        });
    },
    chooseImage: function(t) {
        var e = this, a = this.data.lbimages, i = a.length;
        console.log(a), wx.chooseImage({
            count: 3 - i,
            success: function(t) {
                a = a.concat(t.tempFilePaths), e.setData({
                    lbimages: a
                }), console.log(a);
            }
        });
    },
    lbdeleteImage: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.lbimg;
        console.log(e), a.splice(e, 1), this.setData({
            lbimg: a
        }), console.log(a);
    },
    deleteImage: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.lbimages;
        console.log(e), a.splice(e, 1), this.setData({
            lbimages: a
        }), console.log(a);
    },
    chooseImage1: function(t) {
        var e = this, a = this.data.jsimages, i = a.length;
        console.log(a), wx.chooseImage({
            count: 3 - i,
            success: function(t) {
                a = a.concat(t.tempFilePaths), e.setData({
                    jsimages: a
                }), console.log(a);
            }
        });
    },
    jsdeleteImage: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.jsimg;
        console.log(e), a.splice(e, 1), this.setData({
            jsimg: a
        }), console.log(a);
    },
    deleteImage1: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.jsimages;
        console.log(e), a.splice(e, 1), this.setData({
            jsimages: a
        }), console.log(a);
    },
    formSubmit: function(t) {
        var i = this.data.QgGoodInfo.store_id, o = this.data.QgGoodInfo.id, s = (this.data.QgGoodInfo.state, 
        "string" == typeof this.data.logo ? this.data.QgGoodInfo.logo : this.data.logo), l = this.data.lbimg, e = this.data.lbimages, a = this.data.jsimages, n = this.data.jsimg, c = wx.getStorageSync("users").id;
        console.log("form发生了submit事件，携带数据为：", t.detail.value);
        var d = this.data.countries[t.detail.value.splx], u = t.detail.value.px, g = t.detail.value.spmc, r = t.detail.value.sj, p = t.detail.value.yj, m = t.detail.value.spsl, f = t.detail.value.starttime, h = t.detail.value.endtime, v = t.detail.value.jztime, _ = t.detail.value.spjj, y = t.detail.value.spxq;
        console.log(i, c, d, u, g, r, p, m, _, y, f, h, v, _typeof(this.data.logo), s, l, e, a, n);
        var x = "", b = !0;
        if ("" == g) x = "请填商品名称！"; else if ("../image/splogo.png" == s) x = "请上传商品主图！"; else if ("" == r || Number(r) <= 0) x = "请填写大于0的售价！"; else if ("" == p || Number(p) <= 0 || Number(p) < Number(r)) x = "请填写合理的原价！"; else if ("" == m) x = "请填写商品数量！"; else if (l.length + e.length == 0) x = "请上传顶部轮播图片！"; else if (util.validTime(f, h)) if ("" == v || 0 == v) x = "请填写合理的截止时间！"; else if ("" == y) x = "请填写商品详情！"; else {
            var j = function() {
                var t = "object" == (void 0 === s ? "undefined" : _typeof(s)) ? w[2].uploaded_pic_list.toString() : s, e = l.concat(w[0].uploaded_pic_list), a = n.concat(w[1].uploaded_pic_list);
                console.log("请求接口", w, t, e, a), app.util.request({
                    url: "entry/wxapp/AddQgGood",
                    cachetime: "0",
                    data: {
                        store_id: i,
                        num: u,
                        name: g,
                        logo: t,
                        price: p,
                        money: r,
                        number: m,
                        start_time: f,
                        end_time: h,
                        consumption_time: v,
                        details: y,
                        type_id: d.id,
                        img: e.toString(),
                        details_img: a.toString(),
                        content: _,
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
            b = !1;
            if ("object" == (void 0 === s ? "undefined" : _typeof(s))) var w = [ {
                pic_list: e,
                uploaded_pic_list: []
            }, {
                pic_list: a,
                uploaded_pic_list: []
            }, {
                pic_list: s,
                uploaded_pic_list: []
            } ]; else w = [ {
                pic_list: e,
                uploaded_pic_list: []
            }, {
                pic_list: a,
                uploaded_pic_list: []
            } ];
            console.log(w), wx.showLoading({
                title: "正在提交",
                mask: !0
            }), function a(i) {
                if (i == w.length) return j();
                var o = 0;
                if (!w[i].pic_list.length || 0 == w[i].pic_list.length) return a(i + 1);
                for (var t in w[i].pic_list) !function(e) {
                    wx.uploadFile({
                        url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_tcwq",
                        name: "upfile",
                        filePath: w[i].pic_list[e],
                        success: function(t) {
                            if (console.log("上传图片返回值", t), "" != t.data && (w[i].uploaded_pic_list[e] = t.data), 
                            ++o == w[i].pic_list.length) return a(i + 1);
                        }
                    });
                }(t);
            }(0);
        } else x = "请设置合理的活动日期！";
        1 == b && wx.showModal({
            title: "提示",
            content: x
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
            url: "entry/wxapp/QgType",
            cachetime: "0",
            success: function(t) {
                console.log(t);
                var i = t.data;
                0 == t.data.length && wx.showModal({
                    title: "提示",
                    content: "平台暂未添加分类，无法发布商品",
                    success: function(t) {
                        wx.navigateBack({});
                    }
                }), app.util.request({
                    url: "entry/wxapp/QgGoodInfo",
                    cachetime: "0",
                    data: {
                        id: e.spid
                    },
                    success: function(t) {
                        console.log(t), t.data.logobf = s + t.data.logo, t.data.img = t.data.img.split(","), 
                        t.data.details_img = "" == t.data.details_img ? [] : t.data.details_img.split(","), 
                        t.data.start_time = util.ormatDate(t.data.start_time).substring(0, 10), t.data.end_time = util.ormatDate(t.data.end_time).substring(0, 10);
                        for (var e = t.data, a = 0; a < i.length; a++) t.data.type_id == i[a].id && o.setData({
                            countryIndex: a
                        });
                        o.setData({
                            QgGoodInfo: e,
                            logo: e.logobf,
                            lbimg: e.img,
                            jsimg: e.details_img,
                            px: e.num,
                            spmc: e.name,
                            sj: e.money,
                            yj: e.price,
                            spsl: e.number,
                            spjj: e.content,
                            timestart: e.start_time,
                            timeend: e.end_time,
                            jztime: e.consumption_time,
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