// pages/news-details/newsdetails.js
// var WxParse = require('../wxParse/wxParse.js');
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
      id: '',
      images: "",
      newsurl: ""
    }], // 本地数据,
    urldata: [],
    endnewsdata: [],
    newsList: [],
    newsheji: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.news_data.forEach)
    console.log("详细页获得的id为" + options.id)
    this.data.news_data.forEach(item => {
      if (options.id != item.id) { // options.id 就是首页传过来的id，接下来循环找到id所匹配的数据就可以进行渲染啦！
        this.setData({
          urldata: [{
            id: options.id,
            // newsdetail: "item.images",
            // newsurl: "https://3g.163.com/dy/article/" + options.id + ".html",
            //拼接出新闻的链接地址,并写入新的urldata数组
          }]
        })
      }
    })
    console.log("我们获取的id:" + this.data.urldata[0].id)
    //调用接口
    var wangba = this.data.urldata[0].id
    console.log("wangba no." + wangba)
    //怎么吧王八传进去,获取对应的新闻?




    var that = this //不要漏了这句，很重要
    wx.request({
      url: 'https://c.m.163.com/nc/article/headline/T1348647853363/0-140.html', //这里填写你的接口路径
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log("新闻内容列表:"+ res.data.T1348647853363[0].title)
        for (let index = 0; index < 6; index++) {
          var long_data = res.data.T1348647853363[index];
          var tmpnewsList = that.data.newsList;
          var tmpArr;
          that.setData({
            newsList: [{
              id: 0 + index,
              title: long_data.title,
              digest: long_data.digest,
              imgsrc: long_data.imgsrc,
              source: long_data.source,
              ptime: long_data.ptime,
              url: "https://3g.163.com/news/article/" + long_data.postid + ".html",
              url_3w: "https://3g.163.com/news/article/" + long_data.postid + ".html",
              postid: long_data.postid
            }]
          })
          // console.log("对应的新闻列表:"+that.data.newsList.title)
          tmpArr = that.data.newsList;
          tmpArr.push.apply(tmpArr, tmpnewsList);
          //  console.log(tmpArr);
          that.setData({
            endnewsdata: tmpArr
          })
          //  console.log(tmpArr[0])
          var tmpheji = tmpArr;
          // var tmpnewsheji = that.data.newsheji;
          //  tmpheji.push.apply(tmpheji, tmpnewsheji);
          //  console.log(tmpheji)
          that.setData({
            newsheji: tmpheji
          })

          // console.log("新闻newsheji:"+that.data.newsheji[0].id+that.data.newsheji[0].title)//存放到newsheji数组中,生成新数组.



          // console.log("caonima:"+caonimaid+":"+caonima)
          that.data.newsheji.forEach(item => {
            console.log("itemid" + item.id + item.title)
            var les = that.data.newsheji.length
            console.log(les)
            var index = options.id
            if (options.id == item.id) { // options.id 就是首页传过来的id，接下来循环找到id所匹配的数据就可以进行渲染啦！
              that.setData({

                id: that.data.newsheji[index].id,
                newsdetail: that.data.newsheji[index].digest,
                newsurl: that.data.newsheji[index].url,
                newsimg: that.data.newsheji[index].imgsrc,
                newsptime: that.data.newsheji[index].ptime,
                newssource: that.data.newsheji[index].source,
                title: that.data.newsheji[index].title,
                //拼接出新闻的链接地址,并写入新的urldata数组
                /*digest: "文|王珍一编辑|孙大圣2001年，北京的一位语文老师在翻看《瑞丽》杂志时，发现《瑞丽》要举办模特大赛，他觉得自己的一位女学生特别适合参加，于是他鼓励这位女学生去"
id: 5
imgsrc: "http://cms-bucket.ws.126.net/2021/0128/4d55547bp00qnmhbm006kc0009c0070c.png"
postid: "G1D658620537TCED"
ptime: "2021-01-28 10:28:12"
source: "王珍一的江湖#"
title: "未婚生女、机场露胸 这位“贵圈奇女”上位史如此精彩"
url: "https://3g.163.com/news/article/G1D658620537TCED.html"
url_3w: "https://3g.163.com/news/article/G1D658620537TCED.html"*/

              })
            }
          })

        }
        // console.log(that.data.endnewsdata.ptime)
      }



    })

    //对urldata数组的新闻链接地址进行分析处理,返回给前台页面
    // this.setData({
    //   id: this.data.urldata[0].id,
    //   newsdetail: this.data.urldata[0].newsdetail,
    //   newsurl: this.data.urldata[0].newsurl,
    // })


    /*method为post时，header必须为（POST 请求会将data的值放在Request Payload里面，而不是Query String Parameters里面，后端服务器如果不注意，就无法取到数据。）：header: { 'content-type': 'application/x-www-form-urlencoded' }, 如果header配置错误会导致后台得不到数据而报NullPointerException错误。  */

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