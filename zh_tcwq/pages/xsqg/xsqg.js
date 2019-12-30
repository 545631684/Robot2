var app = getApp();

Page({
    data: {
        navbar: [ {
            name: "全部",
            id: ""
        } ],
        selectedindex: 0,
        mask1Hidden: !0,
        img: "http://img1.imgtn.bdimg.com/it/u=4078366710,4168441355&fm=200&gp=0.jpg",
        status: 1,
        pagenum: 1,
        order_list: [],
        storelist: [],
        mygd: !1,
        jzgd: !0,
        type_id: ""
    },
    onOverallTag: function(t) {
        console.log(t), this.setData({
            mask1Hidden: !1
        });
    },
    mask1Cancel: function() {
        this.setData({
            mask1Hidden: !0
        });
    },
    selectednavbar: function(t) {
        console.log(t), this.setData({
            pagenum: 1,
            order_list: [],
            storelist: [],
            mygd: !1,
            jzgd: !0,
            selectedindex: t.currentTarget.dataset.index,
            toView: "a" + (t.currentTarget.dataset.index - 1),
            type_id: t.currentTarget.dataset.id
        }), this.reLoad();
    },
    reLoad: function() {
        var s = this, t = this.data.type_id, a = this.data.store_id || "", e = null == this.data.store_id ? 1 : "", n = this.data.pagenum, o = null == this.data.store_id ? wx.getStorageSync("city") : "", i = t;
        console.log(t, i, a, o, n), app.util.request({
            url: "entry/wxapp/QgGoods",
            cachetime: "0",
            data: {
                type_id: i,
                store_id: a,
                page: n,
                pagesize: 10,
                type: e,
                cityname: o
            },
            success: function(t) {
                console.log("分页返回的列表数据", t.data);
                for (var a = 0; a < t.data.length; a++) t.data[a].discount = (Number(t.data[a].money) / Number(t.data[a].price) * 10).toFixed(1), 
                t.data[a].yqnum = ((Number(t.data[a].number) - Number(t.data[a].surplus)) / Number(t.data[a].number) * 100).toFixed(1);
                t.data.length < 10 ? s.setData({
                    mygd: !0,
                    jzgd: !0
                }) : s.setData({
                    jzgd: !0,
                    pagenum: s.data.pagenum + 1
                });
                var e = s.data.storelist;
                e = function(t) {
                    for (var a = [], e = 0; e < t.length; e++) -1 == a.indexOf(t[e]) && a.push(t[e]);
                    return a;
                }(e = e.concat(t.data)), s.setData({
                    order_list: e,
                    storelist: e
                }), console.log(e);
            }
        });
    },
    onLoad: function(t) {
        app.pageOnLoad(this), app.setNavigationBarColor(this);
        var o = this, a = t.storeid;
        console.log(a), o.setData({
            store_id: a
        }), app.util.request({
            url: "entry/wxapp/ZbOrder",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), o.setData({
                    ZbOrder: t.data
                });
            }
        });
        var e = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/Ad",
            cachetime: "0",
            data: {
                cityname: e
            },
            success: function(t) {
                console.log(t);
                var a = [];
                for (var e in t.data) 12 == t.data[e].type && a.push(t.data[e]);
                o.setData({
                    slide: a
                });
            }
        }), app.util.request({
            url: "entry/wxapp/QgType",
            cachetime: "0",
            success: function(t) {
                var a = t.data;
                a.length <= 5 ? o.setData({
                    height: 165
                }) : 5 < a.length && o.setData({
                    height: 340
                });
                for (var e = [], s = 0, n = a.length; s < n; s += 10) e.push(a.slice(s, s + 10));
                console.log(e, a), o.setData({
                    nav: e,
                    navs: a
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Url",
            cachetime: "0",
            success: function(t) {
                console.log(t.data), o.setData({
                    url: t.data
                });
            }
        }), this.reLoad();
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
        }), this.reLoad());
    }
});