<script setup lang="ts">
import { useMemberStore } from "@/stores";
import type { articleCommentResult } from "@/types/comment";
const memberStore = useMemberStore();
defineProps<{
  list: articleCommentResult[];
}>();
const emit = defineEmits<{
  (event: "doFollow", userId: string): void;
  (event: "doCommentLike", userId: string): void;
}>();

const doFollow = (userId: string) => {
  emit("doFollow", userId);
};
const doCommentLike = (id: string) => {
  emit("doCommentLike", id);
};
</script>
<template>
  <view
    class="comment-list"
    ref="commentList"
    v-for="item in list"
    :key="item.id"
  >
    <view class="image">
      <image :src="item.avatar" mode="scaleToFill" />
      <view
        class="follow"
        v-if="item.nickName !== memberStore.profile?.nickName && !item.isFollow"
        @tap="doFollow(item.userId)"
        >+</view
      >
    </view>
    <view class="text">
      <view class="nickName">
        <view style="margin-right: 10rpx">{{ item.nickName }}</view>
        <uni-icons
          v-if="
            item.isFollow && item.nickName !== memberStore.profile?.nickName
          "
          class="icon-expression"
          custom-prefix="iconfont"
          type="icon-dagou"
          size="18"
          color="#ff9300"
        >
        </uni-icons>
      </view>
      <view class="user-content">{{ item.content }}</view>
      <view class="time">
        <view>{{ item.createTime }}</view>
        <view style="display: flex">
          <uni-icons
            class="icon-expression"
            custom-prefix="iconfont"
            :type="!item.isLike ? 'icon-aixin' : 'icon-aixin1'"
            size="18"
            :color="!item.isLike ? '#999' : 'red'"
            style="margin-right: 10rpx"
            @tap="doCommentLike(item.id)"
          >
          </uni-icons>
          <view style="font-size: 24rpx; color: #999">{{
            item.totalLike
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss">
.comment-list {
  display: flex;
  margin: 0 0 20rpx 20rpx;
  .image {
    position: relative;
    width: 90rpx;
    height: 90rpx;
    image {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .follow {
      position: absolute;
      left: 25rpx;
      bottom: -20rpx;
      width: 40rpx;
      height: 40rpx;
      background-color: red;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      line-height: 40rpx;
      font-size: 36rpx;
    }
  }
  .text {
    display: flex;
    flex: 1;
    justify-content: center;
    padding-left: 20rpx;
    flex-direction: column;
    font-size: 26rpx;
    .nickName {
      display: flex;
      color: #e0dbcb;
    }
    .user-content {
      margin-top: 20rpx;
      min-height: 50rpx;
      height: 50rpx;
      max-height: 120rpx;
    }
    .time {
      display: flex;
      justify-content: space-between;
      padding-right: 20rpx;
    }
  }
}
</style>
