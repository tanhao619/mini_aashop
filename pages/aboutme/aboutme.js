// pages/aboutme/aboutme.js
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: true, // 显示等待框
    info:[],
    page: 1,
    userToken:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从本地缓存拿userToken
    var userToken = wx.getStorageSync("userToken")
    //userToken为空时返回登录界面
    if(this.userToken == ""){
      wx.showToast({
        title: '登录状态失效，请重新登录',
        icon: "none",
        duration: 1500
      })
      wx.navigateTo({
        url: '../login/login',
      })
    }else{
      var that = this
      wx.request({//获取我的列表
        url: app.globalData.serverIp + "/api/v2/aashop/everyonePay",
        data:{page:that.data.page,
              userToken: userToken},
        success: function (data) {
          if (data.data.code == 200) {
            that.setData({
              info: data.data.result.datas || [],
              userToken: userToken
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
            title: "获取数据失败",
            icon: 'none',
            duration: 1500,
          })
        }
      })
    }
  },

//查看付款详情
  detailList:function(param){
    wx.navigateTo({
      url: '../list/list?' + param.currentTarget.id,
    })
  },

  insert: function (param) {
    wx.navigateTo({
      url: '../list/list?' + param.currentTarget.id,
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
    this.setData({
      page: this.data.page + 1
    })
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