<template>
  <view class="carousel">
    <swiper :autoplay="false" :circular="true" :interval="3000" :current="0">
      <swiper-item
        style="
          position: absolute;
          width: 100%;
          height: 100%;
          transform: translate(0%, 0px) translateZ(0px);
        "
      >
        <navigator class="navigator" hover-class="none">
          <image class="image sk-image" mode="aspectFill"></image>
        </navigator>
      </swiper-item>
      <swiper-item
        style="
          position: absolute;
          width: 100%;
          height: 100%;
          transform: translate(100%, 0px) translateZ(0px);
        "
      >
        <navigator class="navigator" hover-class="none">
          <image class="image sk-image" mode="aspectFill"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="indicator">
      <text class="dot active"></text>
      <text class="dot"></text>
    </view>
  </view>
  <view class="category">
    <navigator class="category-item" hover-class="none">
      <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
        <text
          class="uni-icons icons--uni-icons uniui-icon-github icons--uniui-icon-github iconfont icons--iconfont icon-github icons--icon-github sk-pseudo sk-pseudo-circle"
          style="color: #b945cc; font-size: 30px"
        ></text>
      </view>
      <text class="text sk-transparent sk-text-14-2857-964 sk-text"
        >开源项目</text
      >
    </navigator>
    <navigator class="category-item" hover-class="none">
      <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
        <text
          class="uni-icons icons--uni-icons uniui-icon-file icons--uniui-icon-file iconfont icons--iconfont icon-file icons--icon-file sk-pseudo sk-pseudo-circle"
          style="color: #de5e59; font-size: 30px"
        ></text>
      </view>
      <text class="text sk-transparent sk-text-14-2857-445 sk-text"
        >面试刷题</text
      >
    </navigator>
    <navigator class="category-item" hover-class="none">
      <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
        <text
          class="uni-icons icons--uni-icons uniui-icon-r icons--uniui-icon-r iconfont icons--iconfont icon-r icons--icon-r sk-pseudo sk-pseudo-circle"
          style="color: #edc505; font-size: 30px"
        ></text>
      </view>
      <text class="text sk-transparent sk-text-14-2857-618 sk-text"
        >小程序</text
      >
    </navigator>
    <navigator class="category-item" hover-class="none">
      <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons">
        <text
          class="uni-icons icons--uni-icons uniui-icon-shopping icons--uniui-icon-shopping iconfont icons--iconfont icon-shopping icons--icon-shopping sk-pseudo sk-pseudo-circle"
          style="color: #df7a25; font-size: 30px"
        ></text>
      </view>
      <text class="text sk-transparent sk-text-14-2857-22 sk-text"
        >开源资源</text
      >
    </navigator>
  </view>
  <view class="query">
    <view class="uni-easyinput easyinput--uni-easyinput" style="color: ">
      <view
        class="uni-easyinput__content easyinput--uni-easyinput__content"
        style="border-color: #e5e5e5; background-color: "
      >
        <view
          is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
          class="content-clear-icon easyinput--content-clear-icon"
        >
          <text
            class="uni-icons icons--uni-icons uniui-search icons--uniui-search sk-pseudo sk-pseudo-circle"
            style="color: #c0c4cc; font-size: 22px"
          ></text>
        </view>
        <view
          class="uni-easyinput__content-input easyinput--uni-easyinput__content-input sk-image"
          maxlength="140"
          name="true"
          placeholder="搜索感兴趣的文章"
          placeholder-class="uni-easyinput__placeholder-class"
          placeholder-style="true"
          type="text"
          value="true"
        ></view>
      </view>
    </view>
  </view>
  <view class="uni-padding-wrap uni-common-mt">
    <view
      is="node-modules/@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control"
      class="seg"
    >
      <view
        class="segmented-control--text control--segmented-control--text segmented-control control--segmented-control data-v-52668560 control--data-v-52668560"
        style="border-color: "
      >
        <view
          class="segmented-control__item control--segmented-control__item data-v-52668560 control--data-v-52668560"
          style="background-color: transparent; border-color: #dd524d"
        >
          <view class="data-v-52668560 control--data-v-52668560">
            <text
              class="segmented-control__text control--segmented-control__text data-v-52668560 control--data-v-52668560 segmented-control__item--text control--segmented-control__item--text sk-transparent sk-text-15-0000-97 sk-text"
              style="color: rgb(221, 82, 77); background-position-x: 50%"
              >最新</text
            >
          </view>
        </view>
        <view
          class="segmented-control__item control--segmented-control__item data-v-52668560 control--data-v-52668560"
          style="background-color: transparent; border-color: transparent"
        >
          <view class="data-v-52668560 control--data-v-52668560">
            <text
              class="segmented-control__text control--segmented-control__text data-v-52668560 control--data-v-52668560 sk-transparent sk-text-15-0000-572 sk-text"
              style="color: rgb(0, 0, 0); background-position-x: 50%"
              >热门</text
            >
          </view>
        </view>
        <view
          class="segmented-control__item control--segmented-control__item data-v-52668560 control--data-v-52668560"
          style="background-color: transparent; border-color: transparent"
        >
          <view class="data-v-52668560 control--data-v-52668560">
            <text
              class="segmented-control__text control--segmented-control__text data-v-52668560 control--data-v-52668560 sk-transparent sk-text-15-0000-836 sk-text"
              style="color: rgb(0, 0, 0); background-position-x: 50%"
              >标签</text
            >
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="content">
    <view is="components/article">
      <navigator
        class="card-container article--card-container"
        hover-class="none"
      >
        <image
          class="card-image article--card-image sk-image"
          mode="aspectFill"
        ></image>
        <view class="card-content article--card-content">
          <text
            class="card-title article--card-title sk-transparent sk-text-14-2857-217 sk-text"
            >jack</text
          >
          <text
            class="card-description article--card-description sk-transparent sk-text-14-2857-382 sk-text"
            >二维数组中的查找</text
          >
          <view class="card-footer article--card-footer">
            <text
              class="date article--date sk-transparent sk-text-14-2857-578 sk-text"
              >2024/12/18</text
            >
            <view class="icons article--icons">
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                class="icon article--icon"
              >
                <text
                  class="uni-icons icons--uni-icons uniui-icon-guankan icons--uniui-icon-guankan iconfont icons--iconfont icon-guankan icons--icon-guankan sk-pseudo sk-pseudo-circle"
                  style="color: #999; font-size: 20px"
                ></text>
              </view>
              <text
                class="icon-text article--icon-text sk-transparent sk-text-14-2857-84 sk-text"
                >728</text
              >
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                class="icon article--icon"
              >
                <text
                  class="uni-icons icons--uni-icons uniui-icon-aixin1 icons--uniui-icon-aixin1 iconfont icons--iconfont icon-aixin1 icons--icon-aixin1 sk-pseudo sk-pseudo-circle"
                  style="color: red; font-size: 20px"
                ></text>
              </view>
              <text
                class="icon-text article--icon-text sk-transparent sk-opacity"
                style="margin-left: 2px"
                >1</text
              >
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                class="icon article--icon"
              >
                <text
                  class="uni-icons icons--uni-icons uniui-icon-pinglun icons--uniui-icon-pinglun iconfont icons--iconfont icon-pinglun icons--icon-pinglun sk-pseudo sk-pseudo-circle"
                  style="color: #999; font-size: 20px"
                ></text>
              </view>
              <text
                class="icon-text article--icon-text sk-transparent sk-opacity"
                >8</text
              >
            </view>
          </view>
        </view>
      </navigator>
      <navigator
        class="card-container article--card-container"
        hover-class="none"
      >
        <image
          class="card-image article--card-image sk-image"
          mode="aspectFill"
        ></image>
        <view class="card-content article--card-content">
          <text
            class="card-title article--card-title sk-transparent sk-text-14-2857-465 sk-text"
            >Jackson</text
          >
          <text
            class="card-description article--card-description sk-transparent sk-text-14-2857-553 sk-text"
            >数组中重复的数字</text
          >
          <view class="card-footer article--card-footer">
            <text
              class="date article--date sk-transparent sk-text-14-2857-881 sk-text"
              >2024/12/16</text
            >
            <view class="icons article--icons">
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                class="icon article--icon"
              >
                <text
                  class="uni-icons icons--uni-icons uniui-icon-guankan icons--uniui-icon-guankan iconfont icons--iconfont icon-guankan icons--icon-guankan sk-pseudo sk-pseudo-circle"
                  style="color: #999; font-size: 20px"
                ></text>
              </view>
              <text
                class="icon-text article--icon-text sk-transparent sk-text-14-2857-986 sk-text"
                >141</text
              >
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                class="icon article--icon"
              >
                <text
                  class="uni-icons icons--uni-icons uniui-icon-aixin1 icons--uniui-icon-aixin1 iconfont icons--iconfont icon-aixin1 icons--icon-aixin1 sk-pseudo sk-pseudo-circle"
                  style="color: red; font-size: 20px"
                ></text>
              </view>
              <text
                class="icon-text article--icon-text sk-transparent sk-opacity"
                style="margin-left: 2px"
                >1</text
              >
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                class="icon article--icon"
              >
                <text
                  class="uni-icons icons--uni-icons uniui-icon-pinglun icons--uniui-icon-pinglun iconfont icons--iconfont icon-pinglun icons--icon-pinglun sk-pseudo sk-pseudo-circle"
                  style="color: #999; font-size: 20px"
                ></text>
              </view>
              <text
                class="icon-text article--icon-text sk-transparent sk-opacity"
                >2</text
              >
            </view>
          </view>
        </view>
      </navigator>
      <navigator
        class="card-container article--card-container"
        hover-class="none"
      >
        <image
          class="card-image article--card-image sk-image"
          mode="aspectFill"
        ></image>
        <view class="card-content article--card-content">
          <text
            class="card-title article--card-title sk-transparent sk-text-14-2857-465 sk-text"
            >Jackson</text
          >
          <text
            class="card-description article--card-description sk-transparent sk-text-14-2857-553 sk-text"
            >数组中重复的数字</text
          >
          <view class="card-footer article--card-footer">
            <text
              class="date article--date sk-transparent sk-text-14-2857-881 sk-text"
              >2024/12/16</text
            >
            <view class="icons article--icons">
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                class="icon article--icon"
              >
                <text
                  class="uni-icons icons--uni-icons uniui-icon-guankan icons--uniui-icon-guankan iconfont icons--iconfont icon-guankan icons--icon-guankan sk-pseudo sk-pseudo-circle"
                  style="color: #999; font-size: 20px"
                ></text>
              </view>
              <text
                class="icon-text article--icon-text sk-transparent sk-text-14-2857-986 sk-text"
                >141</text
              >
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                class="icon article--icon"
              >
                <text
                  class="uni-icons icons--uni-icons uniui-icon-aixin1 icons--uniui-icon-aixin1 iconfont icons--iconfont icon-aixin1 icons--icon-aixin1 sk-pseudo sk-pseudo-circle"
                  style="color: red; font-size: 20px"
                ></text>
              </view>
              <text
                class="icon-text article--icon-text sk-transparent sk-opacity"
                style="margin-left: 2px"
                >1</text
              >
              <view
                is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons"
                class="icon article--icon"
              >
                <text
                  class="uni-icons icons--uni-icons uniui-icon-pinglun icons--uniui-icon-pinglun iconfont icons--iconfont icon-pinglun icons--icon-pinglun sk-pseudo sk-pseudo-circle"
                  style="color: #999; font-size: 20px"
                ></text>
              </view>
              <text
                class="icon-text article--icon-text sk-transparent sk-opacity"
                >2</text
              >
            </view>
          </view>
        </view>
      </navigator>
    </view>
  </view>
</template>
<style>
/*
此文件为开发者工具生成，生成时间: 2024/12/24下午9:24:10

在 D:\uniappProject\MyBlogMini\dist\dev\mp-weixin\pages\index\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
.sk-transparent {
  color: transparent !important;
}
.sk-text-14-2857-964 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}
.sk-text-14-2857-445 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text-14-2857-618 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text-14-2857-22 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 39.0698rpx;
  position: relative !important;
}
.sk-text-15-0000-97 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 34.8837rpx;
  position: relative !important;
}
.sk-text-15-0000-572 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 34.8837rpx;
  position: relative !important;
}
.sk-text-15-0000-836 {
  background-image: linear-gradient(
    transparent 15%,
    #eeeeee 0%,
    #eeeeee 85%,
    transparent 0%
  ) !important;
  background-size: 100% 34.8837rpx;
  position: relative !important;
}
.sk-text-14-2857-217 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-382 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-578 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 26.8605rpx;
  position: relative !important;
}
.sk-text-14-2857-84 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 41.5116rpx;
  position: relative !important;
}
.sk-opacity {
  opacity: 0 !important;
}
.sk-text-14-2857-465 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 43.9535rpx;
  position: relative !important;
}
.sk-text-14-2857-553 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 31.7442rpx;
  position: relative !important;
}
.sk-text-14-2857-881 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 26.8605rpx;
  position: relative !important;
}
.sk-text-14-2857-986 {
  background-image: linear-gradient(
    transparent 14.2857%,
    #eeeeee 0%,
    #eeeeee 85.7143%,
    transparent 0%
  ) !important;
  background-size: 100% 41.5116rpx;
  position: relative !important;
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
