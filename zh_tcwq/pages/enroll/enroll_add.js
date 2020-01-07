var app = getApp(),
    util = require("../../utils/util.js"),
    imgArray = [],
    siteinfo = require("../../../siteinfo.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        countries: [],
        countryIndex: 0,
        lqcountries: ["付费领取+分享领取", "仅限付费领取", "仅限分享领取"],
        lqcountryIndex: 1,
        jesz: !0,
        qssz: !0,
        yhqtype: "元",
        start: "",
        timestart: "",
        timeend: "",
        issq: !0,
        is_check: "",
        zsnum: 0,
        fwxy: !0,
        images: [],
        images2: [],
        timeStart: '',
        timeEnd: '',
        numExamine:'^[0-9]*$',
        telExamine: ''
    },
    gongg(e) {
        this.setData({
            zsnum: e.detail.value.length
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            timeStart: e.detail.value
        })
    },
    bindTimeChange2: function (e) {
        this.setData({
            timeEnd: e.detail.value
        })
    },
    deleteImage: function (t) {
        var e = t.currentTarget.dataset.index,
            i = this.data.images;
        console.log(e), i.splice(e, 1), this.setData({
            images: i
        }), console.log(i);
    },
    chooseImage: function (t) {
        var e = this,
            i = this.data.images,
            a = i.length;
        console.log(i), wx.chooseImage({
            count: 3 - a,
            success: function (t) {
                i = i.concat(t.tempFilePaths), e.setData({
                    images: i
                }), console.log(i);
            }
        });
    },
    deleteImage2: function (t) {
        var e = t.currentTarget.dataset.index,
            i = this.data.images2;
        console.log(e), i.splice(e, 1), this.setData({
            images2: i
        }), console.log(i);
    },
    chooseImage2: function (t) {
        var e = this,
            i = this.data.images2,
            a = i.length;
        console.log(i), wx.chooseImage({
            count: 3 - a,
            success: function (t) {
                i = i.concat(t.tempFilePaths), e.setData({
                    images2: i
                }), console.log(i);
            }
        });
    },
    formSubmit: function (t) {
        let _this = this, telExamine = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
        if(t.detail.value.title.length == 0){
            wx.showModal({
                title: '提示',
                content: '请填写活动标题',
                showCancel:false,
                success: function(res) {}
            })
        } else if(_this.data.images.length == 0){
            wx.showModal({
                title: '提示',
                content: '请上传活动logo',
                showCancel:false,
                success: function(res) {}
            })
        } else if(t.detail.value.details.length == 0){
            wx.showModal({
                title: '提示',
                content: '请填写活动详情',
                showCancel:false,
                success: function(res) {}
            })
        } else if(_this.data.timeStart.length == 0){
            wx.showModal({
                title: '提示',
                content: '请设置活动开始时间',
                showCancel:false,
                success: function(res) {}
            })
        } else if(_this.data.timeEnd.length == 0){
            wx.showModal({
                title: '提示',
                content: '请设置活动结束时间',
                showCancel:false,
                success: function(res) {}
            })
        } else if(t.detail.value.number.length == 0){
            wx.showModal({
                title: '提示',
                content: '请填写限制人数',
                showCancel:false,
                success: function(res) {}
            })
        } else if(t.detail.value.money.length == 0){
            wx.showModal({
                title: '提示',
                content: '价格输入有误',
                showCancel:false,
                success: function(res) {}
            })
        } else if(t.detail.value.tel.length == 0){
            wx.showModal({
                title: '提示',
                content: '电话输入有误',
                showCancel:false,
                success: function(res) {}
            })
        } else if(t.detail.value.address.length == 0){
            wx.showModal({
                title: '提示',
                content: '请填写地址',
                showCancel:false,
                success: function(res) {}
            })
        } else if(t.detail.value.cityname.length == 0){
            wx.showModal({
                title: '提示',
                content: '请填写城市',
                showCancel:false,
                success: function(res) {}
            })
        } else {
            wx.showLoading({
                title:"提交中..."
            })
            let forDate = {
                store_id:_this.data.store_id,
                title:t.detail.value.title,
                logo:_this.data.images,
                details:t.detail.value.details,
                number:t.detail.value.number,
                sign_num:"",
                time:"",
                start_time:_this.data.timeStart,
                end_time:_this.data.timeEnd,
                money:t.detail.value.money,
                type_id:_this.data.countries[_this.data.countryIndex].id,
                tel:t.detail.value.tel,
                address:t.detail.value.address,
                coordinate:"",
                cityname:t.detail.value.cityname,
            }
            wx.uploadFile({
                url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_tcwq",
                name: "upfile",
                filePath: _this.data.images[0],
                success: function (t) {
                    if(t.statusCode == 200){
                        forDate.logo = t.data
                        app.util.request({
                            url: "entry/wxapp/Addcativity",
                            cachetime: "0",
                            data: forDate,
                            success: function (e) {
                                wx.hideLoading()
                                if(e.data.code == 200){
                                    wx.showToast({
                                        title: '发布成功',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                } else {
                                    wx.showToast({
                                        title: '发布失败',
                                        icon: 'loading',
                                        duration: 2000
                                    })
                                }
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        });
                    }
                    // console.log("上传图片返回值", t)
                }
            });

        }
        console.log(t.detail.value)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let t = this
        this.setData({
            store_id: options.store_id
        })
        app.setNavigationBarColor(this);
        app.util.request({
            url: "entry/wxapp/Getacttype",
            cachetime: "0",
            success: function (e) {
                if (e.data.msg.length == 0) {
                    wx.showModal({
                        showCancel: false,
                        title: '提示',
                        content: '没有创建活动分类暂时发布添加',
                        success: function (res) {
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        }
                    })
                } else {
                    t.setData({
                        countries: e.data.msg
                    })
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})