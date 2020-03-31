//index.js
let bindData = require('../../common/bindData');

//获取应用实例
const app = getApp()

Page(Object.assign({
  data: {
    CustomBar: app.globalData.CustomBar,
    TopTabCur: 0,
    TabCur: 0,
    VerticalNavTop: 0,
    MainCur: 0,
    list: [],
    load: true,
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
  },
  onLoad () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let list = [{}];
    for (let i = 0; i < 26; i++) {
      list[i] = {};
      list[i].name = String.fromCharCode(65 + i);
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady () {
    wx.hideLoading()
  },
  //事件处理函数
  tabTopSelect (e) {
    this.setData({
      TopTabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  tabSelect (e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 85
    })
  },
  VerticalMain (e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 85,
          TabCur: list[i].id
        })
        return false
      }
    }
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
