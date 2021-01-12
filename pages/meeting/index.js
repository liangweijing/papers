//index.js

//获取应用实例
const app = getApp()

Page({
    data: {
        CustomBar: app.globalData.CustomBar,
        list: [],
        keywords: ''
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        });
        app.request('/conferences/hot?offset=0&limit=300').then(res => {
            // 去空串
            res.data.forEach((element, index) => {
                if (element.rate.length !== 0) {
                    element.rate = element.rate.filter(item => item);
                }
            });
            this.setData({
                list: res.data,
            })
        })
    },
    //事件处理函数
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    goConferenceList: function() {
        wx.navigateTo({
            url: '../meeting_list/index'
        })
    },
})