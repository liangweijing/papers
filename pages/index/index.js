//index.js
// let bindData = require('../../common/bindData');

//获取应用实例
const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    journalList: [],
    keywords: '',
    shortcut: [],
  },
  onLoad () {
    app.request('/journals/hot?offset=1&limit=300').then(res => {
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
  goJournalList: function (e) {
    let url = "";
    if (e.currentTarget.id) {
      url = '../journal_list/index';
    } else {
      url = '../journal_list/index?keywords=' + this.data.keywords;
    }
    wx.navigateTo({
      url: url,
    })
  },
  goJournalDetail: function (e) {
    wx.navigateTo({
      url: '../journal_detail/index?journal_id=' + e.currentTarget.dataset.id
    });
  },
  inputgetName (e) {
    let name = e.currentTarget.dataset.keywords;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap);
    console.log(nameMap, e);
    if (e.detail.value.length >= 2) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      });
      app.request('/journal/search/' + nameMap[name] + '?offset=1&limit=6').then(res => {
        let tip = "";
        if (res.data.length == 0) {
          tip = "抱歉没有找到相关内容";
        } else {
          tip = "查看更多搜索结果，请点击'搜索'按钮";
        }
        this.setData({
          shortcut: res.data,
          tip: tip,
        });
      });
    } else {
      this.setData({
        modalName: null
      })
    }
  },
})
