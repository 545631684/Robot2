var app = getApp();

Page({
    data: {
        items: [ {
            name: "USA",
            value: "一天  费用 0.2 元"
        }, {
            name: "CHN",
            value: "一月  费用 20 元",
            checked: "true"
        }, {
            name: "BRA",
            value: "一年  费用 200 元"
        } ],
        region: [ "广东省", "广州市", "海珠区" ],
        index: 0,
        index1: 0,
        multiIndex: [ 0, 0 ]
    },
    radioChange: function(a) {
        console.log("radio发生change事件，携带value值为：", a.detail.value), this.setData({
            radio: a.detail.value
        });
    },
    bindRegionChange: function(a) {
        console.log("picker发送选择改变，携带值为", a.detail.value), this.setData({
            region: a.detail.value
        });
    },
    bindMultiPickerColumnChange: function(a) {
        var e = this, t = a.detail.value, n = (a.detail.column, e.data.nav);
        if (0 == a.detail.column) {
            var o = n[0][t], i = e.data.store, l = [];
            for (var c in l[0] = a.detail.value, l[1] = 0, i) if (i[c].type_name == o) {
                i[c].id;
                app.util.request({
                    url: "entry/wxapp/StoreType2",
                    cachetime: "0",
                    data: {
                        type_id: i[c].id
                    },
                    success: function(a) {
                        var t = [];
                        a.data.map(function(a) {
                            var e;
                            e = a.name, t.push(e);
                        }), n[1] = t, e.setData({
                            nav: n,
                            multiIndex: l
                        });
                    }
                });
            }
        } else e.setData({
            multiIndex: [ e.data.multiIndex[0], a.detail.value ]
        });
    },
    onLoad: function(a) {
        this.refresh();
    },
    refresh: function(a) {
        var i = this;
        app.util.request({
            url: "entry/wxapp/StoreType",
            cachetime: "0",
            success: function(a) {
                console.log(a);
                var o = a.data, t = [];
                o.map(function(a) {
                    var e;
                    e = a.type_name, t.push(e);
                }), console.log(t), app.util.request({
                    url: "entry/wxapp/StoreType2",
                    cachetime: "0",
                    data: {
                        type_id: o[0].id
                    },
                    success: function(a) {
                        console.log(a), o[0].classification = a.data;
                        var t = [];
                        o[0].classification.map(function(a) {
                            var e;
                            e = a.name, t.push(e);
                        }), console.log(t);
                        var n = [];
                        o.map(function(a) {
                            var e;
                            e = a.type_name, n.push(e);
                        });
                        var e = [];
                        e[0] = n, e[1] = t, console.log(e), i.setData({
                            nav: e,
                            store: o
                        });
                    }
                });
            }
        });
    },
    name: function(a) {
        console.log(a), this.setData({
            name: a.detail.value
        });
    },
    address: function(a) {
        console.log(a), this.setData({
            address: a.detail.value
        });
    },
    tel: function(a) {
        console.log(a), this.setData({
            tel: a.detail.value
        });
    },
    text: function(a) {
        console.log(a), this.setData({
            text: a.detail.value
        });
    },
    apply: function(a) {
        var e = this;
        console.log(e.data);
        e.data.region;
        var t = e.data.name, n = e.data.address, o = e.data.tel, i = e.data.text, l = "";
        null == t ? l = "请输入公司名称" : null == n ? l = "请输入公司地址" : null == o ? l = "请输入联系电话" : null == i && (l = "请输入关键字"), 
        "" != l && wx.showModal({
            title: "提示",
            content: l,
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
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