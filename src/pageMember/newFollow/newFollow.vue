<script setup lang="ts">
import { ref } from "vue";
import type { followItem } from "@/types/follow";
import { getFollowListAPI } from "@/apis/follow";
import { onLoad } from "@dcloudio/uni-app";

const followList = ref<followItem[]>([]);
const getFollowList = async () => {
  const res = await getFollowListAPI();
  followList.value = res.data;
};
onLoad(() => {
  getFollowList();
});
</script>
<template>
  <view class="newFollow">
    <navigator
      class="item"
      :url="`/pages/userDetail/userDetail?id=${item.id}`"
      hover-class="none"
      open-type="navigate"
      v-for="item in followList"
      :key="item.id"
    >
      <view class="image">
        <image :src="item.avatar" mode="scaleToFill" />
      </view>
      <view class="left">
        <view class="info">
          <view class="name">
            <!-- 昵称 -->
            <view class="note">{{
              item.comment ? item.comment : item.nickName
            }}</view>
            <!-- 互相关注标签 -->
            <view class="tag" v-if="item.mutualAttention">互相关注</view>
          </view>
          <!-- 关注时间 -->
          <view class="time">{{ item.createTime }} 关注了你</view>
        </view>
        <!-- 右侧图标 -->
        <view class="icon">
          <uni-icons
            type="icon-xiangyoujiantou"
            color=""
            size="16"
            custom-prefix="iconfont"
          />
        </view>
      </view>
    </navigator>
  </view>
</template>

<style lang="scss">
@import "@/static/iconfont.css";
.newFollow {
  padding: 0 20rpx;
  .item {
    display: flex;
    align-items: center;
    padding: 15rpx 0;
    .image {
      flex: 1;
      image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
      }
    }
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 4;
      border-bottom: 1px solid #ccc;
      padding: 25rpx 0 40rpx 0;
      .info {
        display: flex;
        flex-direction: column;
        gap: 18rpx;
        .name {
          display: flex;
          align-items: center;
          gap: 8rpx;
          .note {
            font-size: 40rpx;
            font-weight: 700;
          }
          .tag {
            padding: 4rpx;
            background-color: #ccc;
            font-size: 18rpx;
            border-radius: 10rpx;
            margin-top: 10rpx;
          }
        }
        .time {
          font-size: 26rpx;
        }
      }
    }
  }
}
</style>
