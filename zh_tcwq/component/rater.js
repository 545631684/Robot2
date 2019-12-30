function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

Component({
    externalClasses: [ "wux-class" ],
    properties: {
        max: {
            type: Number,
            value: 5,
            observer: function() {
                this.updateValue();
            }
        },
        icon: {
            type: String,
            value: ""
        },
        star: {
            type: String,
            value: "★"
        },
        defaultValue: {
            type: Number,
            value: 0
        },
        value: {
            type: Number,
            value: 0,
            observer: function(e) {
                this.data.auto || this.updateValue(e);
            }
        },
        activeColor: {
            type: String,
            value: "#ffc900"
        },
        margin: {
            type: Number,
            value: 2
        },
        fontSize: {
            type: Number,
            value: 25
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        allowHalf: {
            type: Boolean,
            value: !1
        },
        allowClear: {
            type: Boolean,
            value: !1
        },
        allowTouchMove: {
            type: Boolean,
            value: !1
        },
        auto: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        raterValue: 0
    },
    methods: {
        updateValue: function() {
            var r = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.raterValue, e = this.data, t = e.max, l = e.activeColor, a = [].concat(_toConsumableArray(new Array(t))).map(function(e, t) {
                return t;
            }), n = r <= 0 ? 0 : t < r ? t : r, u = a.reduce(function(e, t, a) {
                return [].concat(_toConsumableArray(e), [ a <= r - 1 ? l : "#ccc" ]);
            }, []), i = n.toString().split("."), o = 1 === i.length ? [ i[0], 0 ] : i;
            this.setData({
                stars: a,
                colors: u,
                raterValue: n,
                cutIndex: 1 * o[0],
                cutPercent: 10 * o[1]
            });
        },
        updateHalfStarValue: function(n, u, i) {
            var o = this;
            wx.createSelectorQuery().in(this).selectAll(".wux-rater__star").boundingClientRect(function(e) {
                if (e.filter(function(e) {
                    return !e;
                }).length) return !1;
                var t = e[n], a = t.left, r = t.width, l = u - a < r / 2 ? n + .5 : n + 1;
                i.call(o, l, n);
            }).exec();
        },
        onTap: function(e) {
            var r = this, t = e.currentTarget.dataset.index, a = this.data, l = a.raterValue, n = a.disabled, u = a.allowHalf, i = a.allowClear;
            if (!n) if (u) this.updateHalfStarValue(t, e.detail.x, function(e, t) {
                var a = i && e === l;
                r.fireEvents(a ? 0 : e, t);
            }); else {
                var o = t + 1, c = i && o === l;
                this.fireEvents(c ? 0 : o, t);
            }
        },
        fireEvents: function(e, t) {
            this.data.auto && this.updateValue(e), this.triggerEvent("change", {
                value: e,
                index: t
            });
        },
        onTouchMove: function(e) {
            var c = this, t = this.data, a = t.disabled, s = t.allowHalf, r = t.allowTouchMove;
            if (!a && r) {
                var f = e.changedTouches[0].pageX;
                wx.createSelectorQuery().in(this).selectAll(".wux-rater__star").boundingClientRect(function(e) {
                    if (e.filter(function(e) {
                        return !e;
                    }).length) return !1;
                    var t = e[0], a = t.left, r = t.width, l = e.map(function(e) {
                        return e.width;
                    }).reduce(function(e, t) {
                        return e + t;
                    }), n = f - a, u = Math.ceil(n / r);
                    if (0 < n && n < l) {
                        var i = u - 1;
                        if (s) {
                            var o = e[i];
                            u = f - o.left < o.width / 2 ? u - .5 : u;
                        }
                        c.fireEvents(u, i);
                    }
                }).exec();
            }
        }
    },
    attached: function() {
        var e = this.data, t = e.defaultValue, a = e.value, r = e.auto ? t : a;
        this.updateValue(r);
    }
});