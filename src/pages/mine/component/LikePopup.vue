<script setup lang="ts">
defineProps<{
  nickName: string;
  totalLike: number;
}>();
const emit = defineEmits<{
  (event: "closeLikePopup"): void;
}>();

const doCloseLikePopup = () => {
  emit("closeLikePopup");
};
</script>
<template>
  <view class="likePopup">
    <view class="backgroundPanel"></view>
    <view class="data"> "{{ nickName }}"共获得{{ totalLike }}赞 </view>
    <view class="confirm" @tap="doCloseLikePopup">确认</view>
  </view>
</template>
<style lang="scss">
.likePopup {
  width: 600rpx;
  .backgroundPanel {
    width: 100%;
    height: 300rpx;
    background: linear-gradient(90deg, #d5b9ec, #b9fbef);
  }
  .data {
    padding: 60rpx 0;
    text-align: center;
    font-size: 30rpx;
    color: #999;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
  }
  .confirm {
    padding: 20rpx 0;
    text-align: center;
    font-weight: 700;
    font-size: 30rpx;
    &:hover {
      background-color: rgb(0, 0, 0, 0.3);
    }
  }
}
</style>
