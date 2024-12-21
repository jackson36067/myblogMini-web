<script setup lang="ts">
import type { articleInfo } from "@/types/article";

// 接收父组件传递的数据
defineProps<{
  list: articleInfo[];
}>();
</script>
<template>
  <navigator
    :url="`/pages/detail/detail?id=${item.id}`"
    hover-class="none"
    class="card-container"
    v-for="item in list"
    :key="item.id"
  >
    <text class="title">{{ item.title }}</text>
    <view class="content">
      <image :src="item.coverImage" mode="scaleToFill" class="img" />
      <view class="description">
        <text>{{ item.description }}</text>
        <view class="example-body">
          <view class="tag-view" v-for="(tag, index) in item.tags" :key="index">
            <uni-tag
              :circle="true"
              :text="tag"
              type="primary"
              :inverted="true"
              custom-style="background: linear-gradient(to right, #e6f7ff, #d0efff); border-color: rgba(173, 216, 230, 0.8); color:  #1890ff;"
            ></uni-tag>
          </view>
        </view>
      </view>
    </view>
  </navigator>
</template>
<style lang="scss">
.card-container {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: 20rpx 0;
  padding: 15rpx;
  border-radius: 10rpx;
  border-bottom: 2px solid #f2f2f2;
  box-sizing: border-box;
  .title {
    height: 24rpx;
    line-height: 24rpx;
    font-size: 32rpx;
    font-weight: 700;
  }
  .content {
    display: flex;
    gap: 10rpx;
    .img {
      width: 164rpx;
      height: 164rpx;
      flex-shrink: 0;
      border-radius: 20rpx;
    }
    .description {
      display: flex;
      flex: 1;
      padding-left: 5rpx;
      flex-direction: column;
      justify-content: space-between;
      flex-wrap: wrap; /* 如果内容太多，允许换行 */
      font-size: 26rpx;
      .tag-view {
        display: inline-block; /* 行内块元素 */
        margin: 0 8px 8rpx 0; /* 标签之间的间距 */
      }
    }
  }
}
</style>
