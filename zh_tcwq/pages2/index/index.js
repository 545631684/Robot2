//index.js
import * as echarts from '../../ec-canvas/echarts.js';
//获取应用实例
const app = getApp()
let chart = null;
let chart2 = null;
let chart3 = null;

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indexData: [],
    txt: [56.8, 20.4, 98.6],
    ec: {
      lazyLoad: true // 延迟加载
    },
    ec2: {
      lazyLoad: true // 延迟加载
    },
    ec3: {
      lazyLoad: true // 延迟加载
    },
    option1: {
      color: ['#2892ff', '#ff9d28', '#2852ff', '#d7ff28', '#44fe9f', '#8242d6'],
      title: {
      },
      tooltip: {
        show: true,
        formatter: '{b}:{c}%'
      },
      grid: {
        show: false,
        top: 10,
        bottom: 20,
        left: 50,
        right: 30
      },
      toolbox: {
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['万商数量', '社群数据', 'AI分析量', '爬虫数据', '机器人部署', '公众号'],
        axisLine: {
          lineStyle: {
            show: true,
            color: '#5ba4d1'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#ffffff',
          fontSize: 8
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            show: true,
            color: '#5ba4d1'
          }
        },
        splitLine: {
          lineStyle: {
            color: ['#525c68']
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#ffffff',
          show: true,
          interval: 'auto',
          formatter: '{value} %'
        },
        nameLocation: 'end'
      },
      series: [
        {
          name: '',
          type: 'bar',
          data: [],
          lineStyle: {
            color: '#5ba4d1'
          },
          itemStyle: {
            color: '#5ba4d1',
            normal: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: function (params) {
                var colorList = ['#B75151', '#5B63D1', '#5ACAD0', '#5BD167', '#D1B05B', '#38E0B4'];
                return colorList[params.dataIndex];
              }
            },
            //鼠标悬停时：
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: false
          },
          symbolSize: 4,
          symbol: 'circle',
          barWidth: 10,
          barGap: '10%'
        }
      ]
    },
    option2: {
      color: ['#ff6563', '#64c1ec', '#92dbab', '#cacbcc'],
      legend: {},
      tooltip: {},
      grid: {
        show: false,
        top: 40,
        bottom: 5,
        left: 40,
        right: 40
      },
      dataset: {
        source: [
          ['product', '', '', '', ''],
          ['Matcha Latte']
        ]
      },
      xAxis: { type: 'category', show: false },
      yAxis: { show: false, },
      series: [
        {
          type: 'bar', barWidth: 10, barGap: '80%', label: {
            normal: {
              show: true,
              position: 'top'
            }
          }
        },
        {
          type: 'bar', barWidth: 10, label: {
            normal: {
              show: true,
              position: 'top'
            }
          }
        },
        {
          type: 'bar', barWidth: 10, label: {
            normal: {
              show: true,
              position: 'top'
            }
          }
        },
        {
          type: 'bar', barWidth: 10, label: {
            normal: {
              show: true,
              position: 'top'
            }
          }
        }
      ]
    },
    option3: {
      color: ['#2892ff', '#ff9d28', '#2852ff', '#d7ff28', '#44fe9f', '#8242d6', '#5af2f3', '#31259d', '#d15b5b'],
      tooltip: {
        show: false
      },
      legend: {
        show: false,
        x: 'right',
        y: 'center',
        orient: 'vertical',
        data: ['rose1', 'rose2'],
        width: 50,
        height: 80
      },
      grid: {
        show: false,
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
      },
      toolbox: {},
      calculable: true,
      series: [
        {
          name: '面积模式',
          type: 'pie',
          radius: [0, 35],
          center: ['50%', '50%'],
          data: [],
          label: {
            normal: {
              show: false,
              position: 'inside'
            }
          },
          labelLine: {
            show: false
          },
          hoverAnimation: false
        }
      ]
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getData: function () {
    let a = this;
    let chartdata1 = a.data.option1, chartdata2 = a.data.option3, chartdata3 = a.data.option3;
    chartdata1.series[0].data = [45, 20, 60, 80, 35, 97];
    chartdata2.series[0].data = [{ name: "房地产", value: 1 }, { name: "餐饮", value: 2 }, { name: "餐饮1", value: 3 }, { name: "餐饮2", value: 4 }, { name: "餐饮3", value: 5 }];
    chartdata3.series[0].data = [{ name: "房地产", value: 1 }, { name: "餐饮", value: 2 }, { name: "餐饮1", value: 3 }, { name: "餐饮2", value: 4 }, { name: "餐饮3", value: 5 }];
    a.setData({
      option1: chartdata1,
      option2: chartdata2,
      option3: chartdata3,
    })
    a.init_echarts1(); //初始化图表
    // a.init_echarts2(); //初始化图表
    // a.init_echarts3(); //初始化图表
  },
  //初始化图表
  init_echarts1: function () {
    this.echartsComponnet1.init((canvas, width, height) => {
      // 初始化图表
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      this.setOption1(chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  init_echarts2: function () {
    this.echartsComponnet2.init((canvas, width, height) => {
      // 初始化图表
      chart2 = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      this.setOption2(chart2);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart2;
    });
  },
  init_echarts3: function () {
    this.echartsComponnet3.init((canvas, width, height) => {
      // 初始化图表
      chart3 = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      this.setOption3(chart3);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart3;
    });
  },
  setOption1: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.data.option1);  //获取新数据
  },
  setOption2: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.data.option2);  //获取新数据
  },
  setOption3: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.data.option3);  //获取新数据
  },
  aaa: function (num) {
    return Math.abs(num / 50)
  },
  onLoad: function () {
    let _this = this
    app.pageOnLoad2(this)
    app.getUser(this)
    // app.getUserInfo(this)
    wx.request({
      url: 'https://go.ql888.net.cn/api/wx/getIndexData',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          _this.setData({
            indexData: res.data.data
          })
        }
      }
    })
    this.echartsComponnet1 = this.selectComponent('#mychart-dom-bar1');
    this.echartsComponnet2 = this.selectComponent('#mychart-dom-bar2');
    this.echartsComponnet3 = this.selectComponent('#mychart-dom-bar3');
    this.getData(); //获取数据
    let option1 = this.data.option1
    option1.series[0].data = [Math.floor(Math.random() * 50 + Math.random() * 50), Math.floor(Math.random() * 50 + Math.random() * 50), Math.floor(Math.random() * 50 + Math.random() * 50), Math.floor(Math.random() * 50 + Math.random() * 50), Math.floor(Math.random() * 50 + Math.random() * 50), Math.floor(Math.random() * 50 + Math.random() * 50)]
    this.setData({
      txt: [Math.floor(Math.random() * 50 + Math.random() * 50), Math.floor(Math.random() * 50 + Math.random() * 50), Math.floor(Math.random() * 50 + Math.random() * 50)],
      option1: option1
    })
  },
  onReady: function () {
    // 获得circle组件
    this.circle1 = this.selectComponent("#circle1");
    this.circle2 = this.selectComponent("#circle2");
    this.circle3 = this.selectComponent("#circle3");
    // 绘制背景圆环
    this.circle1.drawCircleBg('circle_bg1', 37.5, 8)
    this.circle2.drawCircleBg('circle_bg2', 37.5, 8)
    this.circle3.drawCircleBg('circle_bg3', 37.5, 8)
    // 绘制彩色圆环 
    this.circle1.drawCircle('circle_draw1', 37.5, 8, this.aaa(this.data.txt[0]), ['#5D9CEC', '#3580E1', '#0E65D7']);
    this.circle2.drawCircle('circle_draw2', 37.5, 8, this.aaa(this.data.txt[1]), ['#45EEC1', '#31D8AC', '#43EE96']);
    this.circle3.drawCircle('circle_draw3', 37.5, 8, this.aaa(this.data.txt[2]), ['#45EEC1', '#31D8AC', '#43EE96']);
  }
})
