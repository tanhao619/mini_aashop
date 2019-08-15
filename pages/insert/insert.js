// pages/insert/insert.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      userToken:"",
      info:[]
  },

  insertSubmit: function (param) {
    var that = this;
    var checkbox = param.detail.value.checkbox;
    var containPeople = checkbox.join(",");
    wx.request({
      url: app.globalData.serverIp + "/api/v2/aashop/insert",
      data: {
        name: param.detail.value.title,
        price: param.detail.value.price,
        remark: param.detail.value.remark,
        userToken: that.data.userToken,
        containPeople: containPeople
      },
      method: "POST",
      header: {'content-type': 'application/json'},
      success: function (data) {
        if (data.data.code == 200) {
          wx.showToast({
            title: "新增成功",
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../aboutme/aboutme?',
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
          title: "新增失败",
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
    var that = this;
    var userToken = that.data.userToken;
    if (userToken.length < 1){
      that.setData({
        userToken: wx.getStorageSync("userToken")
      })
    }
      wx.request({
        url: app.globalData.serverIp + "/api/v2/aashop/peopleDetail",
        method: "GET",
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        success: function (data) {
          if (data.data.code == 200) {
            that.setData({
              info:data.data.result.datas
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