//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    circleList: [],//圆点数组
    awardList: [],//奖品数组
    colorCircleFirst: '#FFDF2F',//圆点颜色1
    colorCircleSecond: '#FE4D32',//圆点颜色2
    colorAwardDefault: '#F5F0FC',//奖品默认颜色
    colorAwardSelect: '#e74c3c',//奖品选中颜色
    indexSelect: 0,//被选中的奖品index
    isRunning: false,//是否正在抽奖
    isAdd: true, //是否上分
    currentPoints: 0,//当前分
    totalPoints:1000,//总分
    currentMagnification: 1,//当前倍率
    totalSelect:0, //总选择数
    isTodayFinish: false, //今天的积分是否已用完
    selectPoints: 5, //每押注一次需要的积分
    imageAward: [
      '../../images/1.jpg',
      '../../images/3.jpg',
      '../../images/9.jpg',
      '../../images/2.jpg',
      '../../images/1.jpg',
      '../../images/4.jpg',
      '../../images/7.jpg',
      '../../images/3.jpg',
      '../../images/5.jpg',
      '../../images/2.jpg',
      '../../images/1.jpg',
      '../../images/4.jpg',
      '../../images/6.jpg',
      '../../images/5.jpg',
      '../../images/1.jpg',
      '../../images/3.jpg',
      '../../images/2.jpg',
      '../../images/4.jpg',
      '../../images/7.jpg',
      '../../images/8.jpg',
    ],//奖品图片数组
  },

  onLoad: function () {
    var _this = this;
    //圆点设置
    var leftCircle = 7.5;
    var topCircle = 7.5;
    var circleList = [];
    for (var i = 0; i < 24; i++) {
      if (i == 0) {
        topCircle = 15;
        leftCircle = 15;
      } else if (i < 6) {
        topCircle = 7.5;
        leftCircle = leftCircle + 102.5;
      } else if (i == 6) {
        topCircle = 15
        leftCircle = 620;
      } else if (i < 12) {
        topCircle = topCircle + 94;
        leftCircle = 620;
      } else if (i == 12) {
        topCircle = 565;
        leftCircle = 620;
      } else if (i < 18) {
        topCircle = 570;
        leftCircle = leftCircle - 102.5;
      } else if (i == 18) {
        topCircle = 565;
        leftCircle = 15;
      } else if (i < 24) {
        topCircle = topCircle - 94;
        leftCircle = 7.5;
      } else {
        return
      }
      circleList.push({ topCircle: topCircle, leftCircle: leftCircle });
    }
    this.setData({
      circleList: circleList
    })
    //圆点闪烁
    setInterval(function () {
      if (_this.data.colorCircleFirst == '#FFDF2F') {
        _this.setData({
          colorCircleFirst: '#FE4D32',
          colorCircleSecond: '#FFDF2F',
        })
      } else {
        _this.setData({
          colorCircleFirst: '#FFDF2F',
          colorCircleSecond: '#FE4D32',
        })
      }
    }, 500)
    //奖品item设置
    var awardList = [];
    //间距,怎么顺眼怎么设置吧.
    var topAward = 25;
    var leftAward = 25;
    var unitNumber = 0;  //押注个数
    var unitIntegral = 0; //单个分数
    for (var j = 0; j < 20; j++) {
      unitIntegral = (j+1)*(_this.data.currentMagnification)*10;
      if (j==0 || j==4 || j==10 || j==14){
        unitIntegral = 10;
      }else if(j==1 || j==7 || j==15){
        unitIntegral = 15;
      }else if(j==2){
        unitIntegral = 45;
      }else if(j==3 || j==9 || j==16){
        unitIntegral = 20;
      }else if(j==5 || j==11 || j==17){
        unitIntegral = 25;
      }else if(j==6 || j==18){
        unitIntegral = 30;
      }else if(j==8 || j==13){
        unitIntegral = 35;
      }else if(j==12){
        unitIntegral = 0;
      }else{
        unitIntegral = 40
      }
      if (j == 0) {
        topAward = 25;
        leftAward = 25;
      } else if (j < 5) {
        topAward = topAward;
        //166.6666是宽.15是间距.下同
        leftAward = leftAward + 120 + 15;
      } else if (j < 11) {
        leftAward = leftAward;
        //150是高,15是间距,下同
        topAward = topAward + 120 + 15;
      } else if (j < 15) {
        leftAward = leftAward - 120 - 15;
        topAward = topAward;
      } else if (j < 20) {
        leftAward = leftAward;
        topAward = topAward - 120 - 15;
      }
      var imageAward = this.data.imageAward[j];
      awardList.push({ topAward: topAward, leftAward: leftAward, imageAward: imageAward , unitNumber: unitNumber, unitIntegral: unitIntegral});
    }
    this.setData({
      awardList: awardList
    })
  },
  //开始游戏
  startGame: function () {
    if (this.data.isRunning || this.data.totalSelect == 0) return
    this.setData({
      isRunning: true
    })
    var _this = this;
    var indexSelect = 0
    var i = 0;
    var timer = setInterval(function () {
      indexSelect++;
      if(indexSelect >= 20){
        indexSelect = 0
      }
      //转盘速度
      
      var random = Math.floor(Math.random() * 20);
      i += random;
      if (i > 500) {
        //去除循环
        clearInterval(timer)
        //获奖提示
        indexSelect = _this.data.indexSelect;
        var awardListCopy = _this.data.awardList;
        var getPoints = awardListCopy[indexSelect].unitIntegral*awardListCopy[indexSelect].unitNumber;
        var _totalPoints = _this.data.totalPoints;
        _totalPoints += getPoints;
        for(var m=0;m<20;m++){
          awardListCopy[m].unitNumber = 0;
        }
        _this.setData({
          isRunning: false,
          totalPoints: _totalPoints,
          awardList: awardListCopy,
          totalSelect: 0
        })

        if (_this.data.totalPoints == 0){
          wx.showModal({
            title: '别灰心',
            content: '您今天的积分已用完，请明天再来挑战吧!',
            showCancel: false,//去掉取消按钮
            success: function (res) {
              if (res.confirm) {
                _this.setData({
                  isTodayFinish: true
                })
              }
            }
          })
        }
      }
      _this.setData({
        indexSelect: indexSelect,
      })
    }, (100 + i))
  },
  unitOperation: function(event){
    var index = event.target.id;
    var _this = this;
    var awardListCopy = _this.data.awardList;
    var _totalPoints = _this.data.totalPoints;
    var unitNumber = _this.data.awardList[index].unitNumber;
    var selectPoints = _this.data.selectPoints
    var _totalSelect = _this.data.totalSelect;
    var addNumberArray = [];
    
    if (index==0 || index==4 || index==10 || index==14){
      addNumberArray.push(0, 4, 10, 14);
    }else if(index==1 || index==7 || index==15){
      addNumberArray.push(1, 7, 15);
    }else if(index==2){
      addNumberArray.push(2);
    }else if(index==3 || index==9 || index==16){
      addNumberArray.push(3, 9, 16);
    }else if(index==5 || index==11 || index==17){
      addNumberArray.push(5, 11, 17);
    }else if(index==6 || index==18){
      addNumberArray.push(6, 18);
    }else if(index==8 || index==13){
      addNumberArray.push(8, 13);
    }else if(index==12){
      addNumberArray.push(12);
    }else{
      addNumberArray.push(19);
    }
    if (_this.data.isAdd && _totalPoints >= selectPoints){
        for (var n=0;n<addNumberArray.length;n++){
          var aIndex = addNumberArray[n]
          if (aIndex == 12){
            return
          }
          awardListCopy[aIndex].unitNumber += 1;
        }
        _totalSelect += 1;
        _totalPoints -= selectPoints;
    }else if(!_this.data.isAdd && unitNumber > 0){
        for (var n=0;n<addNumberArray.length;n++){
          var aIndex = addNumberArray[n]
          if (aIndex == 12){
            return
          }
          awardListCopy[aIndex].unitNumber -= 1;
        }
        _totalSelect -= 1
        _totalPoints += selectPoints;
    }else{
        return
    }
    _this.setData({
        awardList: awardListCopy,
        totalPoints: _totalPoints,
        totalSelect: _totalSelect
    })
    },
    addNumber: function(){
      this.setData({
        isAdd: true
      })
    },
    minusNumber: function(){
      this.setData({
        isAdd: false
      })
    },
})