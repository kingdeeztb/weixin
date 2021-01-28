// pages/news-details/newsdetails.js
// var data = require("../data/data.js");
/**
* WxParse.wxParse(bindName , type, data, target,imagePadding)
* 1.bindName绑定的数据名(必填)
* 2.type可以为html或者md(必填)
* 3.data为传入的具体数据(必填)
* 4.target为Page对象,一般为this(必填)
* 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
链接：https://www.jianshu.com/p/3de027555e77
*/



var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  // data: {
  //   currentNews:{}
  // },
  data: {
    newsdetail: "", //匹配的数据
    news_data: [{
      id: 'G1BJ2D860519JFL10',
      images: "1.在列表页，要将网页上获取的信息根据id的不同，在列表页，要将网页上获取的信息根据id的不同，在列表页，要将网页上获取的信息根据id的不同，在列表页，要将网页上获取的信息根据id的不同，",
      newsurl: "fffffff"
    }, {
      id: 2,
      images: ["gdsfsdf"],
      newsurl: ""
    }, {
      id: 3,
      images: ["fsefreferet"],
      newsurl: ""

    }], // 本地数据,
    urldata: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.news_data.forEach)
    console.log("详细页获得的id为" + options.id)
    this.data.news_data.forEach(item => {
      if (options.id != item.id) { // options.id 就是首页传过来的id，接下来循环找到id所匹配的数据就可以进行渲染啦！
        this.setData({
          urldata: [{
            id: options.id,
            newsdetail: "item.images",
            newsurl: "https://3g.163.com/dy/article/" + options.id + ".html",
            //拼接出新闻的链接地址,并写入新的urldata数组
          }]
        })
      }
    })
    console.log(this.data.urldata[0].newsurl)//输出新闻最新链接地址
    //对urldata数组的新闻链接地址进行分析处理,返回给前台页面
    this.setData({
      id: this.data.urldata[0].id,
      newsdetail: this.data.urldata[0].newsdetail,
      newsurl: this.data.urldata[0].newsurl,
    })

    var weburl = this.data.urldata[0].newsurl
    console.log("输出最新的链接地址为:"+weburl)//输出最新链接地址,下一步进行处理

    /*method为post时，header必须为（POST 请求会将data的值放在Request Payload里面，而不是Query String Parameters里面，后端服务器如果不注意，就无法取到数据。）：header: { 'content-type': 'application/x-www-form-urlencoded' }, 如果header配置错误会导致后台得不到数据而报NullPointerException错误。  */

    wx.request({
      url: weburl,
      method: 'GET',
      data: {
        'id': 13
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // var article = res.data[0].get;
        // var article = '<div>我是HTML代码</div>';
        console.log("文章内容是"+res.data)
        var that = this;
        WxParse.wxParse('article', 'html', res.data.data, that, 5);
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})