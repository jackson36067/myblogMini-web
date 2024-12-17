<script setup lang="ts">
import { updateUserInfoAPI } from "@/apis/user";
import { useMemberStore } from "@/stores";
import type { updateUserParams } from "@/types/user";
import { ref } from "vue";

const memberStore = useMemberStore();
const userProfile = ref({} as updateUserParams);

// 点击修改图片
const onAvatarChange = () => {
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ["image"],
    success: (res) => {
      // 本地路径 (上传的图片的本地路径)
      const { tempFilePath } = res.tempFiles[0];
      // 文件上传
      uni.uploadFile({
        url: "http://localhost:8080/admin/user/upload",
        name: "image",
        filePath: tempFilePath, // 新头像
        success: (res) => {
          if (res.statusCode === 200) {
            // 提取头像
            const { avatar } = JSON.parse(res.data).result;
            userProfile.value.avatar = avatar;
            // 当前页面更新头像
            memberStore.profile!.avatar = avatar;
            uni.showToast({ icon: "success", title: "更新成功" });
          } else {
            uni.showToast({ icon: "error", title: "出现错误" });
          }
        },
      });
    },
  });
};

const udpateUserInfo = async () => {
  memberStore.profile!.nickName = userProfile.value.nickName;
  await updateUserInfoAPI(userProfile.value);
  uni.showToast({ title: "修改信息成功", icon: "success" });
};
</script>
<template>
  <view class="profile-container">
    <!-- 头像区域 -->
    <view class="avatar-wrapper">
      <image
        :src="memberStore.profile?.avatar"
        class="avatar"
        @tap="onAvatarChange"
      ></image>
      <view class="username">{{ memberStore.profile?.nickName }}</view>
    </view>

    <!-- 输入昵称 -->
    <view class="input-wrapper">
      <input
        type="text"
        placeholder="请输入昵称"
        class="nickname-input"
        v-model="userProfile.nickName"
      />
    </view>

    <!-- 提示信息 -->
    <view class="tips">
      <text>🔔提示：点击上方头像可修改头像</text>
    </view>

    <!-- 提交按钮 -->
    <view class="submit-wrapper">
      <button class="submit-button" @tap="udpateUserInfo">提交修改</button>
    </view>
  </view>
</template>
<style lang="scss">
page {
  background-color: #f1f1f1;
}
.profile-container {
  margin-top: 40rpx;
  display: flex;
  flex-direction: column;
  height: 1000rpx;

  // 头像区域
  .avatar-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40rpx;

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      border: 2px solid #ddd;
    }

    .username {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
    }
  }

  // 输入框区域
  .input-wrapper {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 60rpx;

    .nickname-input {
      width: 100%;
      height: 100rpx;
      padding: 0 24rpx;
      font-size: 28rpx;
      background-color: #fff;
      border-radius: 10rpx;
      box-sizing: border-box;
    }
  }

  // 提示信息
  .tips {
    margin-left: 37.5rpx;
    font-size: 24rpx;
    color: #999;
  }

  // 提交按钮区域
  .submit-wrapper {
    margin-top: 100rpx;
    width: 100%;
    .submit-button {
      width: 35%;
      height: 80rpx;
      background-color: #4285f4;
      color: #fff;
      font-size: 32rpx;
      text-align: center;
      border: none;
      border-radius: 10rpx;
      box-shadow: 0 8rpx 12rpx rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #357ae8;
      }

      &:active {
        background-color: #2b65c6;
      }
    }
  }
}
</style>
