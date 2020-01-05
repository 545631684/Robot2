// pages/personal/setkeyword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: [
      { radio: false, text: '' },
      { radio: true, text: '博客' },
      { radio: false, text: '' },
      { radio: false, text: '' },
      { radio: false, text: '' },
      { radio: false, text: '' },
      { radio: false, text: '' },
      { radio: false, text: '' },
      { radio: false, text: '' },
      { radio: false, text: '' },
    ]
  },
  /**
   * radio单选按钮的切换效果
   */
  setRadio: function (e) {
    let index = e.currentTarget.dataset.index, img = e.currentTarget.dataset.img, radio = e.detail.value, t = this, keyword = this.data.keyword
    index === img ? keyword[index].radio = false : keyword[index].radio = radio ? false : true
    this.setData({
      keyword: keyword
    })
  },
  /**
   * input框输入失去焦点时判断
   */
  inputWatch(e) {
    let keyword = this.data.keyword, index = e.currentTarget.dataset.index
    keyword[index].text = e.detail.value
    this.setData({
      keyword: keyword
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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