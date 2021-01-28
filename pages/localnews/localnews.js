const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  newsList: [],
  newsList2: [],
  newsList3: [],
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  detailsHandler(event) {
    var currentId = event.currentTarget.dataset.newsid;
    // console.log(currentId)
    wx.navigateTo({
      url: '../news_details/news_details?id=' + currentId,
      // url:"https://www.baidu.com",
    })
  },
  onLoad() {
    //调用接口
    var that = this //不要漏了这句，很重要
    wx.request({
      url: 'https://c.m.163.com/nc/article/headline/T1348647853363/0-140.html', //这里填写你的接口路径
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data.T1348647853363[5])
        for (let index = 0; index < 50; index++) {
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
          // console.log(that.data.newsList)
          tmpArr = that.data.newsList;
          tmpArr.push.apply(tmpArr, tmpnewsList);
          // console.log(tmpArr);
          that.setData({
            newsList2: tmpArr
          })
        }
      }
    })
  },
});