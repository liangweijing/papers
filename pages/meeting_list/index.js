//index.js

//获取应用实例
const app = getApp()

Page({
    data: {
        CustomBar: app.globalData.CustomBar,
        pageSize: 10,
        list: [],
        isLoad: false,
        onTime: true,
        ccf: false,
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        });
        this.getList();
    },
    //事件处理函数
    getList() {
        let str = `offset=${this.data.list.length}&limit=${this.data.pageSize}`;
        if (this.data.onTime) {
            str = `${str}&onTime=1`;
        }
        if (this.data.ccf) {
            str = `${str}&ccf=1`;
        }
        app.request(`/conferences?${str}`).then(res => {
            res.data.forEach((element, index) => {
                if (element.rate.length !== 0) {
                    element.rate = element.rate.filter(item => item);
                }
            });
            this.setData({
                list: this.data.list.concat(res.data),
            })
            if (this.data.list.length == res.total) {
                this.setData({
                    isLoad: true,
                })
            }
        })
    },
    goConferenceList: function() {
        wx.navigateTo({
            url: '../meeting/index'
        })
    },
    changeOnTime(e) {
        this.setData({
            list: [],
            onTime: e.detail.value,
            isLoad: false
        });
        this.getList();
    },
    changeCCF(e) {
        this.setData({
            ccf: e.detail.value,
            list: [],
            isLoad: false

        });
        this.getList();
    },
    //加载更多
    onReachBottom: function() {
        if (!this.data.isLoad) {
            console.log('加载更多');
            this.getList();
        }
    },
})