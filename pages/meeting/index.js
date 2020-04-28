//index.js
let bindData = require('../../common/bindData');

//获取应用实例
const app = getApp()

Page(Object.assign({
  data: {
    CustomBar: app.globalData.CustomBar,
    journalList: [
      {
        fullName: "Computer Science And Technology Art Testing",
        shortName: "",
        property: ["计算机科学与技术", "影响因子：1.56"],
        rate: ["JCR：三区", "CCF：A级"]
      },
      {
        fullName: "Computer Science And Technology Art Testing",
        shortName: "CS A TAT",
        property: ["计算机科学与技术", "影响因子:1.56", "回复:5-6个月",],
        rate: ["JCR:三区", "CCF:A级", "投稿量:5000"]
      },
      {
        fullName: "Computer Science And Technology Art Testing",
        shortName: "CS A TAT",
        property: ["计算机科学与技术", "影响因子：1.56"],
        rate: ["JCR：三区", "CCF：A级"]
      },
      {
        fullName: "Computer Science And Technology Art Testing",
        shortName: "CS A TAT",
        property: ["计算机科学与技术", "影响因子：1.56"],
        rate: ["JCR：三区", "CCF：A级"]
      },
      {
        fullName: "Computer Science And Technology Art Testing",
        shortName: "CS A TAT",
        property: ["计算机科学与技术", "影响因子：1.56"],
        rate: ["JCR：三区", "CCF：A级"]
      },
      {
        fullName: "Computer Science And Technology Art Testing",
        shortName: "CS A TAT",
        property: ["计算机科学与技术", "影响因子：1.56"],
        rate: ["JCR：三区", "CCF：A级"]
      }
    ],
    keywords: ''
  },
  onLoad () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    wx.request({
      url: 'https://sixpence.group/dr_server/journals/hot',
      success (res) {
        wx.hideLoading();
        console.log(res.data)
      }
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
