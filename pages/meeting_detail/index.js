
//获取应用实例

const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    isFavor: false,
    content: {
    },
  },
  onLoad (option) {
    this.setData({
      nbTitle: '新标题',
      nbLoading: true,
      nbFrontColor: '#ffffff',
      nbBackgroundColor: '#000000',
    })
    console.log(option);
    app.request(`/conference?id=${Number(option.id)}`).then(res => {
      Object.keys(res).forEach(key => {
        if (typeof res[key] === "string") {
          res[key] = res[key].replace(/^\s+|\s+$/g, "");
        }
      });
      this.setData({
        content: res,
      })
    })
  },
  pageBack () {
    wx.navigateBack({
      delta: 1
    });
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
  },
  toggle (e) {
    // console.log(e);
    var anmiaton = e.currentTarget.dataset.class;
    var that = this;
    that.setData({
      animation: anmiaton,
      isFavor: !that.data.isFavor
    })
    console.log(this.data.animation);
    setTimeout(function () {
      that.setData({
        animation: ''
      })
    }, 1000);
    wx.showToast({
      title: '暂未开放此功能',
      icon: 'none',
    })
  },
  unfinished () {
    app.unfinished();
  }
})
