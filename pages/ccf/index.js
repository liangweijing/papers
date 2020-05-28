//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    TopTabCur: '0',
    TabCur: 0,
    VerticalNavTop: 0,
    MainCur: 0,
    load: true,
    list: [],
    listCur: '',
    detail: {},
    subjectIndex: '',
  },
  onLoad () {
    wx.showShareMenu({
      withShareTicket: true
    })
    this.getList();
  },
  getList () {
    let param = "";
    if (Number(this.data.TopTabCur) === 0) {
      param = "journal";
    } else {
      param = "conference";
    }
    return app.request('/ccf_info/' + param).then(res => {
      console.log('ccf', res);
      res.data.forEach((ele, index) => {
        ele.id = index;
      });
      console.log(res.data)
      this.setData({
        list: res.data,
        listCur: res.data[0]
      })
      return;
    })
  },
  goDetail () {
    wx.navigateTo({
      url: "/pages/journal_detail/index?journal_id={{item.journal_id}}",
    })
  },
  //事件处理函数
  // 点击某一期刊、会议
  showModal (e) {
    let subjectId = e.currentTarget.dataset.subjectid;
    let articleId = e.currentTarget.dataset.articleid;
    let temp = this.data.list[subjectId].list[articleId];
    Object.keys(temp).forEach(key => {
      if (typeof temp[key] === "string") {
        temp[key] = temp[key].replace(/^\s+|\s+$/g, "");
      }
    });
    this.setData({
      modalName: e.currentTarget.dataset.target,
      detail: temp,
    });
  },
  hideModal (e) {
    this.setData({
      modalName: null
    })
  },
  // 切换期刊、会议Tab
  tabTopSelect (e) {
    if (e.currentTarget.dataset.id == this.data.TopTabCur) { return; }
    this.setData({
      TopTabCur: e.currentTarget.dataset.id,
      load: true,
    });
    // 手机上调试问题是因为没有PC端网速那么快，数据还没获取渲染完成，在上面setData中重新设置高度VerticalNavTop是不对的
    this.getList().then(() => {
      this.setData({
        TabCur: this.data.subjectIndex,
        MainCur: this.data.subjectIndex,
        VerticalNavTop: (this.data.subjectIndex - 1) * 100
      })
    })
  },
  // 点击切换垂直Tab
  tabSelect (e) {
    this.setData({
      subjectIndex: e.currentTarget.dataset.id,
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 100
    })
  },
  // 滚动右侧内容
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
          VerticalNavTop: (list[i].id - 1) * 100,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  setClipboard (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.url,
      success (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
        });
      }
    })
  }
})
