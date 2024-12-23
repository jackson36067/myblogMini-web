<script setup lang="ts">
import type { articleCommentResult } from "@/types/comment";
import Comment from "./Comment.vue";

defineProps<{ list: articleCommentResult[] }>();
const emit = defineEmits<{
  (event: "closePopup"): void;
  (event: "doFollow", userId: string): void;
  (event: "doCommentLike", id: string): void;
}>();

const closePopup = () => {
  emit("closePopup");
};

const doFollow = (userId: string) => {
  emit("doFollow", userId);
};

const doCommentLike = (id: string) => {
  emit("doCommentLike", id);
};
</script>
<template>
  <view
    style="
      height: 1320rpx;
      overflow-y: scroll;
      overscroll-behavior: none;
      padding-top: 20rpx;
      padding-bottom: 30rpx;
    "
  >
    <view style="display: flex; align-items: center; margin: 0 30rpx 40rpx">
      <view>
        <uni-icons
          custom-prefix="iconfont"
          type="icon-cuowu"
          size="18"
          color="#666666"
          @tap="closePopup"
        ></uni-icons>
      </view>
      <view style="margin-left: 230rpx; font-size: 32rpx; font-weight: 700">
        全部{{ list.length }}条评论
      </view>
    </view>
    <Comment :list="list" @doFollow="doFollow" @doCommentLike="doCommentLike" />
  </view>
</template>
