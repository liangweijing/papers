
//获取应用实例

const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    isFavor: false,
    content: {
    },
    wrapStyle: '',

    position: '',
    more: false,
  },
  onLoad (option) {
    this.setData({
      offsetTop: this.data.CustomBar, //需要粘性定位的位置，根据项目需求
    });
    app.request(`/conference?id=${Number(option.id)}`).then(res => {
      Object.keys(res).forEach(key => {
        if (typeof res[key] === "string") {
          res[key] = res[key].replace(/^\s+|\s+$/g, "");
        }
        if (key == 'con_cfp') {
          let arr = res[key].split("\r\n");
          let article = ""
          arr.forEach(str => {
            article += `<p style="text-indent:2em;">${str}</p>`
          })
          res[key] = article;
          // res[key] = res[key].replace(/\r\n/g, "<br/>");
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
  showMore () {
    this.setData({
      more: !this.data.more,
      wrapStyle: '',
      position: '',
    })
  },
  unfinished () {
    app.unfinished();
  },
  onReady () {
    // 页面渲染完，获取节点信息(重要)
    wx.createSelectorQuery().in(this).select('.sticky_item').boundingClientRect(
      rect => {
        this.navHeight = rect.height;
        // 执行回调
        this.observerContentScroll()
      }
    ).exec();
  },
  observerContentScroll () {
    const { offsetTop } = this.data;
    const { windowHeight } = wx.getSystemInfoSync(); //可使用窗口高度
    this.createIntersectionObserver().disconnect();
    this.createIntersectionObserver()
      // 如果目标节点（用选择器 .target-class 指定）进入显示区域以下  px 时，触发回调函数。
      // 在吸顶在顶部，因此bottom为负数，bottom具体 -1 或者...（可能border影响）
      //不要小于（windowHeight - offsetTop），具体自行调试
      .relativeToViewport({
        bottom: -(windowHeight - offsetTop - 1)
      })
      .observe('.sticky', (res) => {
        console.log(res);
        const { top, bottom } = res.boundingClientRect;
        if (bottom < this.navHeight) {
          return;
        }
        const position = res.intersectionRatio > 0 ? 'top' : '';
        this.setData({
          scrollTop: top + offsetTop,
          isFixed: position === 'top'
        }, function () {
          this.setPosition(position);
        })
      });
  },

  setPosition (position) {
    if (position !== this.data.position) {
      this.setData({
        position
      }, function () {
        const { offsetTop, position } = this.data;
        let wrapStyle;
        switch (position) {
          case 'top':
            wrapStyle = `top: ${offsetTop}px; position: fixed;`;
            break;
          case 'bottom':
            wrapStyle = `top: auto; bottom: 0; `;
            break;
          default:
            wrapStyle = '';
        }
        // 
        if (wrapStyle === this.data.wrapStyle)
          return;
        this.setData({
          wrapStyle
        });
      })
    }
  },
})
