<script setup lang="ts">
import type { moreUserData } from "@/types/social";
import { ref } from "vue";

const { safeAreaInsets } = uni.getSystemInfoSync();
defineProps<{ userInfo: moreUserData; current: number }>();

type setting = { name: string; icon: `icon-${string}` };
const followSettings = ref<setting[]>([
  {
    name: "设置分组",
    icon: "icon-yonghuzu",
  },
  {
    name: "设置备注",
    icon: "icon-bi",
  },
]);

// 点击关闭符号关闭弹窗
const emit = defineEmits<{
  (event: "closeMorePopup"): void;
  (event: "showNotePopup", userInfo: moreUserData): void;
  (event: "showGroupPopup", userInfo: moreUserData): void;
}>();
const closeMorePopup = () => {
  emit("closeMorePopup");
};

const fansOperate = ref<setting[]>([
  {
    name: "发私信",
    icon: "icon-fasong1",
  },
  {
    name: "举报",
    icon: "icon-jubao-mianxing",
  },
  {
    name: "拉黑",
    icon: "icon-lahei",
  },
]);

const operateUserInfo = (userInfo: moreUserData, name: string) => {
  if (name === "设置备注") {
    emit("showNotePopup", userInfo);
  }
  if (name === "设置分组") {
    emit("showGroupPopup", userInfo);
  }
};
</script>

<template>
  <view
    class="content"
    :style="{ paddingBottom: safeAreaInsets!.bottom + 'px' }"
  >
    <view class="close">
      <uni-icons
        custom-prefix="iconfont"
        type="icon-icon_wrong"
        size="14"
        color="#232323"
        @tap="closeMorePopup"
      ></uni-icons>
    </view>
    <view class="name">
      <view class="strong">{{ userInfo.comment || userInfo.nickName }}</view>
      <view class="other-name" v-if="userInfo.comment">
        名字: {{ userInfo.nickName }}
      </view>
    </view>
    <view class="main-content">
      <view v-if="current === 1">
        <view class="settings">
          <view
            class="setting"
            v-for="(item, index) in followSettings"
            :key="index"
            @tap="operateUserInfo(userInfo, item.name)"
          >
            <view>{{ item.name }}</view>
            <uni-icons
              custom-prefix="iconfont"
              :type="item.icon"
              size="20"
            ></uni-icons>
          </view>
        </view>
        <view class="cancle_follow">
          <view>取消关注</view>
          <uni-icons
            custom-prefix="iconfont"
            type="icon-quxiaoguanzhu"
            color="#ff2f22"
            size="20"
          ></uni-icons>
        </view>
      </view>
      <view v-if="current === 2">
        <view class="operate">
          <view class="item" v-for="(item, index) in fansOperate" :key="index">
            <uni-icons
              class="icon"
              custom-prefix="iconfont"
              :type="item.icon"
              color="#4c5058"
              size="40"
            ></uni-icons>
            <view class="name">{{ item.name }}</view>
          </view>
        </view>
        <view class="action">
          <view class="shield">
            <view>不让他看作品</view>
            <switch
              :checked="false"
              color="#1ae780"
              style="transform: scale(0.7); display: flex"
            />
          </view>
          <view class="remove">
            <view>移除粉丝</view>
            <uni-icons
              custom-prefix="iconfont"
              type="icon-yichuyonghu"
              color="#4c5058"
              size="20"
            ></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss">
.content {
  position: relative;
  background-color: #f3f3f3;
  border-radius: 20rpx;
  padding: 40rpx 20rpx 0;
  .close {
    position: absolute;
    top: 20rpx;
    right: 14rpx;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background-color: #e7e7e7;
    line-height: 60rpx;
    text-align: center;
  }
  .name {
    .strong {
      font-weight: 700;
      color: #4e515a;
    }
    .other-name {
      font-size: 24rpx;
      color: #b1b1b3;
      margin-top: 5rpx;
    }
  }
  .main-content {
    margin-top: 65rpx;
    border-radius: 20rpx;
    .settings {
      background-color: #fff;
      border-radius: 20rpx;
      .setting {
        display: flex;
        justify-content: space-between;
        padding: 25rpx 20rpx;
        border-bottom: 2px solid #f8f8f8;
        font-weight: 700;
      }
      &:last-child {
        border: none;
      }
    }
    .cancle_follow {
      display: flex;
      justify-content: space-between;
      margin-top: 20rpx;
      padding: 25rpx 20rpx;
      color: #ff2f22;
      font-weight: 700;
      border-radius: 20rpx;
      background-color: #fff;
    }
    .operate {
      display: flex;
      .item {
        display: flex;
        flex: 1;
        padding: 35rpx 20rpx;
        margin-right: 20rpx;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        border-radius: 20rpx;
        .name {
          margin-top: 10rpx;
          font-size: 26rpx;
          color: #909090;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .action {
      background-color: #fff;
      margin-top: 30rpx;
      border-radius: 20rpx;
      .shield,
      .remove {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
      }
      .remove {
        padding: 40rpx 60rpx;
      }
      .shield {
        border-bottom: 2px solid #f8f8f8;
        padding: 25rpx 60rpx;
        // switch自带padding
        padding-right: 35rpx;
      }
    }
  }
}
</style>
