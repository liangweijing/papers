//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
      },
      {
        fullName: "Computer Science And Technology Art Testing",
        shortName: "CS A TAT",
        property: ["计算机科学与技术", "影响因子：1.56"],
        rate: ["JCR：三区", "CCF：A级"]
      }
    ]
  },
  //事件处理函数
  goJournalList: function () {
    wx.navigateTo({
      url: '../temp/index'
    })
  },
  onLoad: function () {

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
