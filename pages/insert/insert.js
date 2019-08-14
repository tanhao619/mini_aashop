// pages/insert/insert.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userToken:"",
      info:[]
  },

  formSubmit: function (param) {
    wx.request({
      url: app.globalData.serverIp + "/api/v2/aashop/login",
      data: {
        userName: param.detail.value.userName,
        passWord: param.detail.value.passWord
      },
      method: "POST",
      // header: {'content-type': 'application/json'},
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (data) {
        if (data.data.code == 200) {
          app.globalData.userToken = data.data.result.data
          wx.setStorage({
            key: 'userToken',
            data: data.data.result.data,
          })
          wx.showToast({
            title: "登录成功",
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../aboutme/aboutme',
                })
              }, 1000)
            }
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
          title: "登录失败",
          icon: 'none',
          duration: 1500,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.request({
        url: app.globalData.serverIp + "/api/v2/aashop/peopleDetail",
        method: "GET",
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (data) {
          if (data.data.code == 200) {
            this.setData({
              userToken: wx.getStorageSync("userToken"),
              info:data.data.result.data
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