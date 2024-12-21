<script setup lang="ts">
import type { articleInfo } from "@/types/article";

// 接收父组件传递的数据
defineProps<{
  list: articleInfo[];
  // getArticleList: Function;
}>();

const emit = defineEmits(); // 定义事件
// 点击点赞时执行父组件传递的函数
const doLike = (id: number) => {
  // 接收父组件传递的函数
  emit("clicked", id);
};
</script>
<template>
  <navigator
    class="card-container"
    hover-class="none"
    v-for="item in list"
    :key="item.id"
    :url="`/pages/detail/detail?id=${item.id}`"
  >
    <!-- 卡片图片 -->
    <image class="card-image" mode="aspectFill" :src="item.coverImage"></image>
    <!-- 卡片内容区域 -->
    <view class="card-content">
      <text class="card-title">{{ item.author }}</text>
      <text class="card-description">
        {{ item.title }}
      </text>
      <view class="card-footer">
        <text class="date">{{ item.createTime }}</text>
        <view class="icons">
          <uni-icons
            class="icon"
            custom-prefix="iconfont"
            type="icon-guankan"
            size="20"
            color="#999"
          ></uni-icons>
          <text class="icon-text">{{ item.totalVisit }}</text>
          <uni-icons
            class="icon"
            custom-prefix="iconfont"
            :type="!item.isLike ? 'icon-aixin' : 'icon-aixin1'"
            size="20"
            :color="!item.isLike ? '#999' : 'red'"
            @tap="doLike(item.id)"
          ></uni-icons>
          <text class="icon-text" style="margin-left: 5rpx">{{
            item.totalLike
          }}</text>
          <uni-icons
            class="icon"
            custom-prefix="iconfont"
            type="icon-pinglun"
            size="20"
            color="#999"
          ></uni-icons>
          <text class="icon-text">{{ item.totalComment }}</text>
        </view>
      </view>
    </view>
  </navigator>
</template>

<style lang="scss">
@import "@/static/iconfont.css";
.card-container {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 12rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20rpx;

  /* 左侧图片 */
  .card-image {
    width: 164rpx;
    height: 164rpx;
    flex-shrink: 0;
    border-radius: 20rpx;
  }

  /* 右侧内容区域 */
  .card-content {
    flex: 1;
    padding: 20rpx;
    padding-bottom: 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* 标题样式 */
    .card-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }

    /* 描述样式 */
    .card-description {
      font-size: 24rpx;
      color: #666;
      margin-bottom: 20rpx;
      line-height: 1.4;
    }
    /* 底部信息区域 */
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 20rpx;
      color: #999;
      .icons {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 8rpx; // 图标与文本间距
        }
        .icon-text {
          font-size: 30rpx;
          color: #999; // 与原样式保持一致
          margin-right: 30rpx;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
