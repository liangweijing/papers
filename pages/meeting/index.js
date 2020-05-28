//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    list: [],
    keywords: ''
  },
  onLoad () {
    wx.showShareMenu({
      withShareTicket: true
    });
    app.request('/conferences/hot?offset=0&limit=300').then(res => {
      console.log(567, res);
      this.setData({
        list: res.data,
      })
    })
  },
  //事件处理函数
  hideModal (e) {
    this.setData({
      modalName: null
    })
  },
  goConferenceList: function () {
    wx.navigateTo({
      url: '../meeting_list/index'
    })
  },
})
