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
    history: [],
  },
  onLoad () {
    wx.showShareMenu({
      withShareTicket: true
    });
    this.autoUpdate();
    this.getList();
  },
  onShow () {
    // 才可赋值给data中数据
    var self = this;
    wx.getStorage({
      key: 'searchWords',
      success (res) {
        self.setData({
          history: JSON.parse(res.data),
        })
      }
    });
  },
  //事件处理函数
  hideModal (e) {
    this.setData({
      modalName: null
    })
  },
  autoUpdate () {
    var self = this;
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate((res) => {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否下载新版本并重启小程序？',
            success (res) {
              if (res.confirm) {
                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                self.downLoadAndUpdate(updateManager)
              } else if (res.cancel) {
                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                // wx.showModal({
                //   title: '温馨提示~',
                //   content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                //   showCancel: false,//隐藏取消按钮
                //   confirmText: "确定更新",//只保留确定更新按钮
                //   success: function (res) {
                //     if (res.confirm) {
                //       //下载新版本，并重新应用
                //       self.downLoadAndUpdate(updateManager)
                //     }
                //   }
                // })
              }
            }
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      // wx.showModal({
      //   title: '提示',
      //   content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      // })
    }
  },
  /**
   * 下载小程序新版本并重启应用
   */
  downLoadAndUpdate (updateManager) {
    var self = this
    wx.showLoading();
    //静默下载更新小程序新版本
    updateManager.onUpdateReady(() => {
      wx.hideLoading()
      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(() => {
      // 新的版本下载失败
      wx.hideLoading()
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    })
  },
  getList () {
    app.request('/journals/hot?offset=0&limit=300').then(res => {
      this.setData({
        journalList: res.data,
      })
    });
  },
  goJournalList (e) {
    let url = "";
    if (e && e.currentTarget.id) {
      url = '../journal_list/index';
    } else {
      url = '../journal_list/index?keywords=' + this.data.keywords;
    }
    this.setData({
      modalName: null
    });
    wx.navigateTo({
      url: url,
    });
  },
  goJournalDetail (e) {
    wx.navigateTo({
      url: '../journal_detail/index?journal_id=' + e.currentTarget.dataset.id
    });
  },
  showHistory (e) {
    // console.log(222, e)
    if (this.data.history.length > 0) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      });
    }
  },
  clickHistory (e) {
    console.log(e.currentTarget.id);
    this.setData({
      keywords: e.currentTarget.id,
    });
    this.goJournalList();
  },
  inputgetName (e) {
    let name = e.currentTarget.dataset.keywords;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap);
    // console.log(nameMap, e);
    if (e.detail.value.length > 0) {
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
        modalName: null,
        shortcut: [],
      })
    }
  },
  clearSearch () {
    this.setData({
      keywords: '',
      shortcut: [],
      modalName: null,
    });
  },
  onHide: function () {
    if (this.data.keywords) {
      let arr = this.data.history;
      if (!this.data.history.includes(this.data.keywords)) {
        arr.unshift(this.data.keywords);
        if (arr.length > 5) {
          arr = arr.length > 5 ? arr.filter((o, index) => index < 5) : arr;
        }
        let parseKeywords = JSON.stringify(arr);
        wx.setStorage({
          key: "searchWords",
          data: parseKeywords,
        });
      }
      this.setData({
        keywords: '',
        shortcut: [],
      })
    }

  },
})
