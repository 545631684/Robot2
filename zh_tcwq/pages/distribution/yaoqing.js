var app = getApp(), util = require("../../../utils/util.js");

Page({
    data: {
        havecode: !1,
        fwxy: !0,
        wdtd: 0
    },
    ljyq: function() {
        var t = this.data.fxset, a = this.data.wdsq;
        console.log(t, a), "1" == t.is_fx ? a ? ("1" == a.state && wx.showModal({
            title: "提示",
            content: "您的申请正在审核中，请耐心等待"
        }), "2" == a.state && this.setData({
            share_modal_active: "active"
        }), "3" == a.state && wx.showModal({
            title: "提示",
            content: "您的申请已被拒绝，点击确定重新申请",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), wx.navigateTo({
                    url: "distribution"
                })) : t.cancel && console.log("用户点击取消");
            }
        })) : (console.log("不是分销商"), wx.navigateTo({
            url: "distribution"
        })) : (console.log("未开启审核"), this.setData({
            share_modal_active: "active"
        }));
    },
    onLoad: function(t) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this, a = wx.getStorageSync("users").id, s = wx.getStorageSync("users").name, o = wx.getStorageSync("url");
        console.log(a), app.util.request({
            url: "entry/wxapp/FxSet",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), e.setData({
                    img: t.data.img,
                    url: o,
                    fxset: t.data
                }), "1" == t.data.is_fx && (console.log("开启分销审核"), app.util.request({
                    url: "entry/wxapp/MyDistribution",
                    cachetime: "0",
                    data: {
                        user_id: a
                    },
                    success: function(t) {
                        console.log(t.data), e.setData({
                            wdsq: t.data
                        }), t.data ? "2" == t.data.state && e.setData({
                            havecode: !0
                        }) : (console.log("不是分销商"), e.setData({
                            havecode: !1
                        }));
                    }
                })), "2" == t.data.is_fx && (console.log("未开启审核"), app.util.request({
                    url: "entry/wxapp/MyDistribution",
                    cachetime: "0",
                    data: {
                        user_id: a
                    },
                    success: function(t) {
                        console.log(t.data), e.setData({
                            wdsq: t.data
                        });
                    }
                }), e.setData({
                    havecode: !0
                }));
            }
        }), app.util.request({
            url: "entry/wxapp/MyCode",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    code: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/system",
            cachetime: "0",
            success: function(t) {
                console.log(t), e.setData({
                    system: t.data,
                    link_logo: t.data.link_logo,
                    pt_name: t.data.pt_name,
                    userid: a,
                    username: s
                });
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    userinfo: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/YjtxList",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    txmx: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Earnings",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t);
                for (var a = 0; a < t.data.length; a++) t.data[a].time = util.ormatDate(t.data[a].time);
                e.setData({
                    symx: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MyTeam",
            cachetime: "0",
            data: {
                user_id: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    wdtd: t.data.one.length + t.data.two.length
                });
            }
        });
    },
    previewimg: function() {
        wx.previewImage({
            urls: [ this.data.code ]
        });
    },
    showShareModal: function() {
        this.setData({
            share_modal_active: "active",
            no_scroll: !0
        });
    },
    shareModalClose: function() {
        this.setData({
            share_modal_active: "",
            no_scroll: !1
        });
    },
    mdmfx: function() {
        this.setData({
            share_modal_active: "",
            no_scroll: !1,
            fwxy: !1
        });
    },
    yczz: function() {
        this.setData({
            fwxy: !0
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            havecode: !1
        }), this.onShow();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return console.log(this.data.pt_name, this.data.userid, this.data.username), console.log(t), 
        "menu" !== t.from && {
            title: this.data.username + "邀请你来看看" + this.data.pt_name,
            path: "zh_tcwq/pages/index/index?userid=" + this.data.userid,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});