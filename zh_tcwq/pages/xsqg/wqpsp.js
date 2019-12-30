var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        color: "#34aaff",
        tablist: [ "已通过", "待审核", "已拒绝" ],
        status: 0,
        order_list: [],
        show_no_data_tip: !1,
        hide: 1,
        qrcode: "",
        pagenum: 1,
        storelist: [],
        mygd: !1,
        jzgd: !0
    },
    tabclick: function(t) {
        console.log(t), this.setData({
            status: t.currentTarget.dataset.index,
            order_list: [],
            pagenum: 1,
            storelist: [],
            mygd: !1,
            jzgd: !0
        }), this.reLoad();
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "我的抢购商品"
        }), app.setNavigationBarColor(this);
        var a = this;
        app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(t) {
                console.log(t), a.setData({
                    System: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), a.setData({
                    url: t.data
                });
            }
        });
        console.log(t), this.setData({
            store_id: t.store_id
        }), this.reLoad();
    },
    reLoad: function() {
        var t, o = this, a = this.data.status, e = this.data.store_id, s = this.data.pagenum;
        0 == a && (t = "2"), 1 == a && (t = "1"), 2 == a && (t = "3"), console.log(a, t, e, s), 
        app.util.request({
            url: "entry/wxapp/StoreGood",
            cachetime: "0",
            data: {
                is_tg: t,
                store_id: e,
                page: s,
                pagesize: 10
            },
            success: function(t) {
                console.log("分页返回的列表数据", t.data);
                for (var a = 0; a < t.data.length; a++) t.data[a].dq_time = util.ormatDate(t.data[a].dq_time);
                t.data.length < 10 ? o.setData({
                    mygd: !0,
                    jzgd: !0
                }) : o.setData({
                    jzgd: !0,
                    pagenum: o.data.pagenum + 1
                });
                var e = o.data.storelist;
                e = function(t) {
                    for (var a = [], e = 0; e < t.length; e++) -1 == a.indexOf(t[e]) && a.push(t[e]);
                    return a;
                }(e = e.concat(t.data)), o.setData({
                    order_list: e,
                    storelist: e
                }), console.log(e);
            }
        });
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.pagenum);
        !this.data.mygd && this.data.jzgd && (this.setData({
            jzgd: !1
        }), this.reLoad());
    },
    sjxj: function(t) {
        var a = this, e = t.currentTarget.dataset.id, o = t.currentTarget.dataset.state;
        console.log(e, o), wx.showModal({
            title: "提示",
            content: "是否执行上架下架操作？",
            cancelText: "否",
            confirmText: "是",
            success: function(t) {
                if (t.cancel) return !0;
                t.confirm && (wx.showLoading({
                    title: "操作中"
                }), app.util.request({
                    url: "entry/wxapp/AddQgGood",
                    cachetime: "0",
                    data: {
                        id: e,
                        state: "1" == o ? 2 : 1
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "操作成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "wqpsp?store_id=" + a.data.store_id
                            });
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                }));
            }
        });
    },
    orderRevoke: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        console.log(e), wx.showModal({
            title: "提示",
            content: "是否删除该商品？",
            cancelText: "否",
            confirmText: "是",
            success: function(t) {
                if (t.cancel) return !0;
                t.confirm && (wx.showLoading({
                    title: "操作中"
                }), app.util.request({
                    url: "entry/wxapp/DelQgGood",
                    cachetime: "0",
                    data: {
                        id: e
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data ? (wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 1e3
                        }), setTimeout(function() {
                            wx.redirectTo({
                                url: "wqpsp?store_id=" + a.data.store_id
                            });
                        }, 1e3)) : wx.showToast({
                            title: "请重试",
                            icon: "loading",
                            duration: 1e3
                        });
                    }
                }));
            }
        });
    },
    bjsp: function(t) {
        wx.navigateTo({
            url: "bjqgsp?spid=" + t.currentTarget.dataset.id
        });
    },
    hide: function(t) {
        this.setData({
            hide: 1
        });
    },
    hxqh: function(t) {
        var a = this, e = t.currentTarget.dataset.id, o = t.currentTarget.dataset.sjid;
        console.log(e, o), wx.showLoading({
            title: "加载中",
            mask: !0
        }), app.util.request({
            url: "entry/wxapp/QgOrderCode",
            cachetime: "0",
            data: {
                order_id: e
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    hx_code: t.data,
                    hide: 2
                });
            }
        });
    }
});