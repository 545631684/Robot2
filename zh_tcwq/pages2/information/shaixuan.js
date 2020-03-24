// zh_tcwq/pages2/information/shaixuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ai_index:0,
    dingyue: [
      { radio: false, text: '博客1' },
      { radio: false, text: '博客12' },
      { radio: false, text: '博客1' },
      { radio: false, text: '博客2' },
      { radio: false, text: '博客3' },
      { radio: false, text: '博客4' },
      { radio: false, text: '博客5' },
      { radio: false, text: '博客6' },
      { radio: false, text: '博客7' },
      { radio: false, text: '博客8' },
    ],
    radioAll: false,
    cursor: 0,
    searchText:"",
  },
  changeTabbar (e) {
    this.setData({
      ai_index: e.currentTarget.dataset.id
    })
  },
  /**
   * 搜索框中的值
   */
  getInput: function (e) {
    var val = e.detail.value;
    this.setData({
      searchText: val
    });
  },
  /**
   * 确认搜索按钮
  */
  confirmButton () {
    let self = this;
    wx.showLoading({
      title: '正在查找...',
    });
    //两秒后关闭等待窗口
    setTimeout(function () {
      wx.hideLoading({
        success: function () {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          self.setData({
            searchText:""
          })
        }
      });
    }, 2000)
  },
  /**
   * radio单选按钮的切换效果
   */
  setRadio: function (e) {
    let index = e.currentTarget.dataset.index, img = e.currentTarget.dataset.img, radio = e.detail.value, t = this, dingyue = this.data.dingyue
    index === img ? dingyue[index].radio = false : dingyue[index].radio = radio ? false : true
    this.setData({
      dingyue: dingyue
    })
  },
  /**
   * radioAll单选按钮的切换效果
   */
  setRadioAll: function (e) {
    let index = e.currentTarget.dataset.index, img = e.currentTarget.dataset.img, radioAll = false, dingyue = this.data.dingyue
    index === img ? radioAll = false : radioAll = true
    dingyue.find((o, index) => {
      o.radio = radioAll
    })
    this.setData({
      radioAll: radioAll,
      dingyue: dingyue
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