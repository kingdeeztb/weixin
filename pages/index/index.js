//index.js
var api = require('../../libs/api')

//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    citySelected: {},
    weatherData: {},
    topCity: {},
    selected: 0,
    tabList: [{
        "pagePath": "pages/index/index",
        "text": "首页",
      },
      {
        "pagePath": "pages/discover/discover/index",
        "text": "发现"
      },
      {
        "pagePath": "pages/organize/organize/index",
        "text": "组队"
      },
      {
        "pagePath": "pages/community/community/index",
        "text": "社区"
      },
      {
        "pagePath": "pages/mine/mine/mine",
        "text": "我的"
      }
    ]
  },

  //事件处理函数
  showDetailPage: function (e) {
    try {
      var cityCode = e.currentTarget.dataset.city_code || '';
    } catch (e) {}

    wx.navigateTo({
      url: '../detail/detail?city_code=' + cityCode
    })
  },
  showSettingPage: function () {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },
  updateTopCity: function (event) {
    var citySelected = wx.getStorageSync('citySelected');
    var weatherData = wx.getStorageSync('weatherData');
    var topCity = {
      left: "",
      center: "",
      right: "",
    };

    var current = event.detail.current;
    try {
      topCity.left = weatherData[citySelected[current - 1]].realtime.city_name;
    } catch (e) {}
    try {
      topCity.center = weatherData[citySelected[current]].realtime.city_name;
    } catch (e) {}
    try {
      topCity.right = weatherData[citySelected[current + 1]].realtime.city_name;
    } catch (e) {}

    this.setData({
      topCity: topCity,
    })
  },

  onLoad: function () {
    var defaultCityCode = "__location__";
    var citySelected = wx.getStorageSync('citySelected');
    var weatherData = wx.getStorageSync('weatherData');
    if (citySelected.length == 0 || weatherData.length == 0) {
      var that = this
      api.loadWeatherData(defaultCityCode, function (cityCode, data) {
        var weatherData = {}
        weatherData[cityCode] = data;
        that.setHomeData([cityCode], weatherData);
      });
    } else {
      this.setHomeData(citySelected, weatherData);
    }
  },
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  onShow: function () {
    var citySelected = wx.getStorageSync('citySelected');
    this.setData({
      citySelected: citySelected,
    })
  },

  setHomeData: function (citySelected, weatherData) {
    var topCity = {
      left: "",
      center: "",
      right: "",
    }
    try {
      topCity.center = weatherData[citySelected[0]].realtime.city_name;
    } catch (e) {}
    try {
      topCity.right = weatherData[citySelected[1]].realtime.city_name;
    } catch (e) {}

    this.setData({
      userInfo: app.globalData.userInfo,
      weatherData: weatherData,
      topCity: topCity,
      citySelected: citySelected,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  switchTab(e) {
    console.log(this.data)
    let key = Number(e.currentTarget.dataset.index);
    let tabList = this.data.tabList;
    let selected = this.data.selected;

    if (selected !== key) {
      this.setData({
        selected: key
      });
      wx.switchTab({
        url: `/${tabList[key].pagePath}`,
      })
    }
  }
})