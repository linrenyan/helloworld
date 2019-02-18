// 获取全局应用程序实例对象
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    board:[
      {title: '正在热映', key: 'in_theaters'},
      {title: '即将上映', key: 'coming_soon' },
      {title: 'TOP250', key: 'top250' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    // wx.request({
    //   url: 'http://t.yushu.im/v2/movie/in_theaters?count=5',
    //   header:{
    //     'content-type':'application/json'
    //   },
    //   success (res){
    //     that.setData({
    //       list: res.data.subjects
    //     })
    //   }
    // })
    app.douban.find("in_theaters", 1, 5)
      .then(d => {
        this.setData({ list: d.subjects })
      })
    
  },
  // 轮播图的点击事件
  onItemClick: function (event) {
    const postId = event.target.dataset.postid;
    wx.navigateTo({
      url: '../item/item?id=' + postId,
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