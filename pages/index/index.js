// pages/index/index.js
import {
  base_url,
  host_url
} from "../../utils/config.js";
import {
  HTTP
} from "../../utils/http-promise.js";
let http = new HTTP();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: [{
      src: '/images/banner-2.jpg',
        link: "/"
      },
      {
        src: '/images/banner-2.jpg',
        link: ""
      }
    ],
    lesson: []
  },
  onMyEvent(e) {
    console.log(e)
    let detail = e.detail;
    // wx.navigateTo({
    //   url: `/pages/detail/detail?id=${detail.id}&title=${detail.title}`
    // })
    wx.navigateTo({
      url: `/pages/course/course?id=${detail.id}`
    })
  },
    toRegister(){
        wx.navigateTo({
            url: '/pages/register/register?act=1',
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSwiper();
    this.getLesson();
  },
  getSwiper() {
    http.request({
      url:'/index.php/api/banner/getbanner'
      }).then(data=>{
        // console.log(data);
        data = data.map((v,i)=>{
          v.src = host_url+v.ad_code
          v.link = v.ad_link
          return v;
        });
        console.log(data)
        this.setData({
          swiper: data
        });
      });
  },
  getLesson() {
    http.request({
      url: '/index.php/api/lesson/getLessons?is_new=1'
    }).then(data => {
      data = data.map((v, i) => {
        v.poster = host_url + v.poster
        v.list_img = host_url + v.list_img
        return v;
      });
      this.setData({
        lesson: data
      })
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})