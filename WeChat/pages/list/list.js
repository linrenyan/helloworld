// pages/list/list.js
// 获取全局应用程序实例对象
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title : '',
    subtitle:"",
    type:'in_theaters',
    hasMore : true,
    page : 1,
    size : 20,
    movies: []
  },
  loadMore() {
    if (!this.data.hasMore) return

    wx.showLoading({ title: '拼命加载中...' })
    this.setData({ subtitle: '加载中...' })

    return app.douban.find(this.data.type, this.data.page++, this.data.size)
      .then(d => {
        if (d.subjects.length) {
          this.setData({ subtitle: this.data.title, movies: this.data.movies.concat(d.subjects) })
        } else {
          this.setData({ subtitle: this.data.title, hasMore: false })
        }
        wx.hideLoading()
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常' })
        console.error(e)
        wx.hideLoading()
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    // const that = this;
    // this.data.title = params.title || this.data.title
    // this.data.type = params.type || this.data.type
    // wx.showLoading()
    // wx.request({
    //   url: 'http://t.yushu.im/v2/movie/' + params.type,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     that.setData({
    //       movies: res.data.subjects
    //     })
    //   }
    // })
    // wx.hideLoading()
    this.data.title = params.title || this.data.title

    // 类型： in_theaters  coming_soon  us_box
    this.data.type = params.type || this.data.type
    
    this.loadMore()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
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
    this.setData({ movies: [], page: 1, hasMore: true })
    this.loadMore()
      .then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})