<script setup lang="ts">
import type { userGroupResult } from "@/types/userGroup";
import emtpy from "@/static/image/empty.jpg";
import type { popup } from "@/types/conponent";
import { ref } from "vue";
const { safeAreaInsets } = uni.getSystemInfoSync();
const prors = defineProps<{
  groupList: userGroupResult[];
  groupName: string;
  memberId: string;
}>();
const emit = defineEmits<{
  (event: "closeGroupPopup"): void;
  (event: "onChangeGroupNameValue", groupName: string): void;
  (event: "groupNamePopupConfirm", memberId: string): void;
  (event: "changeGroupMember", id: string, memberId: string): void;
}>();
const closeGroupPopup = () => {
  emit("closeGroupPopup");
};

const groupNamePopup = ref<popup>();

// 点击新建分组,打开分组对话框
const showGroupNameDialog = () => {
  groupNamePopup.value?.open();
};

// 点击取消按钮,关闭分组对话框
const groupNamePopupClose = () => {
  groupNamePopup.value?.close();
};

// 输入框值发生变化时,改变父组件中分组名称的值
const onChangeGroupNameValue: UniHelper.InputOnInput = (event) => {
  emit("onChangeGroupNameValue", event.detail.value);
};

// 点击输入框后的x时将输入框的值清除
const clearGroupNameValue = () => {
  emit("onChangeGroupNameValue", "");
};

// 点击确认按钮后确认创建分组
const groupNamePopupConfirm = () => {
  emit("groupNamePopupConfirm", prors.memberId);
};

// 修改用户的分组
const changeGroupMember = (id: string, memberId: string, isMember: boolean) => {
  // 如果用户已经是这个分组的成员点击就无效
  if (!isMember) {
    emit("changeGroupMember", id, memberId);
  }
};
</script>
<template>
  <view
    class="popup-container"
    :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"
  >
    <view class="header">
      <view class="cancel-btn" @tap="closeGroupPopup">取消</view>
      <view class="title">加入分组</view>
      <view
        class="create-group"
        v-if="groupList.length"
        @tap="groupNamePopup?.open()"
        >新建分组</view
      >
    </view>

    <view class="group-list" v-if="groupList.length">
      <view
        v-for="item in groupList"
        :key="item.id"
        class="group-item"
        @tap="changeGroupMember(item.id, memberId, item.isMember)"
      >
        <view class="group-name">{{ item.groupName }}</view>
        <view class="group-check" v-if="item.isMember">
          <uni-icons
            custom-prefix="iconfont"
            type="icon-duigouxiao"
            size="24"
            color="#ff6b81"
          ></uni-icons>
        </view>
      </view>
    </view>
    <view v-else class="empty">
      <image class="img" :src="emtpy" />
    </view>
    <view class="footer" v-if="groupList.length">
      <view class="confirm-btn" @tap="closeGroupPopup">确定</view>
    </view>
    <view v-else class="none-info-button" @tap="showGroupNameDialog">
      新建分组
    </view>
  </view>

  <!-- 设置备注对话框 -->
  <uni-popup ref="groupNamePopup" type="dialog">
    <uni-popup-dialog
      mode="input"
      title="新建分组"
      :duration="2000"
      @close="groupNamePopupClose"
      @confirm="groupNamePopupConfirm"
      message="成功消息"
    >
      <view class="gorupPopup">
        <view class="prompt"> 标题最多不超过12字 </view>
        <input
          class="group_name_input"
          :value="groupName"
          placeholder="输入分组标题"
          type="text"
          :auto-blur="true"
          @input="onChangeGroupNameValue"
          :maxlength="12"
        />
        <view
          class="group_name_close_button"
          v-if="groupName"
          @tap="clearGroupNameValue"
        >
          <uni-icons custom-prefix="iconfont" type="icon-icon_wrong" size="12">
          </uni-icons>
        </view>
      </view>
    </uni-popup-dialog>
  </uni-popup>
</template>
<style lang="scss">
.popup-container {
  width: 700rpx;
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  margin: 0 auto;

  .header {
    display: flex;
    align-items: center;
    margin-top: 20rpx;
    padding: 20rpx;

    .cancel-btn {
      float: left;
      font-size: 28rpx;
      color: #999;
    }

    .title {
      margin-left: 210rpx;
      font-size: 32rpx;
      font-weight: bold;
    }

    .create-group {
      margin-left: 155rpx;
      font-size: 28rpx;
      color: #ff6b81;
    }
  }

  .group-list {
    margin-top: 30rpx;
    padding: 20rpx;

    .group-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx 0;
      font-size: 30rpx;
      border-bottom: 1rpx solid #e5e5e5;

      .group-name {
        color: #333;
      }
    }
  }

  .empty {
    margin: 0 auto;
    margin-top: 100rpx;
    width: 450rpx;
    height: 320rpx;
    background-color: #ff6b81;

    .img {
      width: 100%;
      height: 100%;
    }
  }

  .footer {
    margin-top: 130rpx;
    padding: 20rpx;

    .confirm-btn {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 30rpx;
      color: #fff;
      background-color: #ff6b81;
      border-radius: 40rpx;
    }
  }
  .none-info-button {
    margin: 0 auto;
    margin-top: 30rpx;
    width: 75%;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 30rpx;
    border: 1px solid #8d8d8d;
    border-radius: 8rpx;
  }
}

.gorupPopup {
  display: flex;
  flex-direction: column;
  position: relative;
  .prompt {
    font-size: 24rpx;
    color: #4f4f4f;
    margin: 0 10rpx 20rpx 0;
  }
  .group_name_input {
    width: 400rpx;
    height: 80rpx;
    background-color: #f3f3f3;
    padding-left: 10rpx;
    border-radius: 10rpx;
  }
  .group_name_close_button {
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
