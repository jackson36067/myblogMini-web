<template>
  <view class="info">
    <image class="avatar gray sk-image" mode="aspectFill"></image>
    <view class="meta">
      <view class="nickname sk-transparent sk-text-0-0000-318 sk-text"
        >Jackson</view
      >
      <view class="extra">
        <text
          class="tips sk-transparent sk-text-17-6471-954 sk-text"
          style="color: #e3b194"
          >积分: 18</text
        >
      </view>
    </view>
    <view class="chevron-right">
      <navigator hover-class="none" open-type="navigate">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
          <text
            class="uni-icons icons--uni-icons uniui-icon-chevron-right icons--uniui-icon-chevron-right iconfont icons--iconfont icon-chevron-right icons--icon-chevron-right sk-pseudo sk-pseudo-circle"
            style="color: #333333; font-size: 16px"
          ></text>
        </view>
      </navigator>
    </view>
  </view>
  <view class="card sk-image">
    <label class="span sk-transparent"
      >已连续签到
      <view class="strong sk-transparent sk-text-32-4561-872 sk-text">1</view>
      天</label
    >
    <button class="button sk-transparent sk-button sk-pseudo sk-pseudo-circle">
      今日已签到
    </button>
  </view>
  <view class="own">
    <view class="own-list">
      <view class="number sk-transparent sk-opacity">1</view>
      <view class="name sk-transparent sk-text-14-2857-961 sk-text">点赞</view>
    </view>
    <view class="own-list">
      <view class="number sk-transparent sk-opacity">1</view>
      <view class="name sk-transparent sk-text-14-2857-351 sk-text">朋友</view>
    </view>
    <view class="own-list">
      <view class="number sk-transparent sk-opacity">2</view>
      <view class="name sk-transparent sk-text-14-2857-431 sk-text">关注</view>
    </view>
    <view class="own-list">
      <view class="number sk-transparent sk-opacity">3</view>
      <view class="name sk-transparent sk-text-14-2857-85 sk-text">粉丝</view>
    </view>
  </view>
  <view
    is="node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup"
    class="r"
  ></view>
  <view class="category">
    <navigator class="category-item" hover-class="none">
      <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
        <text
          class="uni-icons icons--uni-icons uniui-icon-shoucang icons--uniui-icon-shoucang iconfont icons--iconfont icon-shoucang icons--icon-shoucang sk-pseudo sk-pseudo-circle"
          style="color: #f57d1f; font-size: 30px"
        ></text>
      </view>
      <text class="text sk-transparent sk-text-14-2857-598 sk-text"
        >我的收藏</text
      >
    </navigator>
    <navigator class="category-item" hover-class="none">
      <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
        <text
          class="uni-icons icons--uni-icons uniui-icon-aixin icons--uniui-icon-aixin iconfont icons--iconfont icon-aixin icons--icon-aixin sk-pseudo sk-pseudo-circle"
          style="color: #e54d41; font-size: 30px"
        ></text>
      </view>
      <text class="text sk-transparent sk-text-14-2857-929 sk-text"
        >我的点赞</text
      >
    </navigator>
    <navigator class="category-item" hover-class="none">
      <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
        <text
          class="uni-icons icons--uni-icons uniui-icon-r icons--uniui-icon-r iconfont icons--iconfont icon-r icons--icon-r sk-pseudo sk-pseudo-circle"
          style="color: #e2c12f; font-size: 30px"
        ></text>
      </view>
      <text class="text sk-transparent sk-text-14-2857-868 sk-text"
        >我的资源</text
      >
    </navigator>
    <navigator class="category-item" hover-class="none">
      <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
        <text
          class="uni-icons icons--uni-icons uniui-icon-shopping icons--uniui-icon-shopping iconfont icons--iconfont icon-shopping icons--icon-shopping sk-pseudo sk-pseudo-circle"
          style="color: #df7a25; font-size: 30px"
        ></text>
      </view>
      <text class="text sk-transparent sk-text-14-2857-782 sk-text"
        >我的积分</text
      >
    </navigator>
  </view>
  <view class="content">
    <navigator class="list-item" hover-class="none" open-type="navigate">
      <view class="icon-wrapper">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
          <text
            class="uni-icons icons--uni-icons uniui-icon-pinglun1 icons--uniui-icon-pinglun1 iconfont icons--iconfont icon-pinglun1 icons--icon-pinglun1 sk-pseudo sk-pseudo-circle"
            style="color: #9edfb8; font-size: 20px"
          ></text>
        </view>
      </view>
      <view class="title sk-transparent sk-text-14-2857-669 sk-text"
        >评论管理</view
      >
      <view class="arrow-wrapper">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
          <text
            class="uni-icons icons--uni-icons uniui-icon-chevron-right icons--uniui-icon-chevron-right iconfont icons--iconfont icon-chevron-right icons--icon-chevron-right sk-pseudo sk-pseudo-circle"
            style="color: #d8d8d8; font-size: 20px"
          ></text>
        </view>
      </view>
    </navigator>
    <navigator class="list-item" hover-class="none" open-type="navigate">
      <view class="icon-wrapper">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
          <text
            class="uni-icons icons--uni-icons uniui-icon-editor icons--uniui-icon-editor iconfont icons--iconfont icon-editor icons--icon-editor sk-pseudo sk-pseudo-circle"
            style="color: #b6a9e9; font-size: 20px"
          ></text>
        </view>
      </view>
      <view class="title sk-transparent sk-text-14-2857-571 sk-text"
        >新增文章</view
      >
      <view class="arrow-wrapper">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
          <text
            class="uni-icons icons--uni-icons uniui-icon-chevron-right icons--uniui-icon-chevron-right iconfont icons--iconfont icon-chevron-right icons--icon-chevron-right sk-pseudo sk-pseudo-circle"
            style="color: #d8d8d8; font-size: 20px"
          ></text>
        </view>
      </view>
    </navigator>
    <navigator class="list-item" hover-class="none" open-type="navigate">
      <view class="icon-wrapper">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
          <text
            class="uni-icons icons--uni-icons uniui-icon-fenlei icons--uniui-icon-fenlei iconfont icons--iconfont icon-fenlei icons--icon-fenlei sk-pseudo sk-pseudo-circle"
            style="color: #cdbe9b; font-size: 20px"
          ></text>
        </view>
      </view>
      <view class="title sk-transparent sk-text-14-2857-581 sk-text"
        >类别管理</view
      >
      <view class="arrow-wrapper">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
          <text
            class="uni-icons icons--uni-icons uniui-icon-chevron-right icons--uniui-icon-chevron-right iconfont icons--iconfont icon-chevron-right icons--icon-chevron-right sk-pseudo sk-pseudo-circle"
            style="color: #d8d8d8; font-size: 20px"
          ></text>
        </view>
      </view>
    </navigator>
    <navigator class="list-item" hover-class="none" open-type="navigate">
      <view class="icon-wrapper">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
          <text
            class="uni-icons icons--uni-icons uniui-icon-biaoqian icons--uniui-icon-biaoqian iconfont icons--iconfont icon-biaoqian icons--icon-biaoqian sk-pseudo sk-pseudo-circle"
            style="color: #e5a3a3; font-size: 20px"
          ></text>
        </view>
      </view>
      <view class="title sk-transparent sk-text-14-2857-444 sk-text"
        >标签管理</view
      >
      <view class="arrow-wrapper">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
          <text
            class="uni-icons icons--uni-icons uniui-icon-chevron-right icons--uniui-icon-chevron-right iconfont icons--iconfont icon-chevron-right icons--icon-chevron-right sk-pseudo sk-pseudo-circle"
            style="color: #d8d8d8; font-size: 20px"
          ></text>
        </view>
      </view>
    </navigator>
    <navigator class="list-item" hover-class="none" open-type="navigate">
      <view class="icon-wrapper">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
          <text
            class="uni-icons icons--uni-icons uniui-icon-pinglun1 icons--uniui-icon-pinglun1 iconfont icons--iconfont icon-pinglun1 icons--icon-pinglun1 sk-pseudo sk-pseudo-circle"
            style="color: #9edfb8; font-size: 20px"
          ></text>
        </view>
      </view>
      <view class="title sk-transparent sk-text-14-2857-669 sk-text"
        >评论管理</view
      >
      <view class="arrow-wrapper">
        <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
          <text
            class="uni-icons icons--uni-icons uniui-icon-chevron-right icons--uniui-icon-chevron-right iconfont icons--iconfont icon-chevron-right icons--icon-chevron-right sk-pseudo sk-pseudo-circle"
            style="color: #d8d8d8; font-size: 20px"
          ></text>
        </view>
      </view>
    </navigator>
  </view>
</template>
<style>
/*
此文件为开发者工具生成，生成时间: 2024/12/24下午10:01:53

在 D:\uniappProject\MyBlogMini\dist\dev\mp-weixin\pages\mine\mine.wxss 中引入样式
```
@import "./mine.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-text-0-0000-318 {
  background-image: linear-gradient(
    transparent 0%,
    #eeeeee 0%,
    #eeeeee 100%,
    transparent 0%
  ) !important;
  background-size: 100% 29.6512rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-17-6471-954 {
  background-image: linear-gradient(
    transparent 17.6471%,
    #eeeeee 0%,
    #eeeeee 82.3529%,
    transparent 0%
  ) !important;
  background-size: 100% 29.6512rpx;
  position: relative !important;
}
.sk-text-32-4561-872 {
  background-image: linear-gradient(
    transparent 32.4561%,
    #eeeeee 0%,
    #eeeeee 67.5439%,
    transparent 0%
  ) !important;
  background-size: 100% 198.8372rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-961 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-351 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-431 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-85 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-598 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-929 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-868 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-782 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 34.186rpx;
  position: relative !important;
}
.sk-text-14-2857-669 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text-14-2857-571 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text-14-2857-581 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text-14-2857-444 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-button {
  color: #efefef !important;
  background: #efefef !important;
  border: none !important;
  box-shadow: none !important;
}
.sk-image {
  background: #efefef !important;
}
.sk-pseudo::before,
.sk-pseudo::after {
  background: #efefef !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}
.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}
.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}
.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
