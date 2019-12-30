Component({
    properties: {
        content: {
            type: Object,
            value: {}
        },
        url: {
            type: String,
            value: ""
        },
        type: {
            type: String,
            value: "1"
        }
    },
    lifetimes: {
        attached: function() {
            this.setData({
                is_style: getApp().xtxx ? getApp().xtxx.is_style : 1
            });
        },
        detached: function() {}
    },
    data: {
        star: [ {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        } ],
        star1: [ {
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        } ],
        star2: [ {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        } ],
        star3: [ {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        }, {
            img: "../image/star_none.png"
        } ],
        star4: [ {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/xing.png"
        }, {
            img: "../image/star_none.png"
        } ]
    },
    methods: {
        store: function(g) {
            var i = g.currentTarget.dataset.id;
            wx.navigateTo({
                url: "../sellerinfo/sellerinfo?id=" + i
            });
        },
        preimg: function(g) {
            var i = this, n = this.data.content.ad.map(function(g) {
                return i.data.url + g;
            });
            wx.previewImage({
                current: n[g.currentTarget.dataset.idx],
                urls: n
            });
        }
    }
});