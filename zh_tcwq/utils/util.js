function formatTime(e) {
    var t = e.getFullYear(), r = e.getMonth() + 1, n = e.getDate(), a = e.getHours(), i = e.getMinutes(), o = e.getSeconds();
    return [ t, r, n ].map(formatNumber).join("/") + " " + [ a, i, o ].map(formatNumber).join(":");
}

function formatNumber(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

function validTime(e, t) {
    var r = e.split("-"), n = t.split("-"), a = new Date(parseInt(r[0]), parseInt(r[1]) - 1, parseInt(r[2]), 0, 0, 0), i = new Date(parseInt(n[0]), parseInt(n[1]) - 1, parseInt(n[2]), 0, 0, 0);
    return !(a.getTime() >= i.getTime()) || (console.log("结束日期不能小于开始日期", this), !1);
}

function validTime1(e, t) {
    var r = e.split("-"), n = t.split("-"), a = new Date(parseInt(r[0]), parseInt(r[1]) - 1, parseInt(r[2]), 0, 0, 0), i = new Date(parseInt(n[0]), parseInt(n[1]) - 1, parseInt(n[2]), 0, 0, 0);
    return !(a.getTime() > i.getTime()) || (console.log("结束日期不能小于开始日期", this), !1);
}

function ormatDate(e) {
    var t = new Date(1e3 * e);
    return t.getFullYear() + "-" + r(t.getMonth() + 1, 2) + "-" + r(t.getDate(), 2) + " " + r(t.getHours(), 2) + ":" + r(t.getMinutes(), 2) + ":" + r(t.getSeconds(), 2);
    function r(e, t) {
        for (var r = "" + e, n = r.length, a = "", i = t; i-- > n; ) a += "0";
        return a + r;
    }
}

module.exports = {
    formatTime: formatTime,
    validTime: validTime,
    validTime1: validTime1,
    ormatDate: ormatDate
};