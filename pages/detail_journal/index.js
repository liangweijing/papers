
//获取应用实例

import * as echarts from '../../ec-canvas/echarts';

const app = getApp()
function initChart (canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    // title: {
    //   text: '测试下面legend的红色区域不应被裁剪',
    //   left: 'center'
    // },
    color: ["#72c042"],
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
      top: '20%',
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
      data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020'],
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
      max: 2.5,
      min: 0,
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
      data: [1.56, 1.01, 0.25, 2.10, 1.89, 1.11, 0.88]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    CustomBar: app.globalData.CustomBar,
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    fullName: '4OR-A Quality Journal Of Options Research Listing',
    shortName: '4OR-A QJOOR',
    TabCur: 0,
    ec: {
      onInit: initChart
    },
    ecTitle: ["统计图", "数据"]
  },
  onLoad (journal_id) {
    this.setData({
      nbTitle: '新标题',
      nbLoading: true,
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000',
    })
    console.log(journal_id);
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
  },
  onReady () {
    wx.hideLoading();
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
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
  }
})
