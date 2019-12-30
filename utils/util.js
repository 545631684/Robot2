var formatTime = function(t) {
    var e = t.getFullYear(), a = t.getMonth() + 1, r = t.getDate(), n = t.getHours(), o = t.getMinutes(), i = t.getSeconds();
    return [ e, a, r ].map(formatNumber).join("/") + " " + [ n, o, i ].map(formatNumber).join(":");
}, formatNumber = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

function DateDiff(t, e) {
    var a, r, n;
    return a = t.split("-"), r = new Date(a[1] + "-" + a[2] + "-" + a[0]), a = e.split("-"), 
    n = new Date(a[1] + "-" + a[2] + "-" + a[0]), parseInt(Math.abs(r - n) / 1e3 / 60 / 60 / 24);
}

function getDistance(t, e, a, r) {
    e = e || 0, a = a || 0, r = r || 0;
    var n = (t = t || 0) * Math.PI / 180, o = a * Math.PI / 180, i = n - o, u = e * Math.PI / 180 - r * Math.PI / 180;
    return 12756274 * Math.asin(Math.sqrt(Math.pow(Math.sin(i / 2), 2) + Math.cos(n) * Math.cos(o) * Math.pow(Math.sin(u / 2), 2)));
}

function ormatDate(t) {
    var e = new Date(1e3 * t);
    return e.getFullYear() + "-" + a(e.getMonth() + 1, 2) + "-" + a(e.getDate(), 2) + " " + a(e.getHours(), 2) + ":" + a(e.getMinutes(), 2) + ":" + a(e.getSeconds(), 2);
    function a(t, e) {
        for (var a = "" + t, r = a.length, n = "", o = e; o-- > r; ) n += "0";
        return n + a;
    }
}

module.exports = {
    formatTime: formatTime,
    DateDiff: DateDiff,
    getDistance: getDistance,
    ormatDate: ormatDate
};