<script setup lang="ts">
import { getUserDataListAPI } from "@/apis/data";
import { getUnReadMessageListAPI } from "@/apis/chat";
import type { userDataResult } from "@/types/social";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import type { unReadMessage } from "@/types/chat";
import { useUnReadMessageStore } from "@/stores/modules/unReadStore";

const userDataList = ref<userDataResult[]>([]);
const getUserDataList = async () => {
  const res = await getUserDataListAPI(0);
  userDataList.value = res.data;
};
// 获取未读信息
const unreadMessageList = ref<unReadMessage[]>([]);
const unreadMessageStore = useUnReadMessageStore();
const unreadFollowMessageNumber = ref<number>(0);
const getUnReadMessageList = async () => {
  const res = await getUnReadMessageListAPI();
  unreadMessageList.value = res.data.unReadMessageVOList;
  const totalUnReadMessageNumber = unreadMessageList.value
    .map((item) => {
      return item.unReadMessageNumber;
    })
    .reduce((prev: number, item: number) => {
      return prev + item;
    });
  unreadFollowMessageNumber.value = res.data.totalUnReadFollowMessageNumber;
  // 使用pinia保存未读数字
  unreadMessageStore.setTotalUnReadMessage(
    totalUnReadMessageNumber + unreadFollowMessageNumber.value
  );
};
onShow(() => {
  getUserDataList();
  getUnReadMessageList();
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
      <navigator
        class="item"
        url="/pageMember/newFollow/newFollow"
        open-type="navigate"
        hover-class="none"
      >
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
        <view class="badge" v-if="unreadFollowMessageNumber > 0">
          <uni-badge
            class="uni-badge-left-margin"
            :text="unreadFollowMessageNumber.toString()"
            size="normal"
          />
        </view>
        <view class="time">01/02</view>
      </navigator>
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
      <navigator
        v-for="item in unreadMessageList"
        :key="item.senderId"
        :url="`/pages/chat/chat?id=${item.senderId}`"
        hover-class="none"
        class="item"
      >
        <view class="info">
          <view class="icon-interaction">
            <image class="image" :src="item.avatar" mode="scaleToFill" />
          </view>
          <view class="notice">
            <view class="theme">{{ item.nickName }}</view>
            <view class="situation">{{ item.lastOnlineTime }}</view>
          </view>
        </view>
        <view class="badge" v-if="item.unReadMessageNumber > 0">
          <uni-badge
            class="uni-badge-left-margin"
            :text="item.unReadMessageNumber.toString()"
            size="normal"
          />
        </view>
        <view class="time">前天</view>
      </navigator>
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
            left: 26rpx;
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
            left: 26rpx;
          }

          .image {
            width: 110rpx;
            height: 110rpx;
            border-radius: 50%;
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
        margin: 26rpx 0 0 0;
      }

      .badge {
        margin: 20rpx 0 0 80rpx;
      }
    }
  }
}
</style>
