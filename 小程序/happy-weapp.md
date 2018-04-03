# Happy-weapp-cli小程序脚手架

## 一、描述

随着微信的发展，衍生出了小程序这个产品出来，我们开发者，当然要紧追潮流，但是随着开发小程序的时候，会发现只用微信提供的微信开发工具初始的项目，用在实际工程当中，如果项目小的话，还能接受，但是随着业务的发展，组件的增多，没有好的工程化去管理，会产生了一大堆的问题。而市面上衍生出了wepy、mpvue等这一类的框架去搭建小程序。对于此，本人也很有兴趣搭建一个这样的东西出来，所以，从4月开始，我就着手就开发了**happy-weapp-loader** 、 **happy-weapp-template**、**happy-weapp-cli**的一套脚手架出来进行项目上的开发。

## 二、安装

```
npm install -g happy-weapp-cli
```

## 三、使用教程

```
happy-weapp init <项目名>
```

## 四、模板的目录结构

![目录结构](https://github.com/cilla123/FE_Study/blob/master/%E5%B0%8F%E7%A8%8B%E5%BA%8F/assets/happy-weapp-template-%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.png?raw=true)

## 五、组件写法

#### 1.js文件

```js
/**
 * 文本
 * title: 文本内容
 * textAlign: 对齐方式(left, center, right)
 * fontSize: 字体大小(big, middle, small)
 * backgroundColor: 背景颜色
 * fontColor: 字体颜色
 * linkId: 链接Id
 * linkType: 链接类型
 * linkUrl: 链接url
 * alias: 别名
 * phone: 电话
 * turnTopage: 要跳转的页面
 * eventType: 事件类型(tapPhoneCallHandler, customTurnToPage)
 */
Component({
    properties: {
        title: {
            type: String,
            value: ''
        },
        textAlign: {
            type: String,
            value: 'left'
        },
        fontSize:{
            type: String,
            value: 'big'
        },
        backgroundColor: {
            type: String,
            value: '#fff'
        },
        fontColor: {
            type: String,
            value: '#333'
        },
        linkId: {
            type: String,
            value: ''
        },
        linkType: {
            type: String,
            value: ''
        },
        linkTitle: {
            type: String,
            value: ''
        },
        linkUrl: {
            type: String,
            value: ''
        },
        alias: {
            type: String,
            value: ''
        },
        phone: {
            type: String,
            value: ''
        },
        turnTopage: {
            type: String,
            value: ''
        },
        eventType: {
            type: String,
            value: ''
        }
    },
    data: {

    },
    methods: {
        /**
         * 点击事件
         */
        tapHandler() {
            const { eventType, phone, turnTopage } = this.properties
            switch (eventType) {
                case 'tapPhoneCallHandler':
                    this.triggerEvent('tapPhoneCallHandler', { phone })
                    break;
                case 'customTurnToPageHandler':
                    this.triggerEvent('customTurnToPageHandler', { turnTopage })
                    break;
                default:
                    break;
            }
        }
    }
})
```

### 2.json文件

```json
{
    "component": true
}
```

### 3.wxml文件

```wxml
<view class="cap-text" bind:tap="tapHandler" >
    <view class="p10 {{ textAlign }}" style="background-color: {{ backgroundColor }};">
        <text class="{{ fontSize }} {{ big }}" style="color: {{ fontColor }};">{{ title }}</text>
    </view>
</view>
```

### 4.wxss文件

```wxss
.cap-text{
    display: flex;
    word-break: break-all;
}

.p10{
    padding: 20rpx;
    width: 100%;
}

.left{
    text-align: left;
}

.right{
    text-align: right;
}

.center{
    text-align: center;
}

.big{
    font-size: 36rpx;
}

.middle{
    font-size: 28rpx;
}

.small{
    font-size: 24rpx;
}
```

## 六、页面写法

#### 1.页面.happy

```happy
<template>
  <view class="container">
    <view class="userinfo">
      <button wx:if="{{!hasUserInfo && canIUse}}" open-type="getUserInfo" bindgetuserinfo="getUserInfo"> 获取头像昵称 </button>
      <block wx:else>
        <image bindtap="bindViewTap" class="userinfo-avatar" src="{{userInfo.avatarUrl}}" background-size="cover"></image>
        <text class="userinfo-nickname">{{userInfo.nickName}}</text>
      </block>
    </view>
    <view class="usermotto">
      <text class="user-motto">{{motto}}</text>
    </view>
    <capText title="自定义组件"></capText>
  </view>
</template>

<script>
  //获取应用实例
  const app = getApp()

  Page({
    data: {
      motto: 'Hello Happy weapp template',
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    onLoad: function () {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      } else if (this.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    },
    getUserInfo: function(e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  })

</script>

<style lang="sass" scoped>
    // 利用scoped不会影响
      
</style>

```

#### 2.页面.json

```json
{
    "usingComponents": {
      "capText": "/components/capText/capText"
    }
  }
```

## 五、运行结果

![运行结果](https://github.com/cilla123/FE_Study/blob/master/%E5%B0%8F%E7%A8%8B%E5%BA%8F/assets/happy-weapp-template-dist.png?raw=true)


