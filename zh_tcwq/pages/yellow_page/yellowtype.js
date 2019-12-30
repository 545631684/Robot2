var app = getApp();

Page({
    data: {
        luntext: [ "附近", "新入", "热门" ],
        activeIndex: 0,
        refresh_top: !1,
        storelist: [],
        page: 1,
        typeid: "",
        infortype: [ {
            id: 0,
            name: "全部"
        } ],
        scactiveIndex: 0,
        districtList: [],
        sortingList: [ "附近", "新入", "热门" ],
        typeList: [ {
            id: 0,
            name: "全部"
        } ],
        districtChioceIcon: "../image/icon-go-black.png",
        sortingChioceIcon: "../image/icon-go-black.png",
        chioceDistrict: !1,
        chioceSorting: !1,
        chioceFilter: !1,
        activeDistrictParentIndex: -1,
        activeDistrictChildrenIndex: -1,
        scrollTop: 0,
        scrollIntoView: 0,
        activeTypeIndex: 0,
        activeSortingIndex: 0,
        activeTypeIndexname: "选择分类",
        activeSortingIndexname: "选择排序",
        borbtm: 2
    },
    hideAllChioce: function() {
        this.setData({
            districtChioceIcon: "../image/icon-go-black.png",
            sortingChioceIcon: "../image/icon-go-black.png",
            chioceDistrict: !1,
            chioceSorting: !1,
            chioceFilter: !1
        });
    },
    choiceItem: function(t) {
        switch (this.setData({
            borbtm: t.currentTarget.dataset.item
        }), t.currentTarget.dataset.item) {
          case "1":
            this.data.chioceDistrict ? this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !1
            }) : this.setData({
                districtChioceIcon: "../image/icon-down-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !0,
                chioceSorting: !1,
                chioceFilter: !1
            });
            break;

          case "2":
            this.data.chioceSorting ? this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !1
            }) : this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-down-black.png",
                chioceDistrict: !1,
                chioceSorting: !0,
                chioceFilter: !1
            });
            break;

          case "3":
            this.data.chioceFilter ? this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "/images/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !1
            }) : this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !0
            });
        }
    },
    selectDistrictParent: function(t) {
        this.setData({
            activeDistrictParentIndex: t.currentTarget.dataset.index,
            activeDistrictName: this.data.districtList[t.currentTarget.dataset.index].district_name,
            activeDistrictChildrenIndex: 0,
            scrollTop: 0,
            scrollIntoView: 0
        });
    },
    selectDistrictChildren: function(t) {
        var e = t.currentTarget.dataset.index, i = -1 == this.data.activeDistrictParentIndex ? 0 : this.data.activeDistrictParentIndex;
        0 == e ? this.setData({
            activeDistrictName: this.data.districtList[i].district_name
        }) : this.setData({
            activeDistrictName: this.data.districtList[i].district_children_list[e].district_name
        }), this.setData({
            districtChioceIcon: "../image/icon-go-black.png",
            chioceDistrict: !1,
            activeDistrictChildrenIndex: e,
            productList: [],
            pageIndex: 1,
            loadOver: !1,
            isLoading: !0
        });
    },
    selectType: function(t) {
        var e = this;
        if (console.log(t.currentTarget.id, t.currentTarget.dataset.index), 0 == t.currentTarget.dataset.index) var i = ""; else i = t.currentTarget.id;
        var a = t.currentTarget.dataset.index;
        this.setData({
            page: 1,
            refresh_top: !1,
            storelist: [],
            fjstorelist: [],
            typeid: i,
            sortingChioceIcon: "../image/icon-go-black.png",
            chioceSorting: !1,
            activeTypeIndex: a,
            activeSortingIndex: 0,
            activeTypeIndexname: this.data.typeList[a].name
        }), setTimeout(function() {
            e.refresh();
        }, 100);
    },
    selectSorting: function(t) {
        var e = t.currentTarget.dataset.index;
        console.log(this.data, e), this.setData({
            sortingChioceIcon: "../image/icon-go-black.png",
            chioceDistrict: !1,
            activeSortingIndex: e,
            activeSortingIndexname: this.data.sortingList[e],
            refresh_top: !1,
            page: 1,
            type: parseInt(e) + 1,
            storelist: []
        }), this.refresh();
    },
    tabClick: function(t) {
        var e = t.currentTarget.id;
        console.log(this.data, e);
        var i = this.data.fjstorelist;
        if (0 == e) ; else if (1 == e) {
            var a = i.sort(function(t, e) {
                return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : e < t ? 1 : 0;
            });
            console.log(a), this.setData({
                store1: a
            });
        } else if (2 == e) {
            var c = i.sort(function(t, e) {
                t = Number(t.views);
                return (e = Number(e.views)) < t ? -1 : t < e ? 1 : 0;
            });
            console.log(c), this.setData({
                store2: c
            });
        }
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    yellow_info: function(t) {
        var e = t.currentTarget.dataset.id, i = t.currentTarget.dataset.user_id;
        console.log(i), wx.navigateTo({
            url: "yellowinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    onLoad: function(t) {
        console.log(t), t.typename && wx.setNavigationBarTitle({
            title: t.typename
        });
        var i = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        });
        var e = wx.getStorageSync("url");
        i.setData({
            url: e,
            id: t.id,
            System: wx.getStorageSync("System")
        }), app.util.request({
            url: "entry/wxapp/yellowType2",
            cachetime: "0",
            data: {
                type_id: t.id
            },
            success: function(t) {
                console.log(t, i.data.infortype);
                var e = i.data.typeList.concat(t.data);
                console.log(e), i.setData({
                    typeList: e
                });
            }
        }), app.getLocation(function(t) {
            console.log(t), i.setData({
                lat: t.latitude,
                lng: t.longitude
            }), i.refresh();
        });
    },
    refresh: function(t) {
        var i = this, e = i.data.type || 1, a = i.data.id, c = i.data.typeid, o = i.data.page, n = i.data.storelist, r = wx.getStorageSync("city");
        console.log("城市为" + r), console.log(a, c, n, o), app.util.request({
            url: "entry/wxapp/YellowPageList",
            cachetime: "0",
            data: {
                type: e,
                lat: i.data.lat,
                lng: i.data.lng,
                type_id: a,
                type2_id: c,
                page: o,
                pagesize: 10,
                cityname: r
            },
            success: function(t) {
                for (var e in i.setData({
                    page: o + 1
                }), console.log(t), t.data.length < 10 ? i.setData({
                    refresh_top: !0
                }) : i.setData({
                    refresh_top: !1
                }), t.data) t.data[e].distance = (parseFloat(t.data[e].juli) / 1e3).toFixed(2);
                n = n.concat(t.data), i.setData({
                    store: n,
                    storelist: n
                });
            }
        });
    },
    store: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    phone: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: e
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
            storelist: [],
            page: 1
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.page), 0 == this.data.refresh_top && this.refresh();
    },
    onShareAppMessage: function() {}
});