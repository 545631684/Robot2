var app = getApp(), imgArray = [];

Page({
    data: {},
    onLoad: function(a) {
        var n = this;
        app.setNavigationBarColor(this), wx.setNavigationBarTitle({
            title: "编辑"
        });
        var t = wx.getStorageSync("url"), e = wx.getStorageSync("url2"), i = a.id;
        n.setData({
            url: t,
            url1: e,
            id: i
        });
        var o, r, s, c = (o = new Date(), r = o.getMonth() + 1, s = o.getDate(), 1 <= r && r <= 9 && (r = "0" + r), 
        0 <= s && s <= 9 && (s = "0" + s), o.getFullYear() + "-" + r + "-" + s + " " + o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds());
        app.util.request({
            url: "entry/wxapp/PostInfo",
            cachetime: "0",
            data: {
                id: i
            },
            success: function(a) {
                console.log(a);
                var t = a.data.tz;
                if (t.dq_time = app.ormatDate(t.dq_time), t.dq_time >= c ? t.dq = !0 : t.dq_ = !1, 
                t.img = t.img.split(","), "" != t.img) for (var e in t.img) imgArray.push(t.img[e]);
                app.util.request({
                    url: "entry/wxapp/Label",
                    cachetime: "0",
                    data: {
                        type2_id: t.type2_id
                    },
                    success: function(a) {
                        for (var t in a.data) a.data[t].click_class = "selected1";
                        n.setData({
                            label: a.data
                        });
                    }
                }), n.setData({
                    post: t,
                    imgArray: imgArray
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Top",
            cachetime: "0",
            success: function(a) {
                var t = a.data;
                for (var e in t) 1 == t[e].type ? t[e].array = "置顶一天（收费" + t[e].money + "元）" : 2 == t[e].type ? t[e].array = "置顶一周（收费" + t[e].money + "元）" : 3 == t[e].type && (t[e].array = "置顶一月（收费" + t[e].money + "元）");
                var i = [];
                t.map(function(a) {
                    var t;
                    t = a.array, i.push(t);
                }), i.push("取消置顶"), n.setData({
                    stock: i,
                    stick: t
                });
            }
        });
    },
    radioChange: function(a) {
        this.setData({
            value: a.detail.value
        });
    },
    chooseImage2: function() {
        var e = this, i = wx.getStorageSync("uniacid"), a = 9 - [].length;
        0 < a && a <= 9 ? wx.chooseImage({
            count: a,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var t = a.tempFilePaths;
                e.uploadimg({
                    url: e.data.url1 + "app/index.php?i=" + i + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: t
                });
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传9张图片",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    uploadimg: function(a) {
        var t = this, e = a.i ? a.i : 0, i = a.success ? a.success : 0, n = a.fail ? a.fail : 0;
        wx.uploadFile({
            url: a.url,
            filePath: a.path[e],
            name: "upfile",
            formData: null,
            success: function(a) {
                "" != a.data ? (i++, imgArray.push(a.data), t.setData({
                    imgArray: imgArray
                })) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(a) {
                n++;
            },
            complete: function() {
                ++e == a.path.length ? (t.setData({
                    imgArray: imgArray
                }), wx.hideToast()) : (a.i = e, a.success = i, a.fail = n, t.uploadimg(a));
            }
        });
    },
    delete: function(a) {
        Array.prototype.indexOf = function(a) {
            for (var t = 0; t < this.length; t++) if (this[t] == a) return t;
            return -1;
        }, Array.prototype.remove = function(a) {
            var t = this.indexOf(a);
            -1 < t && this.splice(t, 1);
        };
        var t = a.currentTarget.dataset.index;
        imgArray.remove(imgArray[t]), this.setData({
            imgArray: imgArray
        });
    },
    label: function(a) {
        var t = this.data.label, e = a.currentTarget.dataset.inde;
        "selected1" == t[e].click_class ? t[e].click_class = "selected2" : "selected2" == t[e].click_class && (t[e].click_class = "selected1"), 
        this.setData({
            label: t
        });
    },
    add: function(a) {
        var i = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(a) {
                a.latitude, a.longitude, a.speed, a.accuracy;
                var t = a.latitude + "," + a.longitude, e = i.data.post;
                e.address = a.address, e.coordinates = t, i.setData({
                    post: e
                });
            }
        });
    },
    formSubmit: function(a) {
        var t = this, e = t.data.post;
        if (null == e.type_name) var i = a.detail.value.content, n = e.user_name, o = e.user_tel; else i = a.detail.value.content, 
        n = a.detail.value.name, o = a.detail.value.tel;
        var r = t.data.value, s = t.data.stick;
        if ("取消置顶" == r || null == r) var c = 0, l = 0; else for (var u in s) if (s[u].array == r) c = s[u].type, 
        l = s[u].money;
        console.log(c), console.log(l);
        var d = t.data.label, p = [];
        for (var g in d) "selected2" == d[g].click_class && p.push(d[g]);
        var m = [];
        p.map(function(a) {
            var t = {};
            t.label_id = a.id, m.push(t);
        });
        var f, y = t.data.id, h = wx.getStorageSync("city"), v = a.detail.value.address;
        f = imgArray.join(","), console.log(y, i, f, n, o, v, h), app.util.request({
            url: "entry/wxapp/UpdPost",
            cachetime: "0",
            data: {
                id: y,
                details: i,
                img: f,
                user_name: n,
                user_tel: o,
                address: v,
                cityname: h
            },
            success: function(a) {
                if (console.log(a), "1" == a.data) {
                    wx.showToast({
                        title: "修改成功",
                        duration: 1e3,
                        mask: !0,
                        success: function(a) {},
                        fail: function(a) {},
                        complete: function(a) {}
                    });
                    var t = getCurrentPages();
                    if (console.log(t), 1 < t.length) t[t.length - 2].reload();
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1e3);
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        imgArray.splice(0, imgArray.length);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});