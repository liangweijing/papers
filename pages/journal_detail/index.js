
//获取应用实例

import * as echarts from '../../ec-canvas/echarts';
let year_list = [];
let index_list = [];
const app = getApp()

function setOption (chart) {
  const option = {
    // title: {
    //   text: '测试下面legend的红色区域不应被裁剪',
    //   left: 'center'
    // },
    color: ["#1cbbb4"],
    // legend: {
    //   data: ['A', 'B', 'C'],
    //   top: 50,
    //   left: 'center',
    //   backgroundColor: 'red',
    //   z: 100
    // },
    grid: {
      containLabel: true,
      left: '5%',
      top: '10%',
      botoom: '0%'
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      // type: 'category',
      // boundaryGap: false,
      // axisLabel: { interval: 0, rotate: 45 },
      data: year_list,
      // show: false
    },
    yAxis: {
      // x: 'center',
      // type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      // axisLine: {
      //   show: false,//不显示坐标轴线
      // },
      // max: 2.5,
      // min: 0,
      splitNumber: 5,
      // show: false
    },
    series: [{
      name: '影响因子',
      type: 'line',
      smooth: true,
      areaStyle: {
        type: 'default',
        //渐变色实现
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,//变化度
          //三种由深及浅的颜色
          [{
            offset: 0,
            color: '#3ebf9b'
          }, {
            offset: 0.5,
            color: '#267268'
          }, {
            offset: 1,
            color: '#14323f'
          }]),
      },
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: index_list
    }]
  };
  chart.setOption(option);
}

Page({
  // onShareAppMessage: function (res) {
  //   return {
  //     title: 'ECharts 可以在微信小程序中使用啦！',
  //     path: '/pages/index/index',
  //     success: function () { },
  //     fail: function () { },
  //   }
  // },
  data: {
    CustomBar: app.globalData.CustomBar,
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    TabCur: 0,
    ec: {
      lazyLoad: true
      // onInit: initChart,
    },
    isLoaded: false,
    isDisposed: false,
    year_list: [],
    index_list: [],
    ecTitle: ["统计图", "数据"],
    isFavor: false,
    content: {
      id: 87,
      journal_accept: "",
      journal_b_sub: "",
      journal_ccf: "",
      journal_desc: "",
      journal_h_index: "",
      journal_hot: false,
      journal_index: "",
      journal_index_self: "",
      journal_issn: "",
      journal_jcr: "",
      journal_name: "",
      journal_name_u: "",
      journal_oa: "",
      journal_office: "",
      journal_papers: "",
      journal_period: "",
      journal_public: "",
      journal_q: "",
      journal_s_sub: "",
      journal_sci: "",
      journal_search_num: 0,
      journal_short_name: "",
      journal_total_index: "",
    },
  },
  onLoad (option) {
    // this.setData({
    //   nbTitle: '新标题',
    //   nbLoading: true,
    //   nbFrontColor: '#ffffff',
    //   nbBackgroundColor: '#000000',
    // })
    wx.showShareMenu({
      withShareTicket: true
    });
    this.setData({
      journal_id: option.journal_id
    })

  },
  onReady () {
    let id = this.data.journal_id;
    this.ecComponent = this.selectComponent('#mychart');
    app.request(`/journal/${Number(id)}`).then(res => {
      console.log(789, res);
      this.setData({
        content: res.data[0],
        year_list: res.year_list,
        index_list: res.index_list,
      });
      year_list = res.year_list;
      index_list = res.index_list;
      this.init();
    })
  },
  // 点击按钮后初始化图表
  init () {
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      chart.showLoading(); // 首次显示加载动画
      setOption(chart);
      chart.hideLoading(); // 隐藏加载动画
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  dispose () {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
  },
  pageBack () {
    wx.navigateBack({
      delta: 1
    });
  },
  tabSelect (e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  toggle (e) {
    // console.log(e);
    var anmiaton = e.currentTarget.dataset.class;
    var that = this;
    that.setData({
      animation: anmiaton,
      isFavor: !that.data.isFavor
    })
    console.log(this.data.animation);
    setTimeout(function () {
      that.setData({
        animation: ''
      })
    }, 1000)
    wx.showToast({
      title: '暂未开放此功能',
      icon: 'none',
    })
  },
  setClipboard (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
        });
      }
    })
  },
  unfinished () {
    app.unfinished();
  }
})
