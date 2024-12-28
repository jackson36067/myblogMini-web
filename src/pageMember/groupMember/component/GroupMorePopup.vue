<script setup lang="ts">
const emit = defineEmits<{
  (event: "closeGroupMorePopup"): void;
  (event: "showChangeGroupName"): void;
  (event: "toAddMember"): void;
  (event: "deleteGroup"): void;
}>();
const closeGroupMorePopup = () => {
  emit("closeGroupMorePopup");
};
const showChangeGroupName = () => {
  emit("showChangeGroupName");
};

const toAddMember = () => {
  emit("toAddMember");
};
const deleteGroup = () => {
  emit("deleteGroup");
};
</script>

<template>
  <view class="group-actions">
    <view class="action-item" @tap="showChangeGroupName">修改分组名称</view>
    <view class="divider"></view>
    <view class="action-item" @tap="toAddMember">添加成员</view>
    <view class="divider"></view>
    <view class="action-item delete" @tap="deleteGroup">删除分组</view>
    <view class="max-divider"></view>
    <view class="action-item cancel" @tap="closeGroupMorePopup">取消</view>
  </view>
</template>
<style lang="scss">
.group-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff; // 背景白色
  border-radius: 16rpx; // 圆角

  .action-item {
    width: 100%; // 占满宽度
    text-align: center;
    font-size: 32rpx; // 字体大小
    color: #333; // 默认字体颜色
    padding: 24rpx 0; // 上下内边距
    background-color: #fff; // 背景白色

    &.delete {
      color: #ff4d4f; // 删除选项为红色
    }

    &.cancel {
      color: #999; // 取消选项为灰色
    }
    &:last-child {
      padding-bottom: 0;
    }
  }

  .divider {
    width: 100%; // 占满宽度
    height: 2rpx; // 分隔线高度
    background-color: #e0e0e0; // 分隔线颜色
  }
  .max-divider {
    width: 100%; // 占满宽度
    height: 10rpx; // 分隔线高度
    background-color: #f3f3f3; // 分隔线颜色
  }
}
</style>
