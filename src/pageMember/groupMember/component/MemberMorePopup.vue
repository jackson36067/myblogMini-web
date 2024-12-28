<script setup lang="ts">
const emit = defineEmits<{
  (event: "showNoteDialog"): void;
  (event: "removeMemberFromGroup"): void;
}>();
const showNoteDialog = () => {
  emit("showNoteDialog");
};
const removeMemberFromGroup = () => {
  emit("removeMemberFromGroup");
};
</script>

<template>
  <view class="popup-wrapper">
    <view class="popup-content">
      <view class="menu-item" @tap="showNoteDialog">
        <uni-icons
          custom-prefix="iconfont"
          type="icon-bi"
          size="22"
          class="icon-remark"
          color="#16141d"
        ></uni-icons>
        <view class="menu-text">设置备注</view>
      </view>
      <view class="menu-item">
        <uni-icons
          custom-prefix="iconfont"
          type="icon-shanchu"
          size="22"
          color="#16141d"
          class="icon-remark"
        ></uni-icons>
        <view class="menu-text" @tap="removeMemberFromGroup">从组内移除</view>
      </view>
    </view>
  </view>
</template>
<style lang="scss">
@import "@/static/iconfont.css";
.popup-content {
  display: flex;
  flex-direction: column;
  position: relative;
  background: #fff;
  border-radius: 20rpx;
  padding-right: 60rpx;
  .menu-item {
    display: flex;
    align-items: center;
    padding: 25rpx 15rpx;
    border-bottom: 1px solid #e4e4e4;
    .icon-remark {
      margin-right: 25rpx;
    }
    &:last-child {
      border-bottom: none;
    }
  }

  &::before {
    content: ""; /* 必须有内容 */
    position: absolute;
    top: -15rpx; /* 将三角形放到盒子顶部 */
    right: 10%; /* 水平居中 */
    border-left: 15rpx solid transparent; /* 左侧透明 */
    border-right: 15rpx solid transparent; /* 右侧透明 */
    border-bottom: 15rpx solid #fff; /* 底部为盒子的背景色 */
  }
}
</style>
