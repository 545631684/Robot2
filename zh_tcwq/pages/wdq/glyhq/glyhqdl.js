var app = getApp();

Page({
    data: {
        bjsl: !0,
        tabs: [ "领取列表", "核销列表" ],
        activeIndex: 0,
        mygd: !1,
        jzgd: !0,
        pagenum: 1,
        lqlist: [],
        lqlb: []
    },
    tel: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    tabClick: function(t) {
        var a = this.data.params;
        "0" == t.currentTarget.id && (a.state = "", a.orderby = "a.time desc"), "1" == t.currentTarget.id && (a.state = "1", 
        a.orderby = "a.hx_time desc"), console.log(a, t.currentTarget.dataset.index), this.setData({
            activeIndex: t.currentTarget.id,
            params: a,
            mygd: !1,
            jzgd: !0,
            pagenum: 1,
            lqlist: [],
            lqlb: []
        }), this.lqlb();
    },
    ffsl: function(t) {
        console.log(t.detail.value), this.setData({
            ffsl: t.detail.value
        });
    },
    wanc: function() {
        var a = this.data.yhq.id, e = this.data.ffsl;
        return console.log(a, e), "" == e ? (wx.showModal({
            title: "提示",
            content: "修改数量不能为空"
        }), !1) : Number(e) < Number(this.data.yhq.lq_num) ? (wx.showModal({
            title: "提示",
            content: "发放数量不能少于已领取数量"
        }), !1) : (wx.showModal({
            title: "提示",
            content: "确定修改此券的发放数量为" + e + "张？",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), app.util.request({
                    url: "entry/wxapp/UpdKqNum",
                    cachetime: "0",
                    data: {
                        coupons_id: a,
                        number: e
                    },
                    success: function(t) {
                        console.log(t.data), 1 == t.data && (wx.showToast({
                            title: "编辑成功"
                        }), setTimeout(function() {
                            wx.navigateBack({});
                        }, 1e3));
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        }), void this.setData({
            bjsl: !0
        }));
    },
    bj: function() {
        this.setData({
            bjsl: !1
        });
    },
    chakan: function() {
        wx.navigateTo({
            url: "../../sellerinfo/yhqinfo?yhqid=" + this.data.yhqid + "&sjid=" + this.data.yhq.store_id
        });
    },
    sjxj: function() {
        var a = this, e = this.data.yhq, o = "1" == e.is_show ? "2" : "1";
        console.log(o), "2" == o ? wx.showModal({
            title: "提示",
            content: "确定下架吗?下架后商家页面不显示此券",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), app.util.request({
                    url: "entry/wxapp/UpdCoupon",
                    cachetime: "0",
                    data: {
                        is_show: o,
                        coupon_id: e.id
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data && (wx.showToast({
                            title: "操作成功"
                        }), setTimeout(function() {
                            a.reLoad();
                        }, 1e3));
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        }) : app.util.request({
            url: "entry/wxapp/UpdCoupon",
            cachetime: "0",
            data: {
                is_show: o,
                coupon_id: e.id
            },
            success: function(t) {
                console.log(t.data), "1" == t.data && (wx.showToast({
                    title: "操作成功"
                }), setTimeout(function() {
                    a.reLoad();
                }, 1e3));
            }
        });
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            sjid: t.sjid,
            yhqid: t.yhqid,
            params: {
                coupons_id: t.yhqid,
                state: "",
                orderby: "a.time desc"
            }
        }), this.reLoad(), this.lqlb();
    },
    reLoad: function() {
        var a = this, t = this.data.yhqid;
        app.util.request({
            url: "entry/wxapp/CouponInfo2",
            cachetime: "0",
            data: {
                coupon_id: t
            },
            success: function(t) {
                console.log(t.data), wx.setNavigationBarTitle({
                    title: "管理" + t.data.name
                }), a.setData({
                    yhq: t.data
                });
            }
        });
    },
    lqlb: function() {
        var e = this, o = e.data.pagenum;
        e.data.params.page = o, e.data.params.pagesize = 10, console.log(o, e.data.params), 
        app.util.request({
            url: "entry/wxapp/LqCouponList",
            cachetime: "0",
            data: e.data.params,
            success: function(t) {
                console.log("分页返回的门店列表数据", t.data), t.data.length < 10 ? e.setData({
                    mygd: !0,
                    jzgd: !0
                }) : e.setData({
                    jzgd: !0,
                    pagenum: o + 1
                });
                var a = e.data.lqlist;
                a = a.concat(t.data), console.log(a), e.setData({
                    lqlist: a,
                    lqlb: a
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        console.log("上拉加载", this.data.pagenum);
        !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.lqlb());
    },
    onShareAppMessage: function() {}
});