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
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  onLoad() {
    //调用接口
    var that = this //不要漏了这句，很重要
    wx.request({
      url: 'https://c.m.163.com/nc/article/headline/T1348647853363/0-140.html', //这里填写你的接口路径
      // url:'https://3g.163.com/touch/reconstruct/article/list/BA8D4A3Rwangning/0-20.html',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //  console.log(res.data.T1348647853363[0])
        for (let index = 71; index < 140; index++) {
          var long_data = res.data.T1348647853363[index];
          var tmpnewsList = that.data.newsList;
          var tmpArr;
          that.setData({
            newsList: [{
              title: long_data.title,
              digest: long_data.digest,
              imgsrc: long_data.imgsrc,
              source: long_data.source,
              ptime: long_data.ptime
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