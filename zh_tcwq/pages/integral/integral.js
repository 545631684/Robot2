var app = getApp();

Page({
    data: {
        slide: [ {
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/tdJ70qw1fEfjfVJfFDD09570eqF28d.jpg"
        }, {
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/k5JQwpBfpb0u8sNNy5l5bhlnrhl33W.jpg"
        }, {
            logo: "http://opocfatra.bkt.clouddn.com/images/0/2017/10/zUeEednDedmUkIUumN9XI6IXU91eko.jpg"
        } ],
        fenlei: [],
        commodity: []
    },
    tzweb: function(t) {
        console.log(t.currentTarget.dataset.index, this.data.lblist);
        var e = this.data.lblist[t.currentTarget.dataset.index], o = t.currentTarget.dataset.sjtype;
        console.log(e), "1" == e.state && wx.redirectTo({
            url: e.src
        }), "2" == e.state && wx.navigateTo({
            url: "../car/car?vr=" + e.id + "&sjtype=" + o,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }), "3" == e.state && wx.navigateToMiniProgram({
            appId: e.appid,
            success: function(t) {
                console.log(t);
            }
        });
    },
    onLoad: function(t) {
        var e = wx.getStorageSync("url"), o = wx.getStorageSync("city");
        this.setData({
            url: e
        }), wx.hideShareMenu({}), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
        var a = this;
        this.reLoad(), app.util.request({
            url: "entry/wxapp/Ad3",
            cachetime: "0",
            data: {
                ctiyname: o
            },
            success: function(t) {
                console.log(t), a.setData({
                    lblist: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Jftype",
            cachetime: "0",
            success: function(t) {
                console.log(t), a.setData({
                    fenlei: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/JfGoods",
            cachetime: "0",
            success: function(t) {
                console.log(t), a.setData({
                    commodity: t.data
                });
            }
        });
    },
    reLoad: function() {
        var e = this, t = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log(t), e.setData({
                    integral: t.data.total_score
                });
            }
        });
    },
    record: function(t) {
        wx.navigateTo({
            url: "record/record"
        });
    },
    interinfo: function(t) {
        console.log(t.currentTarget.id), wx.navigateTo({
            url: "integralinfo/integralinfo?id=" + t.currentTarget.id
        });
    },
    cxfl: function(t) {
        console.log(t.currentTarget.id);
        var e = this;
        app.util.request({
            url: "entry/wxapp/JftypeGoods",
            cachetime: "0",
            data: {
                type_id: t.currentTarget.id
            },
            success: function(t) {
                console.log(t), e.setData({
                    commodity: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        this.reLoad();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});