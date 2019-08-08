// pages/login/login.js
var app  = getApp()
var hasClick = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },

  formSubmit: function(param){
    // 登录
    wx.request({
      url: app.globalData.serverIp + "/api/v2/aashop/login",
      data: {
        userName: param.detail.value.userName,
        passWord: param.detail.value.passWord
        },
      dataType:"json",
      method:"POST",
      header: {'content-type': 'application/json'},
      success:function(data){
        if(data.code == 200){
          app.globalData.userInfo = data.data
          console.log(app.globalData.userInfo)
          wx.showToast({
            title: "登录成功",
            icon: 'success',
            duration: 20000,
            success: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../teachers/teachers',
                })
              }, 1000)
            }
          })
        }else{
          wx.showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000,
          })
        }      
      }
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