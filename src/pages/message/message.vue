<script setup lang="ts">
import { getUserDataListAPI } from "@/apis/data";
import type { userDataResult } from "@/types/social";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const userDataList = ref<userDataResult[]>([]);
const getUserDataList = async () => {
  const res = await getUserDataListAPI(0);
  userDataList.value = res.data;
};
onLoad(() => {
  getUserDataList();
});
</script>

<template>
  <view class="message">
    <view class="friend-list">
      <navigator
        :url="`/pages/userDetail/userDetail?id=${item.id}`"
        open-type="navigate"
        hover-class="none"
        v-for="item in userDataList"
        :key="item.id"
        class="friend"
      >
        <image class="avatar" :src="item.avatar" mode="scaleToFill" />
        <view>{{ item.nickName }}</view>
      </navigator>
    </view>
    <view class="message-list">
      <view class="item">
        <view class="info">
          <view class="icon_new_follow">
            <uni-icons
              class="icon"
              custom-prefix="iconfont"
              type="icon-yonghuzu"
              size="30"
              color="#fff"
            ></uni-icons>
          </view>
          <view class="notice">
            <view class="theme">新关注我的</view>
            <view class="situation">没有新通知</view>
          </view>
        </view>

        <view class="time">01/02</view>
      </view>
      <view class="item">
        <view class="info">
          <view class="icon-interaction">
            <uni-icons
              class="icon"
              custom-prefix="iconfont"
              type="icon-hudongguanli"
              size="30"
              color="#fff"
            ></uni-icons>
          </view>
          <view class="notice">
            <view class="theme">互动消息</view>
            <view class="situation">...最新访问了你的主页</view>
          </view>
        </view>
        <view class="time">前天</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "@/static/iconfont.css";

.message {
  width: 100%;

  .friend-list {
    margin: 20rpx 30rpx;
    display: flex;
    gap: 30rpx;

    .friend {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      color: #161618;
      height: 180rpx;

      .avatar {
        width: 110rpx;
        height: 110rpx;
        border-radius: 50%;
      }
    }
  }

  .message-list {
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    margin-top: 20rpx;

    .item {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 25rpx;
      &:last-child {
        margin-bottom: 0;
      }

      .info {
        display: flex;

        .icon_new_follow {
          position: relative;
          width: 110rpx;
          height: 110rpx;
          border-radius: 50%;
          background: #46a3ff;

          .icon {
            position: absolute;
            top: 30rpx;
            left: 30rpx;
          }
        }

        .icon-interaction {
          position: relative;
          width: 110rpx;
          height: 110rpx;
          border-radius: 50%;
          background: #ff4b8f;

          .icon {
            position: absolute;
            top: 30rpx;
            left: 30rpx;
          }
        }

        .notice {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: start;
          margin-left: 40rpx;

          .theme {
            font-size: 32rpx;
            font-weight: 700;
            color: #1c1b25;
          }

          .situation {
            font-size: 24rpx;
            color: #9a9a9a;
          }
        }
      }

      .time {
        font-size: 24rpx;
        color: #9a9a9a;
        margin: 20rpx 0 0 0;
      }
    }
  }
}
</style>
