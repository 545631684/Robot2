var app = getApp();

Page({
    data: {
        dianzan: [ {
            user_img: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ3PQDXes9vbhKKv49rbGEEv0EhCwHo4BvRMhx61xtQXFlvm6ILN8TxZ8r6pM8HCgqB3icIxtQAUfw/0"
        }, {
            user_img: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ3PQDXes9vbhKKv49rbGEEv0EhCwHo4BvRMhx61xtQXFlvm6ILN8TxZ8r6pM8HCgqB3icIxtQAUfw/0"
        }, {
            user_img: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ3PQDXes9vbhKKv49rbGEEv0EhCwHo4BvRMhx61xtQXFlvm6ILN8TxZ8r6pM8HCgqB3icIxtQAUfw/0"
        } ],
        pl: [ {
            details: "哦哦哦哦哦哦",
            name: "萌得发芽",
            user_img: "https://wx.qlogo.cn/mmopen/vi_32/MMxbq4GKvwLmcq6geRVEq9iay9KaXf7D5ax2p6bgBBFcpQpAjFqygWty9by9JHH4S3klOmicq2DaHbm7IppCGoDQ/0",
            time: "2018-01-24 15:29"
        } ],
        dz: !0
    },
    dz: function() {
        var a = this, t = wx.getStorageSync("users").id, o = this.data.spid;
        console.log(t, o), app.util.request({
            url: "entry/wxapp/VideoDz",
            cachetime: "0",
            data: {
                user_id: t,
                video_id: o
            },
            success: function(t) {
                console.log(t), "点赞成功!" == t.data ? (wx.showToast({
                    title: t.data,
                    duration: 1e3
                }), a.setData({
                    dz: !a.data.dz
                }), a.reLoad()) : "取消成功!" == t.data ? (wx.showToast({
                    title: t.data,
                    duration: 1e3
                }), a.setData({
                    dz: !a.data.dz
                }), a.reLoad()) : wx.showToast({
                    title: "请求失败",
                    duration: 1e3
                });
            }
        });
    },
    bindinput: function(t) {
        console.log(t.detail.value), this.setData({
            plnr: t.detail.value
        });
    },
    bindconfirm: function() {
        this.pl();
    },
    pl: function() {
        var t = this.data.plnr, a = this, o = wx.getStorageSync("users").id, e = this.data.spid;
        console.log(t, o, e), "" == t || null == t ? wx.showToast({
            title: "评论内容为空",
            icon: "loading",
            duration: 1e3
        }) : app.util.request({
            url: "entry/wxapp/VideoPl",
            cachetime: "0",
            data: {
                user_id: o,
                video_id: e,
                content: t
            },
            success: function(t) {
                console.log(t), "评论成功!" == t.data ? (wx.showToast({
                    title: t.data,
                    duration: 1e3
                }), a.reLoad()) : wx.showToast({
                    title: "请求失败",
                    duration: 1e3
                });
            }
        });
    },
    back: function() {
        wx.redirectTo({
            url: "spzx"
        });
    },
    jrzy: function() {
        wx.reLaunch({
            url: "../index/index"
        });
    },
    fbxx: function() {
        wx.reLaunch({
            url: "../fabu/fabu/fabu"
        });
    },
    gdzx: function() {
        wx.redirectTo({
            url: "../message/message"
        });
    },
    onLoad: function(t) {
        console.log(t), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var a = this;
        a.setData({
            spid: t.spid
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                a.setData({
                    url: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Llz",
            cachetime: "0",
            data: {
                cityname: wx.getStorageSync("city"),
                type: 5
            },
            success: function(t) {
                console.log(t), a.setData({
                    unitid: t.data
                });
            }
        }), this.reLoad();
    },
    reLoad: function() {
        var o = this, t = this.data.spid, e = wx.getStorageSync("users").id;
        console.log(t, e), app.util.request({
            url: "entry/wxapp/VideoInfo",
            cachetime: "0",
            data: {
                video_id: t
            },
            success: function(t) {
                console.log(t), o.setData({
                    spinfo: t.data
                });
                for (var a = 0; a < t.data.dz.length; a++) e == t.data.dz[a].user_id && o.setData({
                    dz: !1
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
    onShareAppMessage: function() {
        var t = this;
        return console.log(t.data.url + t.data.spinfo.fm_logo), {
            title: t.data.spinfo.info.title,
            path: "zh_tcwq/pages/spzx/spzxinfo?spid=" + t.data.spid,
            imageUrl: t.data.url + t.data.spinfo.info.fm_logo,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});