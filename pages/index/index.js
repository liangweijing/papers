//index.js
let bindData = require('../../common/bindData');

//获取应用实例
const app = getApp()

Page(Object.assign({
  data: {
    CustomBar: app.globalData.CustomBar,
    journalList: [],
    keywords: ''
  },
  onLoad () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    app.request('/journals/hot').then(res => {
      console.log(567, res);
      this.setData({
        journalList: res.data,
      })
    })
  },
  //事件处理函数
  hideModal (e) {
    this.setData({
      modalName: null
    })
  },
  goJournalList: function () {
    wx.navigateTo({
      url: '../temp/index'
    })
  },
  goJournalDetail: function () {
    console.log('confirm');
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
}, bindData))
