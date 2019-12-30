var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function() {
    var c = "2.7", e = "default", h = require("./push-stat-conf.js"), d = {}, l = "", w = !1, n = 0, v = {
        uu: "",
        ak: "",
        pm: "",
        wvv: "",
        wsdk: "",
        sv: "",
        wv: "",
        nt: "",
        ww: "",
        wh: "",
        pr: "",
        pp: "",
        lat: "",
        lng: "",
        ev: "",
        st: "",
        et: "",
        ppx: "",
        ppy: "",
        v: "",
        data: "",
        fid: "",
        lang: "",
        wsr: "",
        ifo: "",
        jscode: "",
        etype: ""
    };
    Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
        if (null == this) throw new TypeError();
        var o = Object(this), e = o.length >>> 0;
        if (0 === e) return -1;
        var n = 0;
        if (1 < arguments.length && ((n = Number(arguments[1])) != n ? n = 0 : 0 != n && n != 1 / 0 && n != -1 / 0 && (n = (0 < n || -1) * Math.floor(Math.abs(n)))), 
        e <= n) return -1;
        for (var i = 0 <= n ? n : Math.max(e - Math.abs(n), 0); i < e; i++) if (i in o && o[i] === t) return i;
        return -1;
    });
    var i = function(o) {
        wx.getLocation({
            type: "wgs84",
            success: function(t) {
                v.lat = t.latitude, v.lng = t.longitude, a(o, "location", "location");
            },
            fail: function() {}
        });
    }, s = function(t, o) {
        if (!h.is_getUserinfo) return !1;
        wx.login({
            success: function(t) {
                t.code ? (v.jscode = t.code, wx.getUserInfo({
                    success: function(t) {
                        o(t);
                    },
                    fail: function(t) {
                        a(t, "user_info_close", "user_info_close");
                    }
                })) : v.jscode = 0;
            }
        });
    }, y = function(o, e, n) {
        void 0 === e && (e = "GET"), void 0 === n && (n = "d.html");
        var i = 0;
        !function t() {
            wx.request({
                url: "https://plog.xiaoshentui.com/" + n,
                data: o,
                header: {},
                method: e,
                success: function() {},
                fail: function() {
                    i < 2 && (i++, o.retryTimes = i, t());
                }
            });
        }();
    };
    function a(t, o, e) {
        var n, i = ((n = wx.getStorageSync("t_uuid")) ? v.ifo = !1 : (n = "" + Date.now() + Math.floor(1e7 * Math.random()), 
        wx.setStorageSync("t_uuid", n), wx.setStorageSync("ifo", 1), v.ifo = !0), n), s = 0;
        if ("app" == o && "hide" == e) {
            var a = Date.now();
            s = wx.getStorageSync("ifo"), wx.setStorageSync("ifo", 0);
        }
        var p = "";
        p = "user_info" == o ? t.aldpush_login_data : "user_info_close" == o ? {
            status: 0
        } : "event" == o ? d : "yyy" == o ? d : 0;
        var r = "fpage" == o || "fhpage" == o ? v.fid : 0, f = "page" == o || "app" == o || "fpage" == o || "fhpage" == o ? 0 : v.jscode, u = {
            v: c,
            uu: i,
            ev: o,
            life: e,
            ak: h.app_key.replace(/(^\s*)|(\s*$)/g, ""),
            pm: v.pm ? v.pm : 0,
            wvv: v.wvv ? v.wvv : 0,
            wsdk: v.wsdk ? v.wsdk : 0,
            sv: v.sv ? v.sv : 0,
            wv: v.wv ? v.wv : 0,
            nt: v.nt ? v.nt : 0,
            ww: v.ww ? v.ww : 0,
            wh: v.wh ? v.wh : 0,
            pr: v.pr ? v.pr : 0,
            pp: v.pp ? v.pp : 0,
            lat: v.lat ? v.lat : 0,
            lng: v.lng ? v.lng : 0,
            st: v.st || 0,
            et: a || 0,
            ppx: v.ppx ? v.ppx : 0,
            ppy: v.ppy ? v.ppy : 0,
            data: p || 0,
            fid: r,
            lang: v.lang ? v.lang : 0,
            wsr: "app" == o ? t.aldpush_showOptions : {},
            ifo: s,
            jscode: f || 0,
            ust: Date.now()
        };
        t.aldpush_openid && (u.openid = t.aldpush_openid), "" === l || "event" !== o && "yyy" !== o || (u.etype = l), 
        "yyy" === o && "postevent" === e ? wx.request({
            url: "https://openapi.xiaoshentui.com/Main/action/Event/Event_upload/mobile_info",
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            data: u,
            success: function(t) {}
        }) : "yyy" === o && w ? wx.request({
            url: "https://openapi.xiaoshentui.com/Main/action/Event/Event_upload/event_report",
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            data: u,
            success: function(t) {}
        }) : y(u, "GET", "d.html");
    }
    function p(t) {
        this.app = t;
    }
    function o(t) {
        this.aldpush = new p(this);
        void 0 !== t ? (this.aldpush_showOptions = t, e = t.path, v.pp = t.path) : this.aldpush_showOptions = {};
        var o;
        wx.getNetworkType({
            success: function(t) {
                v.nt = t.networkType;
            }
        }), o = this, wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userLocation"] && i(o), t.authSetting["scope.userInfo"] && s(o, function(t) {
                    o.aldpush_login_data = t, a(o, "user_info", "userinfo");
                });
            }
        }), wx.getSystemInfo({
            success: function(t) {
                v.pm = t.model, v.wv = t.version, v.wsdk = void 0 === t.SDKVersion ? "1.0.0" : t.SDKVersion, 
                v.sv = t.system, v.wvv = t.platform, v.ww = t.screenWidth, v.wh = t.screenHeight, 
                v.pr = t.pixelRatio, v.lang = t.language;
            }
        }), wx.getSystemInfoSync({
            success: function(t) {
                v.wvv = t.platform;
            }
        }), "devtools" == v.wvv && wx.request({
            url: "https://plog.xiaoshentui.com/config/app.json",
            header: {
                AldStat: "MiniApp-Stat"
            },
            method: "GET",
            success: function(t) {
                200 === t.statusCode && t.data.push_v != c && console.warn("小神推sdk已更新,为不影响正常使用,请去官网(http://www.xiaoshentui.com/)下载最新版本");
            }
        });
    }
    function r(t) {
        var o;
        this.isShow = !0, h.is_sendEvent && (o = this, wx.onAccelerometerChange(function(t) {
            o.isShow && 1 < t.x && 1 < t.y && 3 <= (n += 1) && (w = !0, a(o, "yyy", "postevent"));
        })), this.aldpush_showOptions = void 0 !== t ? t : {}, v.st = Date.now();
    }
    function f() {
        this.isShow = !1, a(this, "app", "hide"), n = 0;
    }
    function u(t) {
        var o = this;
        void 0 !== t && (o.options = t), "default" != e && e != o.__route__ && s(o, function(t) {
            o.aldpush_login_data = t, a(o, "user_info", "userinfo");
        });
    }
    function g(t) {
        void 0 !== t && (this.options = t), v.pp = this.__route__, e = this.__route__, a(getApp(), "page", "hide");
    }
    function _(t, o) {
        for (var e = v.ww, n = v.wh, i = {
            length: [],
            is_showHideBtn: !1
        }, s = 0; s <= 50; s++) {
            var a = '-webkit-transform: scale(0.5);transform:scale(1);content:"";height:88px;width:88px;border:1px solid transparent;background-color:transparent;position:fixed;z-index: 999;left:' + Math.ceil(Math.random() * e) + "px;top:" + Math.ceil(Math.random() * n) + "px;";
            i.length.push(a);
        }
        var p = wx.getStorageSync("isShowClick");
        this.setData({
            hideBtnData: i,
            isShowClick: Boolean(p)
        });
    }
    function m(t) {
        var o = this;
        v.ppx = t.detail.target.offsetLeft, v.ppy = t.detail.target.offsetTop, v.fid = t.detail.formId, 
        s(o, function(t) {
            o.aldpush_login_data = t, a(o, "user_info", "userinfo"), wx.setStorageSync("isShowClick", "false"), 
            o.setData({
                is_showHideBtn: !0,
                isShowClick: "false"
            });
        }), h.is_Location && i(o), a(o, "fpage", "clickform");
    }
    function x(t) {
        v.ppx = t.detail.target.offsetLeft, v.ppy = t.detail.target.offsetTop, v.fid = t.detail.formId, 
        this.setData({
            is_showHideBtn: !0
        }), a(this, "fhpage", "hideclickform");
    }
    function S(t, o) {
        var e = "", n = arguments;
        if (t || (t = n), t) {
            l = void 0 === t.type ? void 0 === t.from ? 0 <= [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll" ].indexOf(o) ? "wechat_function" : "developer_function" : t.from : t.type, 
            e = void 0 !== n[0] ? n[0] : {}, d = e, 0 <= h.filterFunc.indexOf(o) || a(this, "event", o), 
            w && a(this, "yyy", o);
        }
    }
    function k(t, o, e) {
        if (t[o]) {
            var n = t[o];
            t[o] = function(t) {
                return e.call(this, t, o), n.call.apply(n, [ this ].concat(Array.prototype.slice.call(arguments)));
            };
        } else t[o] = function(t) {
            e.call(this, t, o);
        };
    }
    p.prototype.pushuserinfo = function(t, o) {
        if ("object" === (void 0 === t ? "undefined" : _typeof(t))) {
            var e = [ "encryptedData", "errMsg", "iv", "rawData", "signature", "userInfo" ];
            for (var n in t) if (e.indexOf(n) < 0) return;
            this.app.aldpush_login_data = t, "string" == typeof o && (v.jscode = o), a(this.app, "user_info", "userinfo");
        }
    }, p.prototype.setopenid = function(t) {
        "string" == typeof t && (this.app.aldpush_openid = t, a(this.app, "setopenid", "setopenid"));
    };
    var b = App;
    App = function(t) {
        k(t, "onLaunch", o), k(t, "onShow", r), k(t, "onHide", f), b(t);
    };
    var M = Page;
    Page = function(t) {
        for (var o in t) if ("function" == typeof t[o]) {
            if ("onLoad" == o) {
                k(t, "onLoad", _);
                continue;
            }
            if ("onHide" == o) {
                k(t, "onHide", g);
                continue;
            }
            k(t, o, S);
        }
        k(t, "onShow", u), k(t, "hidepushFormSubmit", x), k(t, "pushFormSubmit", m), M(t);
    };
}();