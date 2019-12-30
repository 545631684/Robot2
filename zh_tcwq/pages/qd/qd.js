var app = getApp(), util = require("../../utils/util.js"), date = new Date(), year = date.getFullYear(), month = date.getMonth() + 1, dayInMonth = date.getDate(), dayInWeek = date.getDay(), selected = [ year, month, dayInMonth ], week = [ {
    value: "日",
    class: "weekend"
}, {
    value: "一",
    class: ""
}, {
    value: "二",
    class: ""
}, {
    value: "三",
    class: ""
}, {
    value: "四",
    class: ""
}, {
    value: "五",
    class: ""
}, {
    value: "六",
    class: "weekend"
} ], isLeapYear = function(t) {
    return t % 400 == 0 || t % 4 == 0 && t % 100 != 0;
}, isToday = function(t, e, a) {
    return t == year && e == month && a == dayInMonth;
}, isWeekend = function(t, e) {
    return (t + e) % 7 == 0 || (t + e - 1) % 7 == 0;
}, calEmptyGrid = function(t, e) {
    return new Date(t + "/" + e + "/02 00:00:00").getUTCDay();
}, calDaysInMonth = function(t, e) {
    var a = isLeapYear(t);
    return 2 == month && a ? 29 : 2 != month || a ? [ 4, 6, 9, 11 ].includes(e) ? 30 : 31 : 28;
}, calWeekDay = function(t, e, a) {
    return new Date(t + "/" + e + "/" + a + " 00:00:00").getUTCDay();
}, getThisMonthDays = function(t, e) {
    return new Date(t, e, 0).getDate();
}, calDays = function(t, e) {
    for (var a = getThisMonthDays(t, e), s = calEmptyGrid(t, e), n = [], o = 1; o <= a; o++) {
        var r = isToday(t, e, o), l = selected[0] == t && selected[1] == e && selected[2] == o, i = r ? "today" : "", c = l ? "selected" : "", d = {
            value: o,
            date: [ t, e, o ],
            class: "date-bg " + (isWeekend(s, o) ? "weekend" : "") + " " + i + " " + c + " " + (r && l ? "today-selected" : "")
        };
        n.push(d);
    }
    return n.slice(0, calDaysInMonth(t, e));
};

Page({
    data: {
        currYear: year,
        currMonth: month,
        week: week,
        emptyGrids: calEmptyGrid(year, month),
        days: calDays(year, month),
        selected: selected,
        disabled: !1,
        logintext: "点击签到",
        lxts: 0,
        isbq: !1,
        bqtext: "点击补签",
        fwxy: !0,
        djqd: !0,
        qdtc: !0
    },
    gbrl: function() {
        this.setData({
            djqd: !0
        });
    },
    qqd: function() {
        this.setData({
            djqd: !1
        });
    },
    ycqdtc: function() {
        this.setData({
            qdtc: !0
        });
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    onLoad: function() {
        function t() {
            var t = new Date(), e = t.getMonth() + 1, a = t.getDate();
            return [ t.getFullYear(), e, a ];
        }
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), console.log(this.data.days, this.data.selected), console.log(t()), this.setData({
            nowtime: t(),
            url: wx.getStorageSync("url")
        });
        var e = this, a = wx.getStorageSync("user_info");
        console.log(a), app.util.request({
            url: "entry/wxapp/Signset",
            cachetime: "0",
            success: function(t) {
                console.log("签到设置", t), e.setData({
                    qdset: t.data,
                    userinfo: a
                }), e.reLoad();
            }
        }), app.util.request({
            url: "entry/wxapp/ContinuousList",
            cachetime: "0",
            success: function(t) {
                console.log("查看连签奖励", t), e.setData({
                    jl: t.data
                });
            }
        }), this.lqts();
    },
    rank: function() {
        var a = this, t = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/JrRank",
            cachetime: "0",
            data: {
                page: 1,
                pagesize: 10
            },
            success: function(t) {
                for (var e in console.log("JrRank", t.data), t.data) t.data[e].time3 = app.ormatDate(t.data[e].time3).substring(11);
                a.setData({
                    ranklist: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/MyJrRank",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log("MyJrRank", t.data), a.setData({
                    MyRank: t.data
                });
            }
        });
    },
    in_array: function(t, e) {
        for (var a = 0; a < e.length; a++) {
            if (e[a].toString() == t) return !0;
        }
        return !1;
    },
    lqts: function() {
        this.setData({
            isbq: !1
        });
        var e = this, t = wx.getStorageSync("users").id;
        console.log(t), app.util.request({
            url: "entry/wxapp/Continuous",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log("查看连续签到天数", t), e.setData({
                    lxts: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Isbq",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log("isbq", t), e.setData({
                    havebq: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/UserInfo",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(t) {
                console.log("个人信息", t), e.setData({
                    grjf: t.data.total_score
                });
            }
        });
    },
    reLoad: function() {
        var d = this, u = wx.getStorageSync("users").id;
        console.log(u), app.util.request({
            url: "entry/wxapp/MySign",
            cachetime: "0",
            data: {
                user_id: u
            },
            success: function(t) {
                console.log("我的签到", t), d.setData({
                    wdqd: t.data
                });
                for (var e = [], c = d.data.days, a = 0; a < t.data.length; a++) e.push(t.data[a].time);
                console.log(e, c), d.in_array(d.data.nowtime.toString(), e) ? (console.log("今日已签到"), 
                d.setData({
                    disabled: !0,
                    logintext: "今日已签到"
                })) : (console.log("今日未签到"), d.setData({
                    disabled: !1,
                    logintext: "点击签到"
                }));
                for (var s = 0; s < c.length; s++) d.in_array(c[s].date.toString(), e) && (c[s].isqd = 1);
                app.util.request({
                    url: "entry/wxapp/Special",
                    cachetime: "0",
                    success: function(t) {
                        console.log("Special", t);
                        for (var e = t.data, a = 0; a < e.length; a++) {
                            e[a].day = e[a].day.split("-");
                            var s = new Date(e[a].day[0], e[a].day[1] - 1, e[a].day[2]), n = s.getFullYear(), o = s.getMonth() + 1, r = s.getDate();
                            e[a].day = n + "," + o + "," + r;
                        }
                        console.log(e), d.setData({
                            special: e
                        });
                        for (var l = 0; l < c.length; l++) for (var i = 0; i < e.length; i++) c[l].date.toString() == e[i].day && (c[l].tsrq = e[i]);
                        d.setData({
                            days: c
                        }), app.util.request({
                            url: "entry/wxapp/MyJrSign",
                            cachetime: "0",
                            data: {
                                user_id: u
                            },
                            success: function(t) {
                                console.log("jrsfqd", t), "2" == t.data && (console.log("未签到"), d.qd()), "1" == t.data && (console.log("已签到"), 
                                app.util.request({
                                    url: "entry/wxapp/MyJrJf",
                                    cachetime: "0",
                                    data: {
                                        user_id: u
                                    },
                                    success: function(t) {
                                        console.log("MyJrJf", t), d.setData({
                                            qdddjf: t.data
                                        });
                                    }
                                }), d.rank());
                            }
                        });
                    }
                });
            }
        });
    },
    qd: function() {
        var e = this, t = wx.getStorageSync("users").id, a = this.data.wdqd;
        console.log(e.data.nowtime, e.data.special, e.data.qdset, a);
        for (var s = e.data.qdset[0].integral, n = 0; n < e.data.special.length; n++) e.data.nowtime.toString() == e.data.special[n].day && (s = e.data.special[n].integral);
        if (0 == a.length) var o = e.data.qdset[0].one; else o = 0;
        console.log(s, o), app.util.request({
            url: "entry/wxapp/Sign",
            cachetime: "0",
            data: {
                user_id: t,
                time: e.data.nowtime.toString(),
                integral: s,
                one: o
            },
            success: function(t) {
                console.log(t), "1" == t.data && (e.setData({
                    qdddjf: s,
                    qdtc: !1
                }), e.reLoad(), e.lqts());
            }
        });
    },
    bq: function() {
        var e = this, a = wx.getStorageSync("users").id, t = this.data.wdqd, s = Number(this.data.grjf);
        console.log(e.data.bqtime, e.data.special, e.data.qdset, t, s);
        for (var n = e.data.qdset[0].integral, o = 0; o < e.data.special.length; o++) e.data.bqtime.toString() == e.data.special[o].day && (n = e.data.special[o].integral);
        if (0 == t.length) var r = e.data.qdset[0].one; else r = 0;
        console.log(n, r), wx.showModal({
            title: "温馨提示",
            content: "补签将会扣除您" + e.data.qdset[0].bq_integral + "积分哦",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), Number(e.data.qdset[0].bq_integral) > s ? wx.showModal({
                    title: "提示",
                    content: "您的积分为" + s + ",不足补签扣除"
                }) : app.util.request({
                    url: "entry/wxapp/Sign2",
                    cachetime: "0",
                    data: {
                        user_id: a,
                        time: e.data.bqtime.toString(),
                        integral: n,
                        one: r
                    },
                    success: function(t) {
                        console.log(t), e.reLoad(), e.lqts();
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    changeMonth: function(t) {
        var e = t.target.id, a = this.data.currYear, s = this.data.currMonth;
        s = "prev" == e ? s - 1 : s + 1, "prev" == e && s < 1 && (a -= 1, s = 12), "next" == e && 12 < s && (a += 1, 
        s = 1), this.setData({
            currYear: a,
            currMonth: s,
            emptyGrids: calEmptyGrid(a, s),
            days: calDays(a, s)
        }), this.reLoad();
    },
    selectDate: function(t) {
        var e = this, a = this.data.havebq, s = e.data.nowtime, n = t.currentTarget.dataset.selected, o = t.currentTarget.dataset.tsrq;
        console.log(s, n, o), e.setData({
            bqtime: n
        });
        var r = new Date(s[0], s[1], s[2]), l = new Date(n[0], n[1], n[2]), i = r.getTime(), c = l.getTime();
        console.log(i, c, a), c < i ? (console.log("以前"), 2 == a ? e.setData({
            bqdisabled: !1,
            bqtext: "点击补签"
        }) : e.setData({
            bqdisabled: !0,
            bqtext: "今日已补签一次"
        }), e.setData({
            isbq: !0
        }), null != o.tsrq && wx.showModal({
            title: o.tsrq.day + "是" + o.tsrq.title,
            content: "本日签到特殊奖励" + o.tsrq.integral + "积分"
        })) : (i == c ? (null != o.tsrq && wx.showModal({
            title: o.tsrq.day + "是" + o.tsrq.title,
            content: "本日签到特殊奖励" + o.tsrq.integral + "积分"
        }), console.log("今日")) : (null != o.tsrq && wx.showModal({
            title: o.tsrq.day + "是" + o.tsrq.title,
            content: "本日签到特殊奖励" + o.tsrq.integral + "积分"
        }), console.log("以后")), e.setData({
            isbq: !1
        }));
        var d = o.value;
        this.setData({
            xz: d
        });
    }
});