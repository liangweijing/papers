//index.js

//获取应用实例
const app = getApp()

Page({
    data: {
        CustomBar: app.globalData.CustomBar,
        journalList: [],
        keywords: '',
        shortcut: [],
        history: [],
        notify: '',
        notifyName: 'notify',
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        });
        this.getList();
    },
    onShow() {
        // 才可赋值给data中数据
        var self = this;
        wx.getStorage({
            key: 'searchWords',
            success(res) {
                self.setData({
                    history: JSON.parse(res.data),
                })
            }
        });
    },
    //事件处理函数
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    hideNotify() {
        this.setData({
            notifyName: null
        })
    },
    getList() {
        app.request('/journals/hot?offset=0&limit=300').then(res => {
            this.setData({
                journalList: res.data,
            })
            app.request('/notify').then(res => {
                this.setData({
                    notify: res.data,
                })
            });
        });
    },
    goJournalList(e) {
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
    goJournalDetail(e) {
        wx.navigateTo({
            url: '../journal_detail/index?journal_id=' + e.currentTarget.dataset.id
        });
    },
    showHistory(e) {
        // console.log(222, e)
        if (this.data.history.length > 0) {
            this.setData({
                modalName: e.currentTarget.dataset.target
            });
        }
    },
    clickHistory(e) {
        console.log(e.currentTarget.id);
        this.setData({
            keywords: e.currentTarget.id,
        });
        this.goJournalList();
    },
    inputgetName(e) {
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
    clearSearch() {
        this.setData({
            keywords: '',
            shortcut: [],
            modalName: null,
        });
    },
    onHide: function() {
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