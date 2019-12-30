var app = getApp(), _imgArray = [], imgArray2 = [], imgArray3 = [];

Page({
    data: {
        add1: [ {
            id: "imgArray1"
        } ],
        length1: 540
    },
    onLoad: function(e) {
        var t = this;
        app.setNavigationBarColor(this);
        var a = wx.getStorageSync("url2"), i = wx.getStorageSync("url");
        t.setData({
            url: a,
            img_url: i
        }), app.util.request({
            url: "entry/wxapp/ZxType",
            cachetime: "0",
            success: function(e) {
                console.log(e), t.setData({
                    zx: e.data
                });
            }
        });
    },
    imgArray1: function(e) {
        var a = this, i = wx.getStorageSync("uniacid"), t = 9 - _imgArray.length;
        console.log(t), 0 < t && t <= 9 ? wx.chooseImage({
            count: t,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var t = e.tempFilePaths;
                a.uploadimg({
                    url: a.data.url + "app/index.php?i=" + i + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: t
                });
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传9张图片",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    uploadimg: function(e) {
        var t = this, a = e.i ? e.i : 0, i = e.success ? e.success : 0, n = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[a],
            name: "upfile",
            formData: null,
            success: function(e) {
                "" != e.data ? (console.log(e), i++, _imgArray.push(e.data), t.setData({
                    imgArray1: _imgArray
                }), console.log("上传商家轮播图时候提交的图片数组", _imgArray)) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(e) {
                n++, console.log("fail:" + a + "fail:" + n);
            },
            complete: function() {
                console.log(a), ++a == e.path.length ? (t.setData({
                    images: e.path
                }), wx.hideToast(), console.log("执行完毕"), console.log("成功：" + i + " 失败：" + n)) : (console.log(a), 
                e.i = a, e.success = i, e.fail = n, t.uploadimg(e));
            }
        });
    },
    classifation: function(e) {
        var t = this;
        console.log(t.data);
        t.data.zx;
        var a = e.currentTarget.dataset.index, i = e.currentTarget.dataset.id;
        t.setData({
            activeIndex: a,
            index: a,
            type_id: i
        });
    },
    delete1: function(e) {
        console.log(e), Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
            return -1;
        }, Array.prototype.remove = function(e) {
            var t = this.indexOf(e);
            -1 < t && this.splice(t, 1);
        };
        var t = e.currentTarget.dataset.inde;
        _imgArray.remove(_imgArray[t]), this.setData({
            imgArray1: _imgArray
        });
    },
    add: function(e) {
        wx.reLaunch({
            url: "../index/index",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    formSubmit: function(e) {
        console.log(e);
        wx.getStorageSync("city_type");
        var t = wx.getStorageSync("city"), a = this.data.add1, i = e.detail.value.text1, n = e.detail.value.video, o = (i = i.replace("\n", "↵"), 
        e.detail.value.details), c = wx.getStorageSync("users").id;
        console.log(c);
        var r = this.data.type_id, l = "";
        if (null == r) l = "还没有选择分类哦"; else if ("" == o) l = "标题不能为空"; else if (1 == a.length) if ("" == i) l = "内容不能为空"; else if (0 == _imgArray.length) var s = ""; else if (0 < _imgArray.length) s = _imgArray.join(",");
        "" != l ? wx.showModal({
            title: "提示",
            content: l,
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }) : app.util.request({
            url: "entry/wxapp/Zx",
            cachetime: "0",
            data: {
                type_id: r,
                user_id: c,
                title: o,
                content: i,
                imgs: s,
                cityname: t,
                video: n
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
                    wx.redirectTo({
                        url: "message",
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    });
                }, 2e3));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        _imgArray.splice(0, _imgArray.length), imgArray3.splice(0, imgArray3.length), imgArray2.splice(0, imgArray2.length);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});