<template>
  <view class="card-container">
    <!-- 卡片图片 -->
    <image class="card-image" mode="aspectFill"></image>

    <!-- 卡片内容区域 -->
    <view class="card-content">
      <text class="card-title">小程序Canvas</text>
      <text class="card-description">
        小程序 createCanvasContext 开发实例，明信片 DIY 小程序源码分享
      </text>
      <view class="card-footer">
        <text class="date">2022/7/28</text>
        <view class="icons">
          <uni-icons
            class="icon"
            custom-prefix="iconfont"
            type="icon-guankan"
            size="10"
          ></uni-icons>
          <text class="icon-text">20</text>
          <uni-icons
            class="icon"
            custom-prefix="iconfont"
            type="icon-aixin"
            size="10"
          ></uni-icons>
          <text class="icon-text">20</text>
          <uni-icons
            class="icon"
            custom-prefix="iconfont"
            type="icon-pinglun"
            size="10"
          ></uni-icons>
          <text class="icon-text">20</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.card-container {
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 10px;

  /* 左侧图片 */
  .card-image {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }

  /* 右侧内容区域 */
  .card-content {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* 标题样式 */
    .card-title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }

    /* 描述样式 */
    .card-description {
      font-size: 12px;
      color: #666;
      margin-bottom: 10px;
      line-height: 1.4;
    }
    /* 底部信息区域 */
    .card-footer {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #999;
      .icons {
        display: flex;
        margin-right: 4px; // 图标与文本间距
        .icon {
          margin-right: 4px; // 图标与文本间距
        }
        .icon-text {
          font-size: 10px;
          color: #999; // 与原样式保持一致
        }
      }
    }
  }
}
</style>
