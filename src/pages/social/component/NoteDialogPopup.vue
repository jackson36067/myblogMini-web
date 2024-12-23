<script setup lang="ts">
// 如何实现输入值后将值传递给父组件,这里使用的是input value属性 + @input函数
// value并不会双向绑定, 我们可以将备注通过父组件传递给子组件,
// 而展示在input中使用value而不是v-model, 这样做的原因是为了不影响父组件的备注值,values的值随着你父组件的备注值改变,也可以随着输入的值而改变
// 而如何更新父组件备注值,通过@input + emit 达到效果
// 而清除数据则可以使用emit传递控制即可,当父组件备注值变为'',传递过来的值也就为'',就可以达到清除文字的效果

const props = defineProps<{
  userNoteNickName: string;
  note: string;
}>();

const emit = defineEmits<{
  (event: "changeNoteValue", newValue: string): void;
}>();
// 当input输入值后传递新值给父组件
const onChangeNoteValue: UniHelper.InputOnInput = (event) => {
  emit("changeNoteValue", event.detail.value);
};
// 当点击清空按钮后,将''新值传递给父组件
const clearNoteValue = () => {
  emit("changeNoteValue", "");
};
</script>
<template>
  <view class="notePopup">
    <view class="user_nick_name"> 名字: {{ userNoteNickName }} </view>
    <input
      class="note_input"
      :value="props.note"
      placeholder="请输入备注"
      type="text"
      :auto-blur="true"
      @input="onChangeNoteValue"
    />
    <view class="note_close_button" v-if="props.note" @tap="clearNoteValue">
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
