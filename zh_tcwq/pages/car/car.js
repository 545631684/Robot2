var app = getApp(), screenWidth = 0, screenHeight = 0, screenWidth1 = 0, screenHeight1 = 0, screenWidth2 = 0, screenHeight2 = 0;

Page({
    data: {},
    onLoad: function(t) {
        console.log(t);
        var e = this;
        "undefined" == t.sjtype ? app.util.request({
            url: "entry/wxapp/GetAdInfo",
            cachetime: "0",
            data: {
                ad_id: t.vr
            },
            success: function(t) {
                e.setData({
                    vr: t.data.wb_src
                });
            }
        }) : t.sjid ? app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: t.sjid
            },
            success: function(t) {
                console.log(t), e.setData({
                    vr: t.data.store[0].vr_link
                });
            }
        }) : t.goodid ? app.util.request({
            url: "entry/wxapp/GoodInfo",
            cachetime: "0",
            data: {
                id: t.goodid
            },
            success: function(t) {
                console.log(t), e.setData({
                    vr: t.data.good.vr
                });
            }
        }) : t.weburl ? e.setData({
            vr: t.weburl
        }) : app.util.request({
            url: "entry/wxapp/GetNavInfo",
            cachetime: "0",
            data: {
                nav_id: t.vr
            },
            success: function(t) {
                e.setData({
                    vr: t.data.wb_src
                });
            }
        });
    },
    canvas: function(t) {
        var e = this;
        console.log(t), wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 400,
            height: 200,
            destWidth: 400,
            destHeight: 600,
            canvasId: "firstCanvas",
            success: function(t) {
                console.log(t), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        console.log(t), wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 2e3
                        });
                    }
                }), e.setData({
                    tempFilePath: t.tempFilePath
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
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