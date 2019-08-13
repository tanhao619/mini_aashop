// pages/list/list.js
var app = getApp();
Page({
  /**
    * 页面的初始数据
    */
  data: {
    title: '加载中...', // 状态
    list: [], // 数据列表
    loading: true, // 显示等待框
    pagenum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // options 为 board页传来的参数
    const that = this;
    //从本地缓存拿userToken
    var userToken = wx.getStorageSync("userToken")
    // 请求数据
    wx.request({
      url: app.globalData.serverIp + "/api/v2/aashop/mylist",
      data: {
        userToken: userToken,
        pagesize: 10,
        pagenum:that.data.pagenum,
      },
      method: "GET",
      // header: {'content-type': 'application/json'},
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (data) {
        if (data.data.code == 200){
          that.setData({
            list: data.data.result.data.myList
          })
        } else {
          wx.showToast({
            title: data.data.message,
            icon: 'none',
            duration: 1500,
          })
        }
      }, fail: function () {
        wx.showToast({
          title: "请求数据失败",
          icon: 'none',
          duration: 1500,
        })
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
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    that.setData({
      pagenum: 1
    })
    //从本地缓存拿userToken
    var userToken = wx.getStorageSync("userToken")
    // 请求数据
    wx.request({
      url: app.globalData.serverIp + "/api/v2/aashop/mylist",
      data: {
        userToken: userToken,
        pagesize: 10,
        pagenum: that.data.pagenum,
      },
      method: "GET",
      // header: {'content-type': 'application/json'},
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (data) {
        if (data.data.code == 200) {
          that.setData({
            list: data.data.result.data.myList
          })
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        } else {
          wx.showToast({
            title: data.data.message,
            icon: 'none',
            duration: 1500,
          })
        }
      }, fail: function () {
        wx.showToast({
          title: "请求数据失败",
          icon: 'none',
          duration: 1500,
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.setData({
      pagenum: that.data.pagenum + 1
    })
    //从本地缓存拿userToken
    var userToken = wx.getStorageSync("userToken")
    // 请求数据
    wx.request({
      url: app.globalData.serverIp + "/api/v2/aashop/mylist",
      data: {
        userToken: userToken,
        pagesize: 10,
        pagenum: that.data.pagenum,
      },
      method: "GET",
      // header: {'content-type': 'application/json'},
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (data) {
        if (data.data.code == 200) {
          that.setData({
            list: data.data.result.data.myList
          })
        } else {
          wx.showToast({
            title: data.data.message,
            icon: 'none',
            duration: 1500,
          })
        }
      }, fail: function () {
        wx.showToast({
          title: "请求数据失败",
          icon: 'none',
          duration: 1500,
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})