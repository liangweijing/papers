//index.js 若一个字也没有就会报警告该页面没有注册
import cnchar from 'cnchar';

//获取应用实例
const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    pageSize: 10,
    journalList: [],
    keywords: '',
    index: "",
    keywords: "",
    indexSelect: "-1",
    firstSubject: "",
    secondSubject: "",
    indexBtn: ["0-5", "5-20", "20-50", "50-100", ">100"],
    list: {},
    secondList: [],
    isLoad: false,
  },
  onLoad (option) {
    this.setData({
      keywords: option.keywords,
    })
    this.getList();
  },
  getList () {
    console.log(123, this.data.keywords)
    let str = "";
    if (this.data.firstSubject) {
      str = `${this.data.firstSubject}?offset=${this.data.journalList.length}&limit=${this.data.pageSize}`;
    } else {
      str = `all?offset=${this.data.journalList.length}&limit=${this.data.pageSize}`;
    }
    if (this.data.index) {
      str = `${str}&index=[${this.data.index.replace('-', ',')}]`;
    }
    if (this.data.secondSubject) {
      str = `${str}&subList=${this.data.secondSubject}`;
    }
    if (this.data.keywords) {
      str = `${str}&qk=${this.data.keywords}`;
    }
    app.request(`/journals/${str}`).then(res => {
      console.log(567, res);
      let arr = [];
      arr = this.data.journalList.concat(res.data);
      let firstSub = res.b_sub_list.filter(o => o != "暂无");
      let obj = {}
      firstSub.forEach(element => {
        let char = cnchar.spell(element, "first").charAt(0);
        if (!obj[char]) {
          obj[char] = [];
        }
        obj[char].push(element);
      });
      let orderedObj = {};
      Object.keys(obj).sort().forEach((key) => {
        orderedObj[key] = obj[key];
      });
      this.setData({
        journalList: arr,
        list: orderedObj,
      });
      if (this.data.firstSubject) {
        console.log(123)
        this.setData({
          secondList: res.s_sub_list,
        })
      }
      if (this.data.journalList.length == res.total) {
        this.setData({
          isLoad: true,
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

  goJournalList: function () {
    wx.navigateTo({
      url: '../temp/index'
    })
  },
  goJournalDetail: function () {
    console.log('confirm');
  },
  clickIndex (e) {
    if (e.currentTarget.id === this.data.indexSelect) {
      // 按钮点了两下则置为不选中
      this.setData({
        indexSelect: "-1",
        index: '',
      })
    } else {
      this.setData({
        journalList: [],
        indexSelect: e.currentTarget.id,
        index: e.currentTarget.dataset.name,
      });
      this.getList();
    }
  },
  clickFirstSubject (e) {
    if (e.currentTarget.dataset.name === this.data.firstSubject) {
      // 按钮点了两下则置为不选中
      this.setData({
        firstSubject: "",
      })
    } else {
      this.setData({
        journalList: [],
        firstSubject: e.currentTarget.dataset.name,
      });
      this.getList();
    }
    console.log(e.currentTarget, this.data.firstSubject)
  },
  clickSecondSubject (e) {
    if (e.currentTarget.dataset.name === this.data.secondSubject) {
      // 按钮点了两下则置为不选中
      this.setData({
        secondSubject: "",
      })
    } else {
      this.setData({
        journalList: [],
        secondSubject: e.currentTarget.dataset.name,
      });
      this.getList();
    }
  },
  //加载更多
  onReachBottom: function () {
    if (!this.data.isLoad) {
      console.log('加载更多');
      this.getList();
    }
  },
  clearAll () {
    this.setData({
      index: '',
      journalList: [],
      firstSubject: '',
      secondSubject: '',
      indexSelect: "-1",
      isLoad: false,
    });
    this.getList();
  }
})
