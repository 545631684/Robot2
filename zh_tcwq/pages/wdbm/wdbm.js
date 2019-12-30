var app = getApp();

Page({
    data: {
        refresh_top: !1,
        postlist: [],
        page: 1
    },
    tzxq: function(t) {
        console.log(t.currentTarget.dataset), "3" != t.currentTarget.dataset.state ? wx.navigateTo({
            url: "../hdzx/hdzxinfo?hdid=" + t.currentTarget.dataset.id
        }) : wx.navigateTo({
            url: "hxq?hdid=" + t.currentTarget.dataset.id + "&hxid=" + t.currentTarget.dataset.hxid
        });
    },
    reload: function(t) {
        var e = this, a = wx.getStorageSync("users").id, o = wx.getStorageSync("url"), n = wx.getStorageSync("users").img, r = e.data.page, s = e.data.postlist;
        console.log(n), app.util.request({
            url: "entry/wxapp/MyActivity",
            cachetime: "0",
            data: {
                user_id: a,
                pagesize: 10,
                page: r
            },
            success: function(t) {
                for (var a in console.log(t), e.setData({
                    page: r + 1
                }), console.log(t), t.data.length < 10 ? e.setData({
                    refresh_top: !0
                }) : e.setData({
                    refresh_top: !1
                }), s = s.concat(t.data), console.log(s), t.data) t.data[a].start_time = t.data[a].start_time.substring(0, 16), 
                t.data[a].end_time = t.data[a].end_time.substring(0, 16);
                e.setData({
                    postlist: s,
                    slide: s,
                    user_img: n,
                    url: o
                });
            }
        });
    },
    onLoad: function(t) {
        this.reload(), this.setData({
            color: wx.getStorageSync("color")
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            activeIndex: 0,
            refresh_top: !1,
            postlist: [],
            page: 1
        }), this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.page), 0 == this.data.refresh_top && this.reload();
    }
});