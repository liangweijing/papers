//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    list: { 'D': ["地学", "地学天文"], 'G': ["工程技术", "管理科学"], 'H': ["化学", "环境科学与生态学"], 'N': ["农林科学"], 'S': ["数学", "生物", "社会科学"], 'W': ["物理"], 'Y': ["医学"], 'Z': ["综合性期刊"] },
  },
  goJournalList: function () {
    wx.navigateTo({
      url: '../journal_list/index'
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
