//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    pageSize: 10,
    list: [],
    isLoad: false,
    onTime: false,
    ccf: false,
  },
  onLoad () {
    this.getList();
  },
  //事件处理函数
  getList () {
    let str = `offset=${this.data.list.length}&limit=${this.data.pageSize}`;
    if (this.data.onTime) {
      str = `${str}&onTime=1`;
    }
    if (this.data.ccf) {
      str = `${str}&ccf=1`;
    }
    app.request(`/conferences?${str}`).then(res => {

      this.setData({
        list: this.data.list.concat(res.data),
      })
      if (this.data.list.length == res.total) {
        this.setData({
          isLoad: true,
        })
      }
    })
  },
  goConferenceList: function () {
    wx.navigateTo({
      url: '../meeting/index'
    })
  },
  changeOnTime (e) {
    this.setData({
      list: [],
      onTime: e.detail.value
    });
    this.getList();
  },
  changeCCF (e) {
    this.setData({
      ccf: e.detail.value,
      list: [],
    });
    this.getList();
  },
  //加载更多
  onReachBottom: function () {
    if (!this.data.isLoad) {
      console.log('加载更多');
      this.getList();
    }
  },
})
