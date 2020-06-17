import { evn } from './config'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 封装请求并拦截响应
const request = (api, params, method) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    wx.request({
      url: evn == 'development' ? `https://sixpence.group/dr_server_test${api}` : `https://sixpence.group/dr_server${api}`,
      data: params,
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded',
      //   'csrf-csrf': 'csrf-csrf',
      // },
      method: method ? method : 'get',
      success: (res) => {
        wx.hideLoading();
        resolve(res.data);
      },
      fail: (err) => {
        wx.showToast({
          title: err,
          icon: 'none'
        });
        reject("请求失败")
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  request: request,
}
