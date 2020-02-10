// zh_tcwq/pages/robot//reply/templateSave.js
var siteinfo = require("../../../../siteinfo.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '文字', value: '文字', checked: 'true' },
      { name: '图', value: '图' }
    ],
    items2: [
      { name: '模糊匹配', value: '模糊匹配', checked: 'true' },
      { name: '完全匹配', value: '完全匹配' }
    ],
    addKeyWord:true,
    addKeyImg:false,
    keyTC:false,
    images: [],
    mode:'模糊匹配',
    keyList:false,
    keyListNull:true,
    keyData:[],
    keyConTextarea:''
  },
  chooseImage: function (t) {
    var e = this,
      i = this.data.images,
      a = i.length;
    console.log(i), wx.chooseImage({
      count: 1 - a,
      success: function (t) {
        wx.showToast({
          icon: "loading",
          title: "正在上传"
        });
        wx.uploadFile({
          url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_tcwq",
          name: "upfile",
          filePath: t.tempFilePaths[0],
          success: function (u) {
            if (u.statusCode == 200) {
              i = i.concat(u.data), e.setData({
                images: i
              })
            }
          }
        })
      }
    });
  },
  deleteImage: function (t) {
    var e = t.currentTarget.dataset.index,
      i = this.data.images;
    console.log(e), i.splice(e, 1), this.setData({
      images: i
    }), console.log(i);
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value == '文字'){
      this.setData({
        addKeyWord: true,
        addKeyImg: false
      })
    } else if (e.detail.value == '图'){
      this.setData({
        addKeyWord: false,
        addKeyImg: true
      })
    }
  },
  radioChange2: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      mode: e.detail.value
    })
  },
  keyNameInput: function (e) {
    this.setData({
      keyAddName: e.detail.value
    })
  },
  keyConTextarea: function (e) {
    this.setData({
      keyConTextarea: e.detail.value
    })
  },
  keyAdd(){
    this.setData({
      keyTC: true
    })
  },
  keyAddCancel(){
    this.setData({
      keyTC: false,
      images: [],
      mode: '模糊匹配',
      keyConTextarea: '',
      keyAddName:''
    })
  },
  keyAddDefine(){
    let _this = this
    if (_this.data.keyAddName.length == 0){
      wx.showModal({
        title: '提示',
        content: '请填写关键词',
        success: function (res) {}
      })
    } else if (_this.data.addKeyWord && _this.data.keyConTextarea.length == 0){
      wx.showModal({
        title: '提示',
        content: '请填写回复文字内容',
        success: function (res) { }
      })
    } else if (_this.data.addKeyImg && _this.data.images.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写回复图片',
        success: function (res) { }
      })
    } else {
      wx.showLoading({
        title: '提交中',
      })
      let imgsrc = 'https://wechat.ql888.net/attachment/'
      if (_this.data.images.length != 0) imgsrc += _this.data.images[0]
      wx.request({
        url: 'https://qlm.ql888.net.cn/api/Reply/insert_template_msg',
        data: {
          key: _this.data.keyAddName,
          value: _this.data.addKeyWord ? _this.data.keyConTextarea : _this.data.addKeyImg ? imgsrc : '',
          type: _this.data.addKeyWord ? 0 : _this.data.addKeyImg ? 1 : '',
          is_like: _this.data.mode == '完全匹配' ? 0 : _this.data.mode == '模糊匹配' ? 1 : '',
          template_id: _this.data.mbId,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.code == 200) {
            wx.hideLoading()
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
            wx.request({
              url: 'https://qlm.ql888.net.cn/api/Reply/get_template_reply_list',
              data: {
                template_id: _this.data.mbId
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(ress) {
                if (ress.data.code == 200) {
                  console.log(ress.data)
                  if (ress.data.data.length == 0) {
                    _this.setData({
                      keyData: ress.data.data,
                      keyList: false,
                      keyListNull: true
                    })
                  } else {
                    _this.setData({
                      keyData: ress.data.data,
                      keyList: true,
                      keyListNull: false
                    })
                  }
                }
              }
            })
          }
        }
      })
    }
    _this.keyAddCancel()
  },
  keyDel(e){
    let _this = this
    wx.showActionSheet({
      itemList: ['删除词条'],
      success: function (res) {
        if (res.tapIndex == 0){
          wx.request({
            url: 'https://qlm.ql888.net.cn/api/Reply/del_reply',
            data: {
              msg_id: e.currentTarget.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(ress) {
              if (ress.data.code == 200) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.request({
                  url: 'https://qlm.ql888.net.cn/api/Reply/get_template_reply_list',
                  data: {
                    template_id: _this.data.mbId
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(ress) {
                    if (ress.data.code == 200) {
                      console.log(ress.data)
                      if (ress.data.data.length == 0) {
                        _this.setData({
                          keyData: ress.data.data,
                          keyList: false,
                          keyListNull: true
                        })
                      } else {
                        _this.setData({
                          keyData: ress.data.data,
                          keyList: true,
                          keyListNull: false
                        })
                      }
                    }
                  }
                })
              }
            }
          })
        }
        console.log()
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mbId: options.id,
      mbName: options.name
    })
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/Reply/get_template_reply_list',
      data: {
        template_id: _this.data.mbId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
         console.log(res.data)
          if (res.data.data.length == 0){
            _this.setData({
              keyData: res.data.data,
              keyList: false,
              keyListNull: true
            })
         } else {
            _this.setData({
              keyData: res.data.data,
              keyList: true,
              keyListNull: false
            })
         }
        }
      }
    })
    
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