// pages/login/login.js
var app  = getApp()
var hasClick = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit: function(param){
    // 登录
    wx.request({
      url: app.globalData.serverIp + "/api/v2/aashop/login",
      data: {
        userName: param.detail.value.userName,
        passWord: param.detail.value.passWord
        },
      method:"POST",
      // header: {'content-type': 'application/json'},
      header: {"Content-Type": "application/x-www-form-urlencoded"},
      success:function(data){
        if (data.data.code == 200){
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
        } else{
          wx.showToast({
            title: data.data.message,
            icon: 'none',
            duration: 1500,
          })
        }      
      },fail: function(){
        wx.showToast({
          title: "登录失败",
          icon: 'none',
          duration: 1500,
        })
      }
    })
  },
 
  findpwd:function(param){
    wx.showToast({
      title: '请联系管理员',
      icon:"none",
      duration: 1500,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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