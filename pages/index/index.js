//index.js
let bindData = require('../../common/bindData');

//获取应用实例
const app = getApp()

Page(Object.assign({
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
    ],
    keywords: ''
  },
  onLoad: function () {

  },
  //事件处理函数
  goJournalList: function () {
    wx.navigateTo({
      url: '../temp/index'
    })
  },
  searchJournal: function (e) {
    let key = e.detail.value;
    if (key.length > 1) {
      //request
    }
    // let list = this.data.icon;
    // for (let i = 0; i < list.length; i++) {
    //   let a = key;
    //   let b = list[i].name.toLowerCase();
    //   if (b.search(a) != -1) {
    //     list[i].isShow = true
    //   } else {
    //     list[i].isShow = false
    //   }
    // }
    // this.setData({
    //   icon: list
    // })
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
