//index.js
let bindData = require('../../common/bindData');

//获取应用实例
const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TopTabCur: 0,
    TabCur: 0,
    VerticalNavTop: 0,
    MainCur: 0,
    load: true,
    list: [],
    listCur: '',
  },
  onLoad () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    app.request('/ccf_info').then(res => {
      console.log('ccf', res);
      this.setData({
        list: res.data.sub_list,
        listCur: res.data.sub_list[0]
      })
    })
    // let list = [{}];
    // for (let i = 0; i < 26; i++) {
    //   list[i] = {};
    //   list[i].name = String.fromCharCode(65 + i);
    //   list[i].id = i;
    // }
    // this.setData({
    //   list: list,
    //   listCur: list[0]
    // })
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
})
