const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 10,
    subtitle: '请在此输入搜索内容',
    movies: [],
    search: '',
    loading: false,
    hasMore: false
  },
  loadMore() {
    if (!this.data.hasMore) return

    this.setData({ subtitle: '加载中...', loading: true })

    return app.douban.find('search', this.data.page++, this.data.size, this.data.search)
      .then(d => {
        if (d.subjects.length) {
          this.setData({ subtitle: '搜索 \"' + this.data.search +'\" 的结果"', movies: this.data.movies.concat(d.subjects), loading: false })
        } else {
          this.setData({ hasMore: false, loading: false })
        }
        
      })
      .catch(e => {
        this.setData({ subtitle: '获取数据异常', loading: false })
        console.error(e)
      })
  },
  
  // handleSearch(e) {
  //   const that = this;
  //   if (!e.detail.value) return
  //   wx.request({
  //     url: 'http://t.yushu.im/v2/movie/search?q=' + e.detail.value,
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success(res) {
  //       that.setData({
  //         movies: res.data.subjects
  //       })
  //     }
  //   })
  // },
  handleSearch(e) {
    if (!e.detail.value) return
    this.setData({ movies: [], page: 1 })
    this.setData({ subtitle: '加载中...', hasMore: true, loading: true, search: e.detail.value })

    this.loadMore()
  },

  onReachBottom() {
    this.loadMore()
  },
  
})