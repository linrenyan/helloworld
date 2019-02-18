// 获取全局应用程序实例对象
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    const that = this;
    this.data.id = params.id
    wx.showLoading({ title: '拼命加载中...' })
    // wx.request({
    //   url: 'http://t.yushu.im/v2/movie/subject/' + params.id,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     that.setData({
    //       movie: res.data,
    //       title: res.data.title
    //     }),
    //     wx.setNavigationBarTitle({ title: res.data.title })
    //   }
    // })
    // wx.hideLoading()
    app.douban.findOne(params.id)
      .then(d => {
        this.setData({ title: d.title, movie: d })
        
        wx.setNavigationBarTitle({ title: d.title  })
        wx.hideLoading()
        
      })
      .catch(e => {
        this.setData({ title: '获取数据异常', movie: {} })
        console.error(e)
        wx.hideLoading()
      });
    
  },
  /**
   * 将字符串中的html代码转换为html标签
   */
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({ title: this.data.title + ' « 电影 « 豆瓣' })
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