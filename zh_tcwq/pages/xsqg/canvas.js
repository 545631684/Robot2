var _data;

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var app = getApp(), util = require("../../utils/util.js");

Page({
    data: (_data = {
        img: "../../images/gobg.png",
        wechat: "../../images/wechat.png",
        quan: "../../images/quan.png",
        code: "E7AI98",
        inputValue: "",
        maskHidden: !1,
        name: "",
        touxiang: ""
    }, _defineProperty(_data, "code", "E7A93C"), _defineProperty(_data, "jjz", !0), 
    _data),
    bindKeyInput: function(t) {
        this.setData({
            inputValue: t.detail.value
        });
    },
    btnclick: function() {
        var t = this.data.inputValue;
        wx.showToast({
            title: t,
            icon: "none",
            duration: 2e3
        });
    },
    onLoad: function(o) {
        app.setNavigationBarColor(this), wx.setNavigationBarTitle({
            title: "海报"
        });
        var n = this, t = wx.getStorageSync("users").id;
        console.log(t, o), app.util.request({
            url: "entry/wxapp/QgGoodInfo",
            cachetime: "0",
            data: {
                id: o.id
            },
            success: function(t) {
                console.log(t.data), t.data.end_time = util.ormatDate(t.data.end_time), n.setData({
                    url: o.url,
                    QgGoodInfo: t.data
                }), wx.downloadFile({
                    url: o.url + t.data.logo,
                    success: function(t) {
                        console.log(t), n.setData({
                            qglogo: t.tempFilePath
                        });
                    }
                }), app.util.request({
                    url: "entry/wxapp/StoreInfo",
                    cachetime: "0",
                    data: {
                        id: t.data.store_id
                    },
                    success: function(t) {
                        console.log(t.data);
                        var e = t.data.store[0], a = o.url + e.logo;
                        app.util.request({
                            url: "entry/wxapp/qgcode",
                            cachetime: "0",
                            data: {
                                id: o.id
                            },
                            success: function(t) {
                                console.log(t);
                                var e = t.data;
                                console.log("商家的logo", a, "小程序码logo1", e), wx.downloadFile({
                                    url: a,
                                    success: function(t) {
                                        console.log(t), n.setData({
                                            logo: t.tempFilePath
                                        }), wx.downloadFile({
                                            url: e,
                                            success: function(t) {
                                                console.log(t), n.setData({
                                                    logo1: t.tempFilePath
                                                }), n.ctx();
                                            }
                                        });
                                    }
                                });
                            }
                        }), n.setData({
                            sjinfo: t.data,
                            score: Number(t.data.score).toFixed(1)
                        });
                    }
                });
            }
        }), wx.getSystemInfo({
            success: function(t) {
                n.setData({
                    width: t.windowWidth,
                    height: t.windowHeight
                });
            }
        });
    },
    ctx: function(t) {
        var e = this, a = e.data, o = (a.width, a.height, wx.createCanvasContext("ctx"));
        o.drawImage(a.logo1, 0, 0, 150, 150), o.save(), o.beginPath(), o.arc(75, 75, 35, 0, 2 * Math.PI), 
        o.clip(), o.drawImage(a.logo, 35, 35, 75, 75), o.restore(), o.draw(), setTimeout(function(t) {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 150,
                height: 150,
                canvasId: "ctx",
                success: function(t) {
                    console.log(t.tempFilePath), e.setData({
                        xcxm: t.tempFilePath
                    }), e.formSubmit();
                }
            });
        }, 500);
    },
    createNewImg: function() {
        var a = this, t = wx.createCanvasContext("mycanvas");
        t.setFillStyle("#fff"), t.fillRect(0, 0, 375, 667);
        var e = a.data.qglogo, o = a.data.xcxm;
        console.log(e, o, "qglogo");
        var n = a.data.QgGoodInfo.store_name, i = "￥" + a.data.QgGoodInfo.money, l = "￥" + a.data.QgGoodInfo.price, s = a.data.QgGoodInfo.money + "元抢" + a.data.QgGoodInfo.name, c = "抢购结束日期:" + a.data.QgGoodInfo.end_time;
        t.setFontSize(24), t.setFillStyle("#000000"), t.setTextAlign("center"), t.fillText(n, 187.5, 50), 
        t.stroke(), t.drawImage(e, 40, 80, 295, 175), t.setFontSize(18), t.setFillStyle("#000000"), 
        t.setTextAlign("center"), t.fillText(s, 187.5, 290), t.setFontSize(16), t.setFillStyle("#999"), 
        t.setTextAlign("center"), t.fillText("抢购价", 80, 340), t.setFontSize(16), t.setFillStyle(a.data.color), 
        t.setTextAlign("center"), t.fillText(i, 135, 340), t.setFontSize(16), t.setFillStyle("#999"), 
        t.setTextAlign("center"), t.fillText("原价", 220, 340), t.setFontSize(16), t.setFillStyle("#999"), 
        t.setTextAlign("center"), t.fillText(l, 275, 340), t.stroke(), t.setStrokeStyle("#999"), 
        t.moveTo(200, 335), t.lineTo(315, 335), t.stroke(), t.setTextBaseline("middle"), 
        t.setStrokeStyle("#999"), t.setLineDash([ 3, 5 ], 1), t.beginPath(), t.moveTo(40, 310), 
        t.lineTo(335, 310), t.stroke(), t.drawImage(a.data.xcxm, 125, 370, 125, 125), t.setFillStyle("#000"), 
        t.setFontSize(16), t.setTextAlign("center"), t.fillText("长按二维码识别小程序参与抢购", 187.5, 529), 
        t.setFillStyle("#333"), t.setFontSize(13), t.setTextAlign("center"), t.fillText(c, 187.5, 565), 
        t.draw(), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "mycanvas",
                success: function(t) {
                    var e = t.tempFilePath;
                    a.setData({
                        imagePath: e,
                        canvasHidden: !0,
                        jjz: !1
                    });
                },
                fail: function(t) {
                    console.log(t);
                }
            });
        }, 200);
    },
    baocun: function() {
        wx.saveImageToPhotosAlbum({
            filePath: this.data.imagePath,
            success: function(t) {
                wx.showModal({
                    content: "图片已保存到相册，赶紧晒一下吧~",
                    showCancel: !1,
                    confirmText: "好的",
                    confirmColor: "#333",
                    success: function(t) {
                        wx.navigateBack({});
                    }
                });
            }
        });
    },
    formSubmit: function(t) {
        this.setData({
            maskHidden: !1
        }), wx.hideToast(), this.createNewImg(), this.setData({
            maskHidden: !0
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});