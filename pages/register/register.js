Page({

    /**
     * 页面的初始数据
     */
    data: {
        getcodeShow: false,
        setCode: false,
        act: "",
        randCode: "",
        tempCode:"",
        mobile: "",
        subMobile: "",
        pwd1:"",
        pwd2:""
    },
    getCode: function() {
        let mobile = this.data.mobile;
        let reg = /^1[3|5|6|7|8|9]\d{9}$/;
        if (!(reg.test(mobile))) {
            return wx.showToast({
                title: '手机号格式不对',
            })
        }
        let subMobile = mobile.substr(0, 3) + '****' + mobile.substr(8, 4);
        this.getRandNu();
        console.log(subMobile)
        this.setData({
            subMobile: subMobile,
            getcodeShow: !this.data.getcodeShow

        })
    },
    setCode: function() {
        if(this.data.tempCode == this.data.randCode){
            wx.showToast({
                title: '验证码正确',
            })
        }
        this.setData({
            setCode: true,
            getcodeShow: false
        })
    },
    getRandNu() {
        let tempCode = parseInt(Math.random() * 99999);
        this.setData({
            tempCode: tempCode
        });

    },
    inputRandCode(e){
        let val = e.detail.value;
        this.setData({
            randCode: val
        });
    },
    inputing(e) {
        let val = e.detail.value;
        this.setData({
            mobile: val
        });
    },
    inputPwd1(e){
        let val = e.detail.value;
        this.setData({
            pwd1: val
        });
    },
    inputPwd2(e) {
        let val = e.detail.value;
        this.setData({
            pwd2: val
        });
    },
    sub(){
        console.log('sub');
        let reg = /^[A-Za-z0-9]{6,20}$/;
        if(!reg.test(this.data.pwd1)){
            return wx.showModal({
                title: '第一次输入密码格式不正确',
                confirmtext: '确认',
                showCancel: false
            })
        }
        if (!reg.test(this.data.pwd2)) {
            return wx.showToast({
                title: '第二次输入密码格式不正确',
                confirmtext: '确认',
                showCancel: false
            })
        }
        if(this.data.pwd1 !== this.data.pwd2){
            wx.showToast({
                title: '两次密码输入不一样',
                confirmtext: '确认',
                showCancel:false
            })
        }
        return wx.showToast({
            title: '密码设置成功',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(opt) {
        let act = opt.act;
        if (act == 1) {
            this.setData({
                act: act
            })
            wx.setNavigationBarTitle({
                title: "新用户注册"
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

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