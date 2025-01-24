<script setup lang="ts">
import type { userDataResult } from "@/types/social";

defineProps<{ list: userDataResult[]; current: number }>();

const emit = defineEmits<{
  (event: "doFollow", id: string): void;
  (
    event: "moreOperate",
    nickName: string,
    comment: string,
    id: string,
    index: number
  ): void;
}>();
const doFollow = (id: string) => {
  emit("doFollow", id);
};

const moreOperate = (
  nickName: string,
  comment: string,
  id: string,
  index: number
) => {
  emit("moreOperate", nickName, comment, id, index);
};
</script>

<template>
  <navigator
    :url="`/pages/userDetail/userDetail?id=${item.id}`"
    open-type="navigate"
    hover-class="none"
    class="user"
    v-for="(item, index) in list"
    :key="item.id"
  >
    <image class="img" :src="item.avatar" mode="scaleToFill" />
    <view class="user-info">
      <view class="nickName">{{
        item.comment ? item.comment : item.nickName
      }}</view>
      <view class="tags">4个作品为查看|看作品 ></view>
    </view>
    <view v-if="current !== 0" style="display: flex; align-items: center">
      <view
        :class="[
          'button',
          {
            'follow-button': item.isFollow,
          },
          {
            'no-follow-button': !item.isFollow,
          },
        ]"
        @tap="doFollow(item.id)"
        >{{ !item.isFollow ? "回关" : current === 2 ? "互相关注" : "已关注" }}
      </view>
      <uni-icons
        custom-prefix="iconfont"
        type="icon-24gf-ellipsis"
        size="20"
        :class="`more-icon-${item.id}`"
        @tap.stop="moreOperate(item.nickName, item.comment, item.id, index)"
      >
      </uni-icons>
    </view>
  </navigator>
</template>
<style lang="scss">
.user {
  display: flex;
  align-items: center;
  width: 100%;
  height: 160rpx;
  margin-top: 30rpx;
  .img {
    border-radius: 50%;
    width: 120rpx;
    height: 120rpx;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20rpx;
    width: 330rpx;
    .nickName {
      font-weight: 700;
      white-space: nowrap; /* 防止文本换行 */
      overflow: hidden; /* 隐藏超出部分 */
      text-overflow: ellipsis; /* 超出部分显示省略号 */
      margin-bottom: 5rpx;
    }
    .tags {
      width: 260rpx;
      background-color: #e8e8ea;
      color: #747476;
      padding: 0 5rpx;
      border: 1px solid #e1e1e1;
      white-space: nowrap; /* 防止文本换行 */
      font-size: 24rpx;
      border-radius: 15rpx;
      overflow: hidden; /* 隐藏超出部分 */
      text-overflow: ellipsis; /* 超出部分显示省略号 */
      margin-top: 5rpx;
    }
  }
  .button {
    width: 140rpx;
    text-align: center;
    padding: 15rpx 0;
    margin: 0 25rpx 0 20rpx;
    border-radius: 20rpx;
  }
  .follow-button {
    background-color: #e8e8ea;
    color: #353535;
  }
  .no-follow-button {
    background-color: #ff2353;
    color: #fff;
  }
}
</style>
