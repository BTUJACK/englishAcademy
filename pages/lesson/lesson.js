import {
    base_url,
    host_url
} from "../../utils/config.js";
import {
    HTTP
} from "../../utils/http-promise.js";
import {
    cnsub
} from '../../utils/tools.js'
let http = new HTTP();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lessCats: [],
        scrollIndex: "0",
        lesson: [],
        noMore: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getLessCats();
    },
    changeCat(e) {
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        // console.log('change', e,index);
        this.setData({
            scrollIndex: index
        });
        this.getLessons(id);
    },
    getLessons(cid) {
        http.request({
            url: "/index.php/api/lesson/getLessons?cat_id=" + cid
        }).then(data => {
            console.log(data)
            data.forEach((item) => {
                item.title = cnsub(item.title, 30);
                item.remark = cnsub(item.lesson_remark,66)
                item.list_img = host_url + item.list_img;
            });
            this.setData({
                lesson: data
            })
        })
    },
    getLessCats() {
        http.request({
            url: "/index.php/api/lesson/getLessonCats"
        }).then(data => {
            console.log(data)
            // data.forEach((item)=>{
            //     item.title = cnsub(item.title,36);
            // });
            if (data.length > 0) {
                var cid = data[0].id
                this.getLessons(cid);
            }
            this.setData({
                lessCats: data
            })
        })
    },
    onMyEvent(e) {
        console.log(e)
        let detail = e.detail;
        // wx.navigateTo({
        //   url: `/pages/detail/detail?id=${detail.id}&title=${detail.title}`
        // })
        wx.navigateTo({
            url: `/pages/course/course`
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
        this.setData({
            noMore: true
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})