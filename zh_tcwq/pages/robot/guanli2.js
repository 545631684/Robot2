// zh_tcwq/pages/robot//guanli.js
var app = getApp(),
  qrdingshiqi = {},
  qrdingshiqi2 = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: 0,
    addRobot: false, // 状态掉线
    qrTishi: false,
    qrCon: false,  // 登录扫描二维码
    qrSrc: '',
    robotInfo: false,
    plugins: false,
    pluginsText: false,
    pluginss: [],
    process_id: null,
    replyTc: false,
    replyTc_add: false,
    replyTc_uptitle: false,
    replyAddName: '',
    replyAddCon: '',
    replyUpTitle: '',
    replyUpName: '',
    replyUpCon: '',
    replyAdd: true,
    replyList: false,
    replyData: [],
    robotId: '',
    bigDataAdd: true,
    subscribeTc_add:false,
    isShowList: false,
    subscribeList:false,
    array: ['关闭', '启用'],
    array2: ['点击选择'],
    subscribeAddwxId: null,
    subscribeAddwxName: '',
    subscribeAddKey: '',
    subscribeEditId: '',
    contractWxId: '',
    huodongAdd:false,
    activityData:[],
    arrayhd: ['选择推送活动'],
    startDate: '活动开始日期',
    endDate: '活动结束日期',
    activityAddName: '',
    index:0,
    items: [
      { name: '指定活动', value: '1' },
      { name: '自定义文字', value: '0', checked: 'true' },
    ],
    dateList: [
      { name: '周一', value: '1' },
      { name: '周二', value: '2' },
      { name: '周三', value: '3' },
      { name: '周四', value: '4' },
      { name: '周五', value: '5' },
      { name: '周六', value: '6' },
      { name: '周日', value: '0' },
    ],
    time: '请选择开始时间',
    wxgroupList: [],
    qqgroupList: [],
    selectionWX: [],
    selectionQQ: [],
    selectionDate: [],
    switchDate: 0,
    zidingyiName:'',
    pushTimeText:'加载中。。。',
    pushGroupText:'加载中。。。',
    huodongUpdata:false
  },
  // 智慧活动推送begin
  checkboxChangeDate: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      selectionDate: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  zidingyiInput(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      zidingyiName: e.detail.value
    })
  },
  onhuodongAdddefine() {
    let _this = this
    if (_this.data.selectionDate.length == 0) {
      let selectionDate = []
      _this.data.dateList.find((o, index) => {
        o.checked ? selectionDate.push(o.value) : o = o
      })
      _this.setData({
        selectionDate: selectionDate
      })
    }
    if (_this.data.selectionWX.length == 0) {
      let selectionWX = []
      _this.data.wxgroupList.find((o, index) => {
        o.checked ? selectionWX.push(o.wxid) : o = o
      })
      _this.setData({
        selectionWX: selectionWX
      })
    }
    if (_this.data.switchDate == 0) {
      _this.data.items.find(o => {
        if (o.checked) {
          _this.setData({
            switchDate: o.value
          })
        }
      })
    }
    if (this.data.switchDate == 1){
      if (this.data.index == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择商铺发布的活动',
          success: function (res) { }
        })
      } else if (_this.data.time == '请选择推送时间') {
        wx.showModal({
          title: '提示',
          content: '请选择推送时间',
          success: function (res) { }
        })
      } else if (_this.data.selectionDate.length == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择推送日期，最少选择一天',
          success: function (res) { }
        })
      } else{
        wx.showLoading({
          title: '提交中',
        })
        wx.request({
          url: 'https://qlm.ql888.net.cn/api/Scheduled/add',
          data: {
            user_id: wx.getStorageSync("robotUser_id"),
            title: _this.data.activityAddName,
            start_time: _this.data.startDate + ' 00:00',
            end_time: _this.data.endDate + ' 00:00',
            activity_id: _this.data.userActivityId,
            type: 0
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(ress) {
            if (ress.data.code == 200) {
              wx.request({
                url: 'https://qlm.ql888.net.cn/api/Scheduled/setting',
                data: {
                  user_id: wx.getStorageSync("robotUser_id"),
                  robot_id: wx.getStorageSync("wxid"),
                  group_ids: _this.data.selectionWX.toString(),
                  enable: 1,
                  start_time: _this.data.time,
                  start_date: _this.data.selectionDate.toString(),
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res2) {
                  wx.hideLoading()
                  if (res2.data.code == 200) {
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                      duration: 2000
                    })
                    _this.getdata()
                  }
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '活动保存失败，请稍后重新添加',
                success: function (res) { }
              })
            }
          }
        })
      }
    } else if (this.data.switchDate == 0){
      if (this.data.zidingyiName.length == 0) {
        wx.showModal({
          title: '提示',
          content: '请填写自定义文字',
          success: function (res) { }
        })
      } else if (_this.data.time == '请选择推送时间') {
        wx.showModal({
          title: '提示',
          content: '请选择推送时间',
          success: function (res) { }
        })
      } else if (_this.data.selectionDate.length == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择推送日期，最少选择一天',
          success: function (res) { }
        })
      } else {
        wx.showLoading({
          title: '提交中',
        })
        wx.request({
          url: 'https://qlm.ql888.net.cn/api/Scheduled/add',
          data: {
            user_id: wx.getStorageSync("robotUser_id"),
            title: _this.data.zidingyiName,
            start_time: '2020/01/01 00:00',
            end_time: '210012/31 00:00',
            activity_id: 0,
            type: 1
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(ress) {
            if (ress.data.code == 200) {
              wx.request({
                url: 'https://qlm.ql888.net.cn/api/Scheduled/setting',
                data: {
                  user_id: wx.getStorageSync("robotUser_id"),
                  robot_id: wx.getStorageSync("wxid"),
                  group_ids: _this.data.selectionWX.toString(),
                  enable: 1,
                  start_time: _this.data.time,
                  start_date: _this.data.selectionDate.toString(),
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res2) {
                  wx.hideLoading()
                  if (res2.data.code == 200) {
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                      duration: 2000
                    })
                    _this.getdata()
                  }
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '活动保存失败，请稍后重新添加',
                success: function (res) { }
              })
            }
          }
        })
      }
    }
    this.onhuodongAddhide()
  },
  checkboxChangeWX: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      selectionWX: e.detail.value
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      switchDate: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    let _this = this, startDate = '', endDate = ''
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value == 0){
      this.setData({
        index: e.detail.value,
        activityAddName: _this.data.arrayhd[e.detail.value],
      })
    } else {
      _this.data.userActivityData.find((o,index)=>{
        if (o.title == _this.data.arrayhd[e.detail.value]){
          startDate = o.start_time
          endDate = o.end_time
        }
      })
      this.setData({
        index: e.detail.value,
        activityAddName: _this.data.arrayhd[e.detail.value],
        startDate: startDate,
        endDate: endDate,
      })
    }
    _this.data.userActivityData.find((o, index) => {
      if (o.title == _this.data.arrayhd[e.detail.value]) {
        _this.setData({
          userActivityId: o.id
        })
      }
    })
  },
  activitySvae(e) {
    let _this = this
    wx.showModal({
      title: "删除活动",
      content: "是否删除当前活动",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://qlm.ql888.net.cn/api/Scheduled/del',
            data: {
              user_id: wx.getStorageSync("robotUser_id"),
              id: e.currentTarget.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(ress) {
              if (ress.data.code == 200) {
                _this.getdata()
              }
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  onhuodongUpdefine(){
    let _this = this
    if (_this.data.selectionDate.length == 0) {
      let selectionDate = []
      _this.data.dateList.find((o, index) => {
        o.checked ? selectionDate.push(o.value) : o = o
      })
      _this.setData({
        selectionDate: selectionDate
      })
    }
    if (_this.data.selectionWX.length == 0) {
      let selectionWX = []
      _this.data.wxgroupList.find((o, index) => {
        o.checked ? selectionWX.push(o.wxid) : o = o
      })
      _this.setData({
        selectionWX: selectionWX
      })
    }
    if (_this.data.switchDate == 0) {
      _this.data.items.find(o => {
        if (o.checked) {
          _this.setData({
            switchDate: o.value
          })
        }
      })
    }
    if (this.data.switchDate == 1) {
      if (this.data.index == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择商铺发布的活动',
          success: function (res) { }
        })
      } else if (_this.data.time == '请选择推送时间') {
        wx.showModal({
          title: '提示',
          content: '请选择推送时间',
          success: function (res) { }
        })
      } else if (_this.data.selectionDate.length == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择推送日期，最少选择一天',
          success: function (res) { }
        })
      } else {
        wx.showLoading({
          title: '提交中',
        })
        wx.request({
          url: 'https://qlm.ql888.net.cn/api/Scheduled/update',
          data: {
            scheduled_id: _this.data.activityData[0].id,
            user_id: wx.getStorageSync("robotUser_id"),
            title: _this.data.activityAddName,
            start_time: _this.data.startDate + ' 00:00',
            end_time: _this.data.endDate + ' 00:00',
            activity_id: _this.data.userActivityId,
            type: 0
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(ress) {
            if (ress.data.code == 200) {
              wx.request({
                url: 'https://qlm.ql888.net.cn/api/Scheduled/setting',
                data: {
                  user_id: wx.getStorageSync("robotUser_id"),
                  robot_id: wx.getStorageSync("wxid"),
                  group_ids: _this.data.selectionWX.toString(),
                  enable: 1,
                  start_time: _this.data.time,
                  start_date: _this.data.selectionDate.toString(),
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res2) {
                  wx.hideLoading()
                  if (res2.data.code == 200) {
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                      duration: 2000
                    })
                    _this.getdata()
                  }
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '活动保存失败，请稍后重新添加',
                success: function (res) { }
              })
            }
          }
        })
      }
    } else if (this.data.switchDate == 0) {
      if (this.data.zidingyiName.length == 0) {
        wx.showModal({
          title: '提示',
          content: '请填写自定义文字',
          success: function (res) { }
        })
      } else if (_this.data.time == '请选择推送时间') {
        wx.showModal({
          title: '提示',
          content: '请选择推送时间',
          success: function (res) { }
        })
      } else if (_this.data.selectionDate.length == 0) {
        wx.showModal({
          title: '提示',
          content: '请选择推送日期，最少选择一天',
          success: function (res) { }
        })
      } else {
        wx.showLoading({
          title: '提交中',
        })
        wx.request({
          url: 'https://qlm.ql888.net.cn/api/Scheduled/update',
          data: {
            scheduled_id: _this.data.activityData[0].id,
            user_id: wx.getStorageSync("robotUser_id"),
            title: _this.data.zidingyiName,
            start_time: '2020/01/01 00:00',
            end_time: '2100/12/31 00:00',
            activity_id: 0,
            type: 1
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(ress) {
            if (ress.data.code == 200) {
              wx.request({
                url: 'https://qlm.ql888.net.cn/api/Scheduled/setting',
                data: {
                  user_id: wx.getStorageSync("robotUser_id"),
                  robot_id: wx.getStorageSync("wxid"),
                  group_ids: _this.data.selectionWX.toString(),
                  enable: 1,
                  start_time: _this.data.time,
                  start_date: _this.data.selectionDate.toString(),
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res2) {
                  wx.hideLoading()
                  if (res2.data.code == 200) {
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                      duration: 2000
                    })
                    _this.getdata()
                  }
                }
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '活动保存失败，请稍后重新添加',
                success: function (res) { }
              })
            }
          }
        })
      }
    }
    this.onhuodongUphide()
  },
  onhuodongUphide(){
    this.setData({
      huodongUpdata: false,
      zidingyiName: ''
    })
    this.setData({
      index: 0,
      switchDate: 0
    })
  },
  onhuodongUpshow(){
    let _this = this
    if (_this.data.activityData[0].type == 0){
      _this.data.userActivityData.find((o,index)=>{
        if(o.title == _this.data.activityData[0].title) {
          _this.setData({
            index: index
          })
        }
      })
    }
    this.setData({
      huodongUpdata: true,
      zidingyiName: _this.data.activityData[0].title,
      switchDate: _this.data.activityData[0].type == 0?1:0
    })
  },
  onhuodongAddshow(){
    this.setData({
      huodongAdd: true
    })
  },
  onhuodongEditshow(e) {
    let title = e.currentTarget.dataset.title;
    this.setData({
      huodongAdd: true,
      zidingyiName:title
    })
  },
  onhuodongAddhide() {
    this.setData({
      huodongAdd: false,
      zidingyiName: '',
      index: 0,
      switchDate:0
    })
  },
  // 智慧活动推送end


  // 大数据订阅begin
  keyInput: function (e) {
    this.setData({
      subscribeAddKey: e.detail.value
    })
  },
  bindSelect: function (e) {
    this.setData({
      isShowList: false,
      subscribeTc_add: true,
    })
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;

    console.log(e)

    if (id != '0' || id != 0 || !id) {
      this.setData({
        subscribeAddwxId: id,
        subscribeAddwxName: name
      })
    }
  },
  wxIdInput: function (e) {
    console.log(111)
    let arr = this.data.wxList
    if (arr.length == 1 && arr[1].id == '0') {
      return;
    }
    let res = [];
    for (var i = 0; i < arr.length; i++) {
      let index = arr[i].nickname.indexOf(e.detail.value);
      if (index != -1) {
        res.push(arr[i])
      }
    }

    this.setData({
      originalList: res,
    })
    // this.setData({
    //   subscribeAddwxId: e.detail.value
    // })
  },
  delSubscribe(e) {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确认删除当前订阅？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://qlm.ql888.net.cn/api/KeySubscribe/del',
            data: {
              id: e.currentTarget.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.code == 200 && res.data.msg == 'ok') {
                wx.hideLoading()
                _this.onsubscribeAddCancel()
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                _this.getdata()
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getWxList: function () {
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/robot_opt',
      data: {
        method: 'get_friend_list',
        robot_id: _this.data.robotId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        if (res.data.code == 200) {
          if (res.data.data.length > 0) {
            _this.setData({
              wxList: res.data.data,
              originalList: res.data.data
            })
          } else {
            let arr = []
            arr.push({
              'nickname': '暂无好友',
              'id': '0'
            })
            _this.setData({
              wxList: arr,
              originalList: arr,
            })
          }

        } else {
          let arr = []
          arr.push({
            'nickname': '暂无好友',
            'id': '0'
          })
          _this.setData({
            wxList: arr,
            originalList: arr
          })
        }
      },
      fail: function (res) {
      }
    })
  },
  getContractInfo: function () {
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/KeySubscribe/getRelationship',
      data: {
        user_id: wx.getStorageSync("robotUser_id"),
        robot_id: _this.data.robotId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          _this.setData({
            contractWxId: res.data.data.wx_id,
            contractStatus: res.data.data.enable
          })
        } else if (res.data.code == 500) {
          _this.setData({
            contractWxId: '',
            contractStatus: 0
          })
        }
      },
      fail: function (res) {


      }
    })
  },
  showList: function () {
    this.setData({
      subscribeTc_add: false,
      isShowList: true,
    })
  },
  hideList: function () {
    this.setData({
      subscribeTc_add: true,
      isShowList: false,
    })
  },
  onsubscribeAddDefine() {
    let _this = this

    if (_this.data.subscribeEditId != 0) {
      var url = 'https://qlm.ql888.net.cn/api/KeySubscribe/update_o'
      var data = {
        nick: _this.data.subscribeAddwxName,
        wx_id: _this.data.subscribeAddwxId,
        id: _this.data.subscribeEditId,
        key: _this.data.subscribeAddKey
      }
    } else {
      var url = 'https://qlm.ql888.net.cn/api/KeySubscribe/push'
      var data = {
        robot_id: _this.data.robotId,
        nick: _this.data.subscribeAddwxName,
        wx_id: _this.data.subscribeAddwxId,
        key: _this.data.subscribeAddKey
      }
    }
    if (this.data.subscribeAddwxId.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写订阅者微信ID后在提交！',
        success: function (res) { }
      })
      return
    }

    if (this.data.subscribeAddKey.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写订阅内容后在提交！',
        success: function (res) { }
      })
      return
    }

    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200 && res.data.msg == 'ok') {
          wx.hideLoading()
          _this.onsubscribeAddCancel()
          _this.setData({
            subscribeAddwxId: '',
            subscribeAddwxName: '请先选择订阅者',
            subscribeAddKey: '',
            isShowList: false,
          })
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          _this.getdata()
        }
      }
    })

  },
  onsubscribeAddCancel() {
    this.setData({
      subscribeTc_add: false,
      subscribeAddkey: '',
      subscribeEditId: 0,
    })
  },
  onsubscribeAdd(e) {
    this.setData({
      subscribeTc_add: true,
      subscribeEditId: 0,
    })
  },
  onsubscribeEdit(e) {
    let id = e.currentTarget.dataset.id
    let key = e.currentTarget.dataset.key
    let wx_id = e.currentTarget.dataset.wx_id
    let nick = e.currentTarget.dataset.nick
    this.setData({
      subscribeAddwxId: wx_id,
      subscribeAddwxName: nick,
      subscribeAddKey: key,
      subscribeEditId: id,
      subscribeTc_add: true,
    })
  },
  
  // 大数据订阅end

  // 回复插件接口begin
  delInfo(e) {
    let _this = this
    
    wx.showModal({
      title: '提示',
      content: '确认删除当前回復消息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://qlm.ql888.net.cn/api/Reply/del_reply',
            data: {
              msg_id: e.currentTarget.dataset.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if (res.data.code == 200) {
                wx.hideLoading()
                _this.onreplyAddCancel()
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                })
                _this.setData({
                  replyData: []
                })
                _this.getdata()
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  pageGroupList() {
    wx.navigateTo({
      url: 'reply/groupList?id=' + this.data.userInfo.wxid,
    })
  },
  replyNameInput: function (e) {
    this.setData({
      replyAddName: e.detail.value
    })
  },
  replyConTextarea: function (e) {
    this.setData({
      replyAddCon: e.detail.value
    })
  },
  replyNameInput2: function (e) {
    this.setData({
      replyUpName: e.detail.value
    })
  },
  replyConTextarea2: function (e) {
    this.setData({
      replyUpCon: e.detail.value
    })
  },
  onreplyAdd() {
    this.setData({
      replyTc: true,
      replyTc_add: true,
    })
  },
  onreplyAddCancel() {
    this.setData({
      replyTc: false,
      replyTc_add: false,
      replyTc_uptitle: false,
      replyAddName: '',
      replyAddCon: '',
      replyUpTitle: ''
    })
  },
  replyUp(e) {
    let _this = this, info = {}
    _this.data.replyData.find((o, index) => {
      o.id == e.currentTarget.dataset.id ? info = o : o = o
    })
    this.setData({
      uPid: info.id,
      replyUpTc: true,
      replyUpName: info.key,
      replyUpCon: info.value
    })
  },
  onreplyUpCancel() {
    this.setData({
      replyUpTc: false,
      replyUpName: '',
      replyUpCon: ''
    })
  },
  onreplyUpDefine() {
    let _this = this
    if (this.data.replyUpName.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写触发关键词',
        success: function (res) { }
      })
    } else if (this.data.replyUpCon.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写回复内容',
        success: function (res) { }
      })
    } else {
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: 'https://qlm.ql888.net.cn/api/Reply/update_reply_msg',
        data: {
          id: _this.data.uPid,
          key: _this.data.replyUpName,
          value: _this.data.replyUpCon,
          type: 0,
          is_like: 1,
          template_id: wx.getStorageSync("robotUser_id")
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.code == 200) {
            wx.hideLoading()
            _this.onreplyUpCancel()
            wx.showToast({
              title: '編輯成功',
              icon: 'success',
              duration: 2000
            })
            _this.getdata()
          }
        }
      })
    }
  },
  onreplyAddDefine() {
    let _this = this
    if (this.data.replyAddName.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写触发关键词',
        success: function (res) { }
      })
    } else if (this.data.replyAddCon.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请填写回复内容',
        success: function (res) { }
      })
    } else {
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: 'https://qlm.ql888.net.cn/api/Reply/insert_template_msg',
        data: {
          key: _this.data.replyAddName,
          value: _this.data.replyAddCon,
          type: 0,
          is_like: 1,
          template_id: wx.getStorageSync("robotUser_id")
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.code == 200) {
            wx.hideLoading()
            _this.onreplyAddCancel()
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
            _this.getdata()
          }
        }
      })
    }
  },
  // 回复插件接口end

  pluginSave(e) {
    let _this = this, itemList = [], plugins = {}
    wx.setStorageSync('wxid', _this.data.userInfo.wxid)
    if (e.currentTarget.dataset.id == 1) {
      wx.navigateTo({
        url: 'reply/index?wxid=' + _this.data.userInfo.wxid,
      })
    } else if (e.currentTarget.dataset.id == 24) {
      wx.navigateTo({
        url: 'activity/activityList',
      })
    } else if (e.currentTarget.dataset.id == 23) {
      wx.navigateTo({
        url: 'big-data/index',
      })
    } else if (e.currentTarget.dataset.id == 26) {
      wx.navigateTo({
        url: 'house/index',
      })
    } else if (e.currentTarget.dataset.id == 22) {
      wx.navigateTo({
        url: 'coupon-helper/index?store_id=' + _this.data.storeId,
      })
    } else if (e.currentTarget.dataset.id == 25) {
      wx.navigateTo({
        url: 'goods-helper/index?store_id=' + _this.data.storeId,
      })
    }
    // 暂时不用底部弹出
    // this.data.pluginss.find((o, index) => {
    //   if (o.plugin_id == e.currentTarget.dataset.id) {
    //     plugins = o
    //   }
    // })
    // if (plugins.wx == 0 && plugins.qq == 0) {
    //   itemList = ['设置', '微信开启', 'QQ开启']
    // } else if (plugins.wx == 1 && plugins.qq == 0) {
    //   itemList = ['设置', '微信关闭', 'QQ开启']
    // } else if (plugins.wx == 0 && plugins.qq == 1) {
    //   itemList = ['设置', '微信开启', 'QQ关闭']
    // } else if (plugins.wx == 1 && plugins.qq == 1) {
    //   itemList = ['设置', '微信关闭', 'QQ关闭']
    // }
    // wx.showActionSheet({
    //   itemList: itemList,
    //   success: function (res) {

    //     if (itemList[res.tapIndex] == '设置') {
    //       wx.setStorageSync('wxid', _this.data.userInfo.wxid)
    //       if (e.currentTarget.dataset.id == 1) {
    //         wx.navigateTo({
    //           url: 'reply/index?wxid=' + _this.data.userInfo.wxid,
    //         })
    //       } else if (e.currentTarget.dataset.id == 24) {
    //         wx.navigateTo({
    //           url: 'activity/activityList',
    //         })
    //       } else if (e.currentTarget.dataset.id == 23) {
    //         wx.navigateTo({
    //           url: 'big-data/index',
    //         })
    //       } else if (e.currentTarget.dataset.id == 26) {
    //         wx.navigateTo({
    //           url: 'house/index',
    //         })
    //       } else if (e.currentTarget.dataset.id == 22) {
    //         wx.navigateTo({
    //           url: 'coupon-helper/index?store_id=' + _this.data.storeId,
    //         })
    //       } else if (e.currentTarget.dataset.id == 25) {
    //         wx.navigateTo({
    //           url: 'goods-helper/index?store_id=' + _this.data.storeId,
    //         })
    //       }
    //     } else if (itemList[res.tapIndex] == '卸载') {
    //       _this.pluginUninst(e.currentTarget.dataset.id)
    //     } else if (itemList[res.tapIndex] == '微信开启') {
    //       _this.pluginChangeAppStatus(e.currentTarget.dataset.id, 'wx', 1)
    //     } else if (itemList[res.tapIndex] == '微信关闭') {
    //       _this.pluginChangeAppStatus(e.currentTarget.dataset.id, 'wx', 0)
    //     } else if (itemList[res.tapIndex] == 'QQ开启') {
    //       _this.pluginChangeAppStatus(e.currentTarget.dataset.id, 'qq', 1)
    //     } else if (itemList[res.tapIndex] == 'QQ关闭') {
    //       _this.pluginChangeAppStatus(e.currentTarget.dataset.id, 'qq', 0)
    //     }
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })
  },
  pluginUninst(id) {
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/uninstall_app',
      data: {
        user_id: wx.getStorageSync("robotUser_id"),
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
  pluginChangeAppStatus(id, type, status) {
    let _this = this
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/change_app_status',
      data: {
        user_id: wx.getStorageSync("robotUser_id"),
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
  onaddRobot() {
    // this.setData({
    //   addRobot: false,
    //   qrTishi: true,
    //   robotInfo: false
    // })
    this.onqrcon()
  },
  onaddRobotReturn() {
    if (this.data.pluginss.length != 0) {
      this.setData({
        addRobot: false,
        qrTishi: false,
        robotInfo: true
      })
    } else {
      this.setData({
        addRobot: true,
        qrTishi: false,
        robotInfo: false
      })
    }
  },
  onqrcon() {
    let _this = this
    this.setData({
      addRobot: false,
      qrTishi: false,
      robotInfo: false
    })
    wx.showLoading({
      title: '加载中',
    })
    if (_this.data.process_id == null) {
      wx.request({
        url: 'https://qlm.ql888.net.cn/api/QianLu/send_login_request',
        data: {
          user_id: wx.getStorageSync("robotUser_id")
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
              user_id: wx.getStorageSync("robotUser_id"),
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
                      user_id: wx.getStorageSync("robotUser_id"),
                      process_id: _this.data.process_id
                    },
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success(res) {
                      if (res.data.code == 200 && res.data.data.result == 'finish') {
                        clearInterval(qrdingshiqi)
                        _this.setData({
                          qrCon: false,
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
    } else {
      wx.request({
        url: 'https://qlm.ql888.net.cn/api/QianLu/get_login_res',
        data: {
          user_id: wx.getStorageSync("robotUser_id"),
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
                  user_id: wx.getStorageSync("robotUser_id"),
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
                    _this.getdata()
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
    this.setData({
      qrCon: true,
      qrTishi: false
    })
    setTimeout(function () {
      _this.doajishi()
    }, 15000)
  },
  fanhuizhuye() {
    wx.hideLoading()
    clearInterval(qrdingshiqi)
    this.setData({
      qrCon: false,
    })
    this.getdata()
  },
  getdata() {
    let _this = this
   
   
    wx.showLoading({
      title: "加载中。。。"
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/get_all_plugins',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res3) {
        console.log(res3.data)
        _this.setData({
          plugins: res3.data.data.data
        })
      }
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/get_robot_list',
      data: {
        user_id: wx.getStorageSync("robotUser_id")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res2) {
        console.log(res2.data.msg, "****************************")
        if (res2.data.code == 200) {
          if (res2.data.data[0].id == 0 || res2.data.data[0].status != 0) {
            _this.setData({
              userInfo: {
                id: 0,
                robot_avatar: wx.getStorageSync("users").img,
                robot_name: wx.getStorageSync("users").name,
                status: 5,
                wxid: "请登录"
              },
              addRobot: true
            })
            wx.hideLoading()
          } else {
            _this.setData({
              userInfo: res2.data.data[0]
            })
            wx.setStorageSync('wxid', _this.data.userInfo.wxid)
            wx.hideLoading()
          }
        }
      }
    })
    
    // 自动回复插件内容加载
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/Reply/get_template_reply_list',
      data: {
        template_id: wx.getStorageSync("robotUser_id")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          if (res.data.data.length == 0) {
            _this.setData({
              wxid: _this.data.userInfo.wxid,
              replyAdd: true,
              replyList: false,
            })
          } else {
            _this.setData({
              wxid: _this.data.userInfo.wxid,
              replyAdd: false,
              replyList: true,
              replyData: res.data.data
            })
          }
        }
      }
    })

    _this.setData({
      subscribeTc: false,
      subscribeTc_add: false,
    })
    _this.setData({
      robotId: wx.getStorageSync("wxid"),
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/KeySubscribe/get_list',
      data: {
        robot_id: _this.data.robotId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          if (res.data.data.length == 0) {
            _this.setData({
              subscribeAdd: true,
              subscribeList: false,
            })
          } else {
            _this.setData({
              subscribeAdd: false,
              subscribeList: true,
              subscribeData: res.data.data
            })
            let temp = _this.data.array2
            res.data.data.find((o, index) => {
              temp.push(o.template_name)
            })
            _this.setData({
              array2: temp
            })
          }
        }
      }
    })
    this.getWxList();
    this.getContractInfo();

    // 智能活动推送
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/Scheduled/list',
      data: {
        user_id: wx.getStorageSync("robotUser_id")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200 && res.data.msg == 'ok') {
          wx.hideLoading()
          wx.request({
            url: 'https://wechat.ql888.net/apichange.php',
            data: {
              store_id: wx.getStorageSync("sjdsjid")
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(ress) {
              if (ress.data.code == 200) {
                wx.hideLoading()
                let arrayhd = ['选择推送活动'], activityData = res.data.data
                ress.data.msg.find((o, index) => {
                  arrayhd.push(o.title)
                })
                if (activityData.length != 0) {
                  activityData.find((o, index) => {
                    ress.data.msg.find((x, index2) => {
                      o.activity_id == x.id ? o.activity_title = x.title : o.activity_id = o.activity_id
                    })
                  })
                }
                _this.setData({
                  userActivityData: ress.data.msg,
                  arrayhd: arrayhd,
                  activityData: activityData
                })
              }
            }
          })
        }
      }
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/robot_opt',
      data: {
        robot_id: wx.getStorageSync("wxid"),
        method: 'get_group_list',
        with: 'template'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code == 200) {
          _this.setData({
            wxgroupList: res.data.data
          })
          wx.request({
            url: 'https://qlm.ql888.net.cn/api/Scheduled/get_setting',
            data: {
              user_id: wx.getStorageSync("robotUser_id"),
              robot_id: wx.getStorageSync("wxid"),
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res2) {
              let dateList = _this.data.dateList, wxgroupList = _this.data.wxgroupList, items = _this.data.items, pushGroupText = [], pushTimeText = []
              if (res2.data.code == 200) {
                if (res2.data.data.group_ids != null) {
                  res2.data.data.group_ids.split(',').find((o, index) => {
                    wxgroupList.find((e, index2) => {
                      if(e.wxid == o){
                        e.wxid == o
                        wxgroupList[index2].checked = true
                        pushGroupText.push(e.nickname)
                      }
                    })
                  })
                }
                // 页面显示发布时间和推送对象
                if (res2.data.data.start_date.length != 0) {
                  pushTimeText = res2.data.data.start_date.split(",")
                }
                if (pushTimeText.length == 0) {
                  pushTimeText = res2.data.data.start_time
                } else {
                  pushTimeText.find((o, index) => {
                    if (o == '0') pushTimeText[index] = '周一'
                    if (o == '1') pushTimeText[index] = '周二'
                    if (o == '2') pushTimeText[index] = '周三'
                    if (o == '3') pushTimeText[index] = '周四'
                    if (o == '4') pushTimeText[index] = '周五'
                    if (o == '5') pushTimeText[index] = '周六'
                    if (o == '6') pushTimeText[index] = '周日'
                  })
                  pushTimeText = res2.data.data.start_time + " " + pushTimeText.toString()
                }
                if (pushGroupText.length == 0) {
                  pushGroupText = "未选择推送群"
                } else {
                  pushGroupText = pushGroupText[0] + "等" + pushGroupText.length + "个群聊"
                }
                if (res2.data.data.start_date != null) {
                  res2.data.data.start_date.split(',').find((o, index) => {
                    dateList.find((e, index2) => {
                      e.value == o ? e.checked = true : e = e
                    })
                  })
                }
                console.log(res2.data.data.enable)
                _this.setData({
                  time: res2.data.data.start_time,
                  items: items,
                  wxgroupList: wxgroupList,
                  dateList: dateList,
                  pushTimeText: pushTimeText,
                  pushGroupText: pushGroupText
                })
              }
            }
          })

        } else if (res.data.code == 500) {
          _this.setData({
            pushTimeText: '',
            pushGroupText: '',
            activityData: []
          })
          console.log(_this.data.activityData,'机器人不在的时候')
          wx.showModal({
            title: '提示',
            content: '机器人未登录，请启动后再操作',
            showCancel:false,
            success: function (res) {
            }
          })
          
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    this.setData({
      storeId: options.store_id
    })
    wx.request({
      url: 'https://qlm.ql888.net.cn/api/QianLu/get_user_info',
      data: {
        open_id: wx.getStorageSync("openid"),
        name: wx.getStorageSync("users").name
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res3) {
        console.log(res3.data, '机器人id')
        wx.setStorageSync('robotUser_id', res3.data.data.user_id)
      }
    })
    this.getdata()
  },
  doajishi() {
    if (this.data.userInfo == null && this.data.pluginss.length == 0) {
      wx.hideLoading()
      wx.showToast({
        title: '网络繁忙，请稍后再试',
        icon: 'none',
        duration: 2000
      })
      wx.navigateBack({
        delta: 2,
      });
    }
  },
  tuichudenglu() {
    wx.navigateTo({
      url: '../redbag/merchant?id=' + wx.getStorageSync("sjdsjid"),
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
    this.getdata()
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