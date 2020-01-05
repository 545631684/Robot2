var app = getApp(), util = require("../../utils/util.js"), imgArray = [], siteinfo = require("../../../siteinfo.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countries: [],
    countryIndex: 0,
    lqcountries: [ "付费领取+分享领取", "仅限付费领取", "仅限分享领取" ],
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
    images2: []
  },
  deleteImage: function(t) {
      var e = t.currentTarget.dataset.index, i = this.data.images;
      console.log(e), i.splice(e, 1), this.setData({
          images: i
      }), console.log(i);
  },
  chooseImage: function(t) {
      var e = this, i = this.data.images, a = i.length;
      console.log(i), wx.chooseImage({
          count: 3 - a,
          success: function(t) {
              i = i.concat(t.tempFilePaths), e.setData({
                  images: i
              }), console.log(i);
          }
      });
  },
  deleteImage2: function(t) {
      var e = t.currentTarget.dataset.index, i = this.data.images2;
      console.log(e), i.splice(e, 1), this.setData({
          images2: i
      }), console.log(i);
  },
  chooseImage2: function(t) {
      var e = this, i = this.data.images2, a = i.length;
      console.log(i), wx.chooseImage({
          count: 3 - a,
          success: function(t) {
              i = i.concat(t.tempFilePaths), e.setData({
                  images2: i
              }), console.log(i);
          }
      });
  },
  formSubmit: function(t) {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavigationBarColor(this);
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