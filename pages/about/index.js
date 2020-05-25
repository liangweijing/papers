const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },
  attached () {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH () {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(3000),
          forksCount: that.coutNum(484),
          visitTotal: that.coutNum(24000)
        })
      }
    }
    wx.hideLoading()
  },
  methods: {
    coutNum (e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink (e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal (e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal (e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode () {
      wx.previewImage({
        urls: ['https://ftp.bmp.ovh/imgs/2020/05/45b51aa8c6b2c8d6.jpg'],
        current: 'https://ftp.bmp.ovh/imgs/2020/05/45b51aa8c6b2c8d6.jpg' // 当前显示图片的http链接      
      })
    },
    // showQrcodeDr () {
    //   wx.previewImage({
    //     urls: ['https://ftp.bmp.ovh/imgs/2020/05/b0d9769346e3477f.png'],
    //     current: 'https://ftp.bmp.ovh/imgs/2020/05/b0d9769346e3477f.png' // 当前显示图片的http链接
    //   })
    // },
    showQrcodeDr () {
      wx.previewImage({
        urls: ['https://ftp.bmp.ovh/imgs/2020/05/256e6353994aab2b.gif'],
        current: 'https://ftp.bmp.ovh/imgs/2020/05/256e6353994aab2b.gif' // 当前显示图片的http链接      
      })
    },
  }
})