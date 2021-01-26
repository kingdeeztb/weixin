Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    newsList: [],
    newsList2: [],
    newsList3: []
  },

  onLoad() {
    // 初始化towerSwiper 传已有的数组名即可
    this.towerSwiper('swiperList');
    //调用接口
    var that = this //不要漏了这句，很重要
    wx.request({
      url: 'https://c.m.163.com/nc/article/headline/T1348647853363/0-140.html', //这里填写你的接口路径
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //  console.log(res.data.T1348647853363[0])
        for (let index = 0; index < 6; index++) {
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
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  detailsHandler(event) {
    var currentId = event.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: '../news_details/news_details?id=' + currentId,
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})