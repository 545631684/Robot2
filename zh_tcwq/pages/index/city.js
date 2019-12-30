var qqmapsdk, app = getApp(), QQMapWX = require("../../../utils/qqmap-wx-jssdk.js");

Page({
    data: {
        dqwz: "定位中...",
        hotcityList: [ {
            cityCode: 11e4,
            city: "北京市"
        }, {
            cityCode: 31e4,
            city: "上海市"
        }, {
            cityCode: 440100,
            city: "广州市"
        }, {
            cityCode: 440300,
            city: "深圳市"
        }, {
            cityCode: 330100,
            city: "杭州市"
        }, {
            cityCode: 320100,
            city: "南京市"
        }, {
            cityCode: 420100,
            city: "武汉市"
        }, {
            cityCode: 12e4,
            city: "天津市"
        }, {
            cityCode: 610100,
            city: "西安市"
        } ],
        commonCityList: [ {
            cityCode: 11e4,
            city: "北京市"
        }, {
            cityCode: 31e4,
            city: "上海市"
        } ],
        countyList: [ {
            cityCode: 11e4,
            county: "A区"
        }, {
            cityCode: 31e4,
            county: "B区"
        }, {
            cityCode: 440100,
            county: "C区"
        }, {
            cityCode: 440300,
            county: "D区"
        }, {
            cityCode: 330100,
            county: "E县"
        }, {
            cityCode: 320100,
            county: "F县"
        }, {
            cityCode: 420100,
            county: "G县"
        } ],
        region: [ "北京市", "北京市", "东城区" ],
        radioItems: []
    },
    bindRegionChange: function(e) {
        var t = e.detail.value, o = [], a = this.data.System.dw_more;
        if (console.log("picker发送选择改变，携带值为", e.detail.value, a), "2" == a) for (var i = 1; i < t.length; i++) {
            var c = {};
            "县" == t[i] ? c.name = t[i - 1] : c.name = t[i], c.value = i, o.push(c);
        }
        "1" == a && ((c = {}).name = t[2], c.value = 2, o.push(c));
        console.log(o), o[0].checked = !0, this.setData({
            region: e.detail.value,
            radioItems: o
        });
    },
    radioChange: function(e) {
        console.log("radio发生change事件，携带value值为：", e.detail.value);
        for (var t = this.data.radioItems, o = 0, a = t.length; o < a; ++o) t[o].checked = t[o].name == e.detail.value;
        this.setData({
            radioItems: t
        });
    },
    formSubmit: function(e) {
        console.log("form发生了submit事件，携带数据为：", e.detail.value);
        var t = e.detail.value.radiogroup;
        console.log(t), wx.setStorageSync("city", t);
        var o = getCurrentPages(), a = (o[o.length - 1], o[o.length - 2]);
        a.setData({
            city: t,
            page: 1,
            activeIndex: 0,
            swipecurrent: 0,
            seller: []
        }), a.reload(), a.refresh(), a.seller(), wx.setStorageSync("city_type", 1), wx.navigateBack({
            url: "index"
        });
    },
    onLoad: function(e) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), t.setData({
                    System: e.data
                }), qqmapsdk = new QQMapWX({
                    key: e.data.mapkey
                }), t.getLocation();
            }
        });
    },
    getLocation: function() {
        var n = this;
        wx.getLocation({
            type: "wgs84",
            success: function(e) {
                console.log(e), qqmapsdk.reverseGeocoder({
                    coord_type: 1,
                    location: {
                        latitude: e.latitude,
                        longitude: e.longitude
                    },
                    success: function(e) {
                        console.log(e), n.setData({
                            dqwz: e.result.formatted_addresses.recommend,
                            region: [ e.result.address_component.province, e.result.address_component.city, e.result.address_component.district ]
                        });
                        var t = n.data.region, o = [], a = n.data.System.dw_more;
                        if (console.log(t, a), "2" == a) for (var i = 1; i < t.length; i++) {
                            var c = {};
                            "县" == t[i] ? c.name = t[i - 1] : c.name = t[i], c.value = i, o.push(c);
                        }
                        "1" == a && ((c = {}).name = t[2], c.value = 2, o.push(c));
                        console.log(o), o[0].checked = !0, n.setData({
                            radioItems: o
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    },
                    complete: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});