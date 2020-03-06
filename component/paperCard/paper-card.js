// component/paper-item.js
Component({
	/**
	 * 组件的属性列表
	 */
  properties: {
    fullName: {
      type: String,
      value: ''
    },
    shortName: {
      type: String,
      value: ''
    },
    property: {
      type: Array
    },
    rate: {
      type: Array
    },
    color: {
      type: String,
      value: ''
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log(this.properties)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
	/**
	 * 组件的初始数据
	 */
  data: {

  },
	/**
	 * 组件的方法列表
	 */
  methods: {
    goDetailList: function () {
      wx.navigateTo({
        url: '../temp/index'
      })
    },
  }
})
