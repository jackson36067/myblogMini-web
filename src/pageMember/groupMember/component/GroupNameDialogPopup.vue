<script setup lang="ts">
const props = defineProps<{
  groupName: string;
}>();

const emit = defineEmits<{
  (event: "changeGroupNameValue", newValue: string): void;
}>();
// 当input输入值后传递新值给父组件
const onChangeGroupNameValue: UniHelper.InputOnInput = (event) => {
  emit("changeGroupNameValue", event.detail.value);
};
// 当点击清空按钮后,将''新值传递给父组件
const clearGroupNameValue = () => {
  emit("changeGroupNameValue", "");
};
</script>
<template>
  <view class="notePopup">
    <view class="user_nick_name">标题最多不超过12字</view>
    <input
      class="note_input"
      :value="props.groupName"
      placeholder="请输入备注"
      type="text"
      :auto-blur="true"
      @input="onChangeGroupNameValue"
    />
    <view
      class="note_close_button"
      v-if="props.groupName"
      @tap="clearGroupNameValue"
    >
      <uni-icons custom-prefix="iconfont" type="icon-icon_wrong" size="12">
      </uni-icons>
    </view>
  </view>
</template>
<style lang="scss">
.notePopup {
  display: flex;
  flex-direction: column;
  position: relative;
  .user_nick_name {
    font-size: 24rpx;
    color: #4f4f4f;
    margin: 0 10rpx 20rpx 0;
  }
  .note_input {
    width: 400rpx;
    height: 80rpx;
    background-color: #f3f3f3;
    padding-left: 10rpx;
    border-radius: 10rpx;
  }
  .note_close_button {
    position: absolute;
    top: 70rpx;
    right: 14rpx;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background-color: #fff;
    line-height: 40rpx;
    text-align: center;
    z-index: 9999;
  }
}
</style>
