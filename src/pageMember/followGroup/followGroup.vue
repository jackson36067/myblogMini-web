<script setup lang="ts">
import { getUserGroupListAPI } from "@/apis/userGroup";
import type { userGroupResult } from "@/types/userGroup";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";

const userGroupList = ref<userGroupResult[]>([]);
// 获取分组信息
const genGroupInfo = async () => {
  const res = await getUserGroupListAPI();
  userGroupList.value = res.data;
};
onShow(() => {
  genGroupInfo();
});
</script>
<template>
  <view class="group-container">
    <!-- 循环分组列表 -->
    <view class="group-item" v-for="group in userGroupList" :key="group.id">
      <!-- 分组标题 -->
      <navigator
        :url="`/pageMember/groupMember/groupMember?id=${group.id}`"
        open-type="navigate"
        hover-class="none"
        class="group-header"
      >
        <view class="group-name">{{ group.groupName }}</view>
        <view class="group-count">
          {{ group.groupMemberVOList.length }}人
          <uni-icons
            custom-prefix="iconfont"
            type="icon-xiangyoujiantou"
            size="12"
            color="#888"
          >
          </uni-icons>
        </view>
      </navigator>

      <!-- 分组成员区域 -->
      <view class="group-members">
        <!-- 添加成员按钮 -->
        <navigator
          class="add-icon"
          :url="`/pageMember/addMember/addMember?id=${group.id}`"
          open-type="navigate"
          hover-class="none"
        >
          +
        </navigator>
        <!-- 成员头像 -->
        <view
          class="member-item"
          v-for="(member, index) in group.groupMemberVOList"
          :key="index"
        >
          <image class="member-avatar" :src="member.avatar" />
          <view class="member-name">{{ member.nickName }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import "@/static/iconfont.css";
.group-container {
  padding: 20rpx;
  background-color: #f5f5f5;
  border-radius: 10rpx;
  .group-item {
    margin-bottom: 30rpx;
    background: #fff;
    border-radius: 16rpx;
    padding: 20rpx;

    .group-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20rpx;
      border-bottom: 1px solid #e5e5e5;

      .group-name {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
      }

      .group-count {
        font-size: 24rpx;
        color: #888;
      }
    }

    .group-members {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20rpx; /* 成员间距 */
      margin-top: 20rpx;
      .add-icon {
        width: 85rpx;
        height: 85rpx;
        border-radius: 50%;
        background-color: #f3f3f3;
        color: #97969d;
        font-size: 60rpx;
        border-radius: #efefef;
        text-align: center;
        line-height: 85rpx;
        margin-bottom: 40rpx;
      }
      .member-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100rpx;
        .member-avatar {
          width: 85rpx;
          height: 85rpx;
          border-radius: 50%;
        }

        .member-name {
          margin-top: 14rpx;
          width: 85rpx;
          font-size: 24rpx;
          color: #333;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
