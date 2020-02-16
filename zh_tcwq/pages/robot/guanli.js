// zh_tcwq/pages/robot//guanli.js
var app = getApp(), qrdingshiqi = {}, qrdingshiqi2 = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addRobot:false,
    qrTishi:false,
    qrCon:false,
    qrSrc:'',
    robotInfo:false,
    plugins:false,
    pluginsText:false,
    pluginss:[]
  },
  pluginSave(e){
    let _this = this, itemList = [], plugins = {}
    this.data.pluginss.find((o, index)=>{
      if (o.plugin_id == e.currentTarget.dataset.id){
        plugins = o
      }
    })
    if (plugins.wx == 0 && plugins.qq == 0){
      itemList = ['设置', '卸载', '微信开启', 'QQ开启']
    } else if (plugins.wx == 1 && plugins.qq == 0){
      itemList = ['设置', '卸载', '微信关闭', 'QQ开启']
    } else if (plugins.wx == 0 && plugins.qq == 1) {
      itemList = ['设置', '卸载', '微信开启', 'QQ关闭']
    } else if (plugins.wx == 1 && plugins.qq == 1) {
      itemList = ['设置', '卸载', '微信关闭', 'QQ关闭']
    }
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
      
        if (itemList[res.tapIndex] == '设置'){
            wx.setStorageSync('wxid', _this.data.userInfo.wxid)
          if (e.currentTarget.dataset.id == 1){
            wx.navigateTo({
              url: 'reply/index?wxid=' + _this.data.userInfo.wxid,
            })
          } else if (e.currentTarget.dataset.id == 24){
            wx.navigateTo({
              url: 'activity/activityList',
            })
          } else if (e.currentTarget.dataset.id == 23) {
            wx.navigateTo({
              url: 'big-data/index',
            })
          }
        } else if (itemList[res.tapIndex] == '卸载'){
          _this.pluginUninst(e.currentTarget.dataset.id)
        } else if (itemList[res.tapIndex] == '微信开启') {
          _this.pluginChangeAppStatus(e.currentTarget.dataset.id, 'wx', 1)
        } else if (itemList[res.tapIndex] == '微信关闭') {
          _this.pluginChangeAppStatus(e.currentTarget.dataset.id, 'wx', 0)
        } else if (itemList[res.tapIndex] == 'QQ开启') {
          _this.pluginChangeAppStatus(e.currentTarget.dataset.id, 'qq', 1)
        } else if (itemList[res.tapIndex] == 'QQ关闭') {
          _this.pluginChangeAppStatus(e.currentTarget.dataset.id, 'qq', 0)
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  pluginUninst(id){
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/uninstall_app',
      data: {
        user_id: wx.getStorageSync("user_id"),
        plugin_id: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200 && res.data.msg == '卸载成功') {
          _this.onLoad()
        }
      }
    })
  },
  pluginChangeAppStatus(id, type, status){
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/change_app_status',
      data: {
        user_id: wx.getStorageSync("user_id"),
        plugin_id: id,
        platform: type,
        enable: status
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          _this.onLoad()
        }
      }
    })
  },
  onaddRobot(){
    this.setData({
      addRobot: false,
      qrTishi: true,
      robotInfo: false
    })
  },
  onaddRobotReturn() {
    this.setData({
      addRobot: true,
      qrTishi: false
    })
  },
  onqrcon(){
    let _this = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/send_login_request',
      data: {
        user_id: wx.getStorageSync("user_id")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          process_id: res.data.data.process_id
        })
        wx.request({
          url: 'https://qlm.ql888.net.cn/api/QianLu/get_login_res',
          data: {
            user_id: wx.getStorageSync("user_id"),
            process_id: _this.data.process_id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res, "****************************")
            if (res.data.code == 200) {
              _this.setData({
                qrSrc: res.data.data.img
              })
              wx.hideLoading()
              qrdingshiqi = setInterval(function () {
                wx.request({
                  url: 'https://qlm.ql888.net.cn/api/QianLu/get_login_res',
                  data: {
                    user_id: wx.getStorageSync("user_id"),
                    process_id: _this.data.process_id
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(res) {
                    if (res.data.code == 200 && res.data.data.result == 'finish') {
                      clearInterval(qrdingshiqi)
                      _this.setData({
                        qrCon: false
                      })
                      _this.onLoad()
                      console.log(res)
                    } else if (res.data.code == 200 && res.data.data.result == 'ok') {
                      _this.setData({
                        qrSrc: res.data.data.img
                      })
                    }
                  }
                })

              }, 5000) //循环时间 这里是1秒
            } else if (res.data.code == 500) {
              clearInterval(qrdingshiqi)
              qrdingshiqi2 = setTimeout(function () {
                _this.onqrcon()
              }, 5000)
            }
          }
        })
      }
    })
    
    this.setData({
      qrCon: true,
      qrTishi: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:"加载中。。。"
    })
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/get_robot_list',
      data: {
        user_id: wx.getStorageSync("user_id")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res2) {
        console.log(res2.data.msg, "****************************")
        if (res2.data.code == 200) {
          if (res2.data.data.length == 0) {
            _this.setData({
              userInfo: res2.data.data[0],
              addRobot: true
            })
            wx.hideLoading()
          } else {
            _this.setData({
              userInfo: res2.data.data[0]
            })
            wx.request({
              url: 'https://qlm.ql888.net.cn/api/QianLu/get_user_plugins',
              data: {
                user_id: wx.getStorageSync("user_id")
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res3) {
                console.log(res3.data.data)
                _this.setData({
                  robotInfo: true,
                  pluginss: res3.data.data,
                  pluginsText: res3.data.data.length == 0 ? true : false,
                  plugins: res3.data.data.length > 0 ? true : false
                })
                wx.hideLoading()
              }
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
    wx.hideLoading()
    clearInterval(qrdingshiqi)
    clearInterval(qrdingshiqi2)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading()
    clearInterval(qrdingshiqi)
    clearInterval(qrdingshiqi2)
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