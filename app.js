App({
    onLaunch: function() {},
    onShow: function() {},
    onHide: function() {
        console.log(getCurrentPages());
    },
    onError: function(e) {
        console.log(e);
    },
    getUrl: function(o) {
        var e = this.globalData.url;
        console.log(e, o), o.setData({
            url: e
        });
        var t = this;
        e || t.util.request({
            url: "entry/wxapp/Url",
            success: function(e) {
                console.log(e), wx.setStorageSync("url", e.data), t.globalData.url = e.data, t.getUrl(o);
            }
        });
    },
    setNavigationBarColor: function(o) {
        var e = this.globalData.color;
        console.log(e, o), e && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e
        }), o.setData({
            color: e
        });
        var t = this;
        e || t.util.request({
            url: "entry/wxapp/System",
            success: function(e) {
                console.log(e), getApp().xtxx = e.data, t.globalData.color = e.data.color || "ED414A", 
                t.setNavigationBarColor(o);
            }
        });
    },
    getUser: function(n) {
        var s = this;
        wx.login({
            success: function(e) {
                var o = e.code;
                wx.setStorageSync("code", o), wx.getUserInfo({
                    success: function(e) {
                        console.log(e), wx.setStorageSync("user_info", e.userInfo);
                        var t = e.userInfo.nickName, a = e.userInfo.avatarUrl;
                        s.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: o
                            },
                            success: function(e) {
                                console.log(e), wx.setStorageSync("key", e.data.session_key), wx.setStorageSync("openid", e.data.openid);
                                var o = e.data.openid;
                                s.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: o,
                                        img: a,
                                        name: t
                                    },
                                    success: function(e) {
                                        console.log(e), wx.setStorageSync("users", e.data), wx.setStorageSync("uniacid", e.data.uniacid), 
                                        n(e.data);
                                    }
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        wx.getSetting({
                            success: function(e) {
                                0 == e.authSetting["scope.userInfo"] && wx.openSetting({
                                    success: function(e) {
                                        e.authSetting["scope.userInfo"], s.getUser(n);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    getUserInfo: function(o) {
        var t = this, e = this.globalData.userInfo;
        console.log(e), e ? "function" == typeof o && o(e) : wx.login({
            success: function(e) {
                wx.showLoading({
                    title: "正在登录",
                    mask: !0
                }), console.log(e.code), t.util.request({
                    url: "entry/wxapp/Openid",
                    cachetime: "0",
                    data: {
                        code: e.code
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    dataType: "json",
                    success: function(e) {
                        console.log("openid信息", e.data), getApp().getOpenId = e.data.openid, getApp().getSK = e.data.session_key, 
                        t.util.request({
                            url: "entry/wxapp/login",
                            cachetime: "0",
                            data: {
                                openid: e.data.openid
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            dataType: "json",
                            success: function(e) {
                                console.log("用户信息", e), getApp().getuniacid = e.data.uniacid, wx.setStorageSync("users", e.data), 
                                t.globalData.userInfo = e.data, "function" == typeof o && o(t.globalData.userInfo);
                            }
                        });
                    },
                    fail: function(e) {},
                    complete: function(e) {}
                });
            }
        });
    },
    getLocation: function(o) {
        wx.getLocation({
            type: "wgs84",
            success: function(e) {
                "function" == typeof o && o(e);
            },
            fail: function() {
                wx.getSetting({
                    success: function(e) {
                        console.log(e), 0 == e.authSetting["scope.userLocation"] && wx.showModal({
                            title: "提示",
                            content: "您暂未授权位置信息无法正常使用,请在（右上角 - 关于 - 右上角 - 设置）中开启位置信息授权后，下拉刷新即可正常使用"
                        });
                    }
                });
            },
            complete: function(e) {}
        });
    },
    pageOnLoad: function(n) {
        var s = this;
        function c(e) {
            console.log(e);
            var o = !1, t = n.route || n.__route__ || null;
            for (var a in e.navs) e.navs[a].url === "/" + t ? o = e.navs[a].active = !0 : e.navs[a].active = !1;
            o && n.setData({
                _navbar: e
            });
        }
        console.log("----setPageNavbar----"), console.log(n);
        var l = {
            background_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",
            border_color: "rgba(0,0,0,.1)"
        }, e = s.globalData.navbar;
        console.log(e), e && c(e), e || s.util.request({
            url: "entry/wxapp/GetBottom",
            success: function(a) {
                if (console.log(a), 0 != a.data.length && a.data) l.navs = a.data, c(l), s.globalData.navbar = l, 
                s.util.request({
                    url: "entry/wxapp/Url",
                    cachetime: "0",
                    success: function(e) {
                        console.log(e.data);
                        var o = e.data;
                        for (var t in a.data) a.data[t].logo = o + a.data[t].logo, a.data[t].logo2 = o + a.data[t].logo2;
                        l.navs = a.data, c(l), s.globalData.navbar = l;
                    }
                }); else {
                    l.navs = [ {
                        logo: "https://wechat.ql888.net/attachment/Robot/images/shouye-foucs.png",
                        logo2: "https://wechat.ql888.net/attachment/Robot/images/shouye.png",
                        title: "首页",
                        title_color: "#f44444",
                        title_color2: "#888",
                        url: "/zh_tcwq/pages/index/index"
                    }, {
                        logo: "https://wechat.ql888.net/attachment/Robot/images/zixun1.png",
                        logo2: "https://wechat.ql888.net/attachment/Robot/images/zixun.png",
                        title: "分类信息",
                        title_color: "#f44444",
                        title_color2: "#888",
                        url: "/zh_tcwq/pages/type/type"
                    }, {
                        logo: "https://wechat.ql888.net/attachment/Robot/images/6.png",
                        logo2: "https://wechat.ql888.net/attachment/Robot/images/6.png",
                        title: "机器人",
                        title_color: "#f44444",
                        title_color2: "#888",
                        url: "/zh_tcwq/pages2/index/index"
                    }, {
                        logo: "https://wechat.ql888.net/attachment/Robot/images/dianpu-foucs.png",
                        logo2: "https://wechat.ql888.net/attachment/Robot/images/dianpu.png",
                        title: "商家",
                        title_color: "#f44444",
                        title_color2: "#888",
                        url: "/zh_tcwq/pages/store/store"
                    }, {
                        logo: "https://wechat.ql888.net/attachment/Robot/images/wode-foucs.png",
                        logo2: "https://wechat.ql888.net/attachment/Robot/images/wode.png",
                        title: "我的",
                        title_color: "#f44444",
                        title_color2: "#888",
                        url: "/zh_tcwq/pages/logs/logs"
                    } ], c(l), s.globalData.navbar = l;
                }
            }
        });
    },
    pageOnLoad2: function(n) {
        var s = this;
        function c(e) {
            console.log(e);
            var o = !1, t = n.route || n.__route__ || null;
            for (var a in e.navs) e.navs[a].url === "/" + t ? o = e.navs[a].active = !0 : e.navs[a].active = !1;
            o && n.setData({
                _navbar: e
            });
        }
        console.log("----setPageNavbar----"), console.log(n);
        var l = {
            background_image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEX///+nxBvIAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==",
            border_color: "rgba(0,0,0,.1)"
        }
        l.navs = [ {
          logo: "https://wechat.ql888.net/attachment/Robot/images/1.png",
          logo2: "https://wechat.ql888.net/attachment/Robot/images/1-1.png",
            title: "首页",
          title_color: "#5ba4d1",
          title_color2: "#d8d8d8",
            url: "/zh_tcwq/pages2/index/index"
        }, {
            logo: "https://wechat.ql888.net/attachment/Robot/images/3.png",
            logo2: "https://wechat.ql888.net/attachment/Robot/images/3-1.png",
            title: "机器人",
            title_color: "#5ba4d1",
            title_color2: "#d8d8d8",
            url: "/zh_tcwq/pages2/robot/index"
        }, {
            logo: "https://wechat.ql888.net/attachment/Robot/images/7.png",
            logo2: "https://wechat.ql888.net/attachment/Robot/images/7.png",
            title: "返回商城",
            title_color: "#f66806",
            title_color2: "#f66806",
            url: "/zh_tcwq/pages/index/index"
        }, {
            logo: "https://wechat.ql888.net/attachment/Robot/images/4.png",
            logo2: "https://wechat.ql888.net/attachment/Robot/images/4-1.png",
            title: "数据",
            title_color: "#5ba4d1",
            title_color2: "#d8d8d8",
            url: "/zh_tcwq/pages2/information/index"
        }, {
            logo: "https://wechat.ql888.net/attachment/Robot/images/5.png",
            logo2: "https://wechat.ql888.net/attachment/Robot/images/5-1.png",
            title: "我的",
            title_color: "#5ba4d1",
            title_color2: "#d8d8d8",
            url: "/zh_tcwq/pages2/personal/index"
        } ], c(l)        
    },
    ormatDate: function(e) {
        var o = new Date(1e3 * e);
        return o.getFullYear() + "-" + t(o.getMonth() + 1, 2) + "-" + t(o.getDate(), 2) + " " + t(o.getHours(), 2) + ":" + t(o.getMinutes(), 2) + ":" + t(o.getSeconds(), 2);
        function t(e, o) {
            for (var t = "" + e, a = t.length, n = "", s = o; s-- > a; ) n += "0";
            return n + t;
        }
    },
    ab: function(e) {},
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    tabBar: {
        color: "#123",
        selectedColor: "#1ba9ba",
        borderStyle: "#1ba9ba",
        backgroundColor: "#fff",
        list: [ {
            pagePath: "/we7/pages/index/index",
            iconPath: "/we7/resource/icon/home.png",
            selectedIconPath: "/we7/resource/icon/homeselect.png",
            text: "首页"
        }, {
            pagePath: "/we7/pages/user/index/index",
            iconPath: "/we7/resource/icon/user.png",
            selectedIconPath: "/we7/resource/icon/userselect.png",
            text: "微擎我的"
        } ]
    },
    globalData: {
        userInfo: null
    }
});