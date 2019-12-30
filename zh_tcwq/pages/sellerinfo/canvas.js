var app = getApp();

Page({
    data: {},
    onLoad: function(l) {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    width: t.windowWidth,
                    height: t.windowHeight,
                    v_wid: t.windowWidth - 40
                });
                for (var e = t.windowWidth - 110, o = [], i = 0, n = l.title.length; i < n; i += e / 14) o.push(l.title.slice(i, i + e / 14));
                wx.downloadFile({
                    url: l.url + l.img,
                    success: function(t) {
                        console.log(t), a.setData({
                            logo1: t.tempFilePath,
                            op: l,
                            row: o
                        }), a.canvas();
                    }
                });
            }
        });
    },
    canvas: function(t) {
        var e = this.data, o = e.width, i = e.height, n = o - 60, l = o, a = e.row, s = wx.getStorageSync("users").name;
        console.log(e);
        var c = wx.createCanvasContext("firstCanvas");
        c.rect(0, 0, o, i), c.setFillStyle("#fff"), c.fill(), c.fillStyle = "red", c.setFontSize(16), 
        c.fillText(s, 10, 30), c.fillStyle = "#222", c.setFontSize(16), c.fillText("分享给你一个商品", 10 + 17 * s.length, 30), 
        c.drawImage(e.logo1, 10, 50, n, l), c.drawImage(e.op.logo, o - 130, n + 140, 80, 80), 
        c.fillStyle = "#333", c.setFontSize(12), console.log(a);
        for (var f = 0; f < a.length; f++) console.log(a[f]), c.fillText(a[f], 10, l + 80 + 20 * f);
        c.fillStyle = "red", c.setFontSize(16), c.fillText("￥", 10, l + 130), c.fillStyle = "red", 
        c.setFontSize(22), c.fillText(e.op.price, 30, l + 130), c.fillStyle = "#ccc", c.setFontSize(14), 
        c.fillText("长按识别小程序码访问", 10, l + 150), c.draw();
    },
    totemp: function(t) {
        var e = this.data.width, o = this.data.height;
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: e,
            height: o,
            canvasId: "firstCanvas",
            success: function(t) {
                console.log(t.tempFilePath), wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        console.log(t), wx.showToast({
                            title: "保存成功"
                        });
                    },
                    fail: function(t) {},
                    complete: function(t) {}
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});