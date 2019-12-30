var app = getApp(), util = require("../../../utils/util.js");

Page({
    data: {
        url: wx.getStorageSync("url")
    },
    onLoad: function(t) {
        console.log(t);
        var e = this;
        wx.getStorageSync("sjdsjid");
        wx.setNavigationBarTitle({
            title: "拼团详情"
        }), app.setNavigationBarColor(this), app.util.request({
            url: "entry/wxapp/PtGroupOrderInfo",
            cachetime: "0",
            data: {
                group_id: t.group_id
            },
            success: function(t) {
                console.log(t.data), t.data.group.dq_time = util.ormatDate(t.data.group.dq_time), 
                t.data.group.kt_time = util.ormatDate(t.data.group.kt_time);
                for (var a = 0; a < t.data.order.length; a++) t.data.order[a].time = util.ormatDate(t.data.order[a].time), 
                t.data.order[a].xf_time = util.ormatDate(t.data.order[a].xf_time), t.data.order[a].pay_time = util.ormatDate(t.data.order[a].pay_time);
                e.setData({
                    group: t.data.group,
                    groupinfo: t.data
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {}
});