<script setup lang="ts">
import type { userDataResult } from "@/types/social";

defineProps<{ list: userDataResult[]; current: number }>();

const emit = defineEmits<{
  (event: "doFollow", id: string): void;
  (event: "moreOperate", nickName: string, comment: string, id: string): void;
}>();
const doFollow = (id: string) => {
  emit("doFollow", id);
};
const moreOperate = (nickName: string, comment: string, id: string) => {
  emit("moreOperate", nickName, comment, id);
};
</script>

<template>
  <view class="user" v-for="item in list" :key="item.id">
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
        class="more"
        @tap="moreOperate(item.nickName, item.comment, item.id)"
      >
      </uni-icons>
    </view>
  </view>
</template>
