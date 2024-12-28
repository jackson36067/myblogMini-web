<script setup lang="ts">
import { ref } from "vue";
import type { addUserFollowGroupResult } from "@/types/userGroup";
import { getAddGroupMemberInfoListAPI } from "@/apis/userGroup";
import { addOrDeleteMemberToGroupAPI } from "@/apis/groupMember";
import { onLoad } from "@dcloudio/uni-app";

const { safeAreaInsets } = uni.getSystemInfoSync();

const params = defineProps<{ id: string }>();

const backTo = () => {
  uni.navigateBack({ delta: 1 });
};
const inputStyle: UniHelper.UniEasyinputStyles = {
  color: "",
  borderColor: "",
  backgroundColor: "",
  disableColor: "",
};

const nickNameOrComment = ref("");

const addGroupMemberInfoList = ref<addUserFollowGroupResult[]>([]);
const getAddGroupMemberInfo = async () => {
  const res = await getAddGroupMemberInfoListAPI(
    params.id,
    nickNameOrComment.value
  );
  addGroupMemberInfoList.value = res.data;
};
onLoad(() => {
  getAddGroupMemberInfo();
});
const onNameOrCommentChange = () => {
  getAddGroupMemberInfo();
};

// 将关注者加入获取移除用户分组
const addOrDeleteMemberToGroup = async (id: string) => {
  await addOrDeleteMemberToGroupAPI(params.id, id);
  getAddGroupMemberInfo();
};
</script>

<template>
  <view class="addMember" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <uni-nav-bar
      @clickLeft="backTo"
      :border="false"
      left-icon="left"
      title="添加新成员"
    />
    <view class="query">
      <uni-easyinput
        prefixIcon="search"
        v-model="nickNameOrComment"
        placeholder="搜索用户备注或者名字"
        :inputBorder="false"
        trim="all"
        :styles="inputStyle"
        @change="onNameOrCommentChange"
        @clear="onNameOrCommentChange"
      ></uni-easyinput>
    </view>
    <view class="container">
      <view v-for="item in addGroupMemberInfoList" :key="item.id" class="item">
        <view class="avatar">
          <image :src="item.avatar" class="avatar-img" />
        </view>
        <view class="content">
          <view class="title">{{ item.nickName }}</view>
          <view class="description"></view>
        </view>
        <view
          class="button"
          :class="{ added: item.isMember }"
          @tap="addOrDeleteMemberToGroup(item.id)"
        >
          {{ item.isMember ? "已添加" : "添加" }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "@/static/query.css";
.container {
  padding: 20rpx;
}

.item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  padding: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

  .avatar {
    margin-right: 20rpx;

    .avatar-img {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }
  }

  .content {
    flex: 1;
    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
    }
    .description {
      font-size: 28rpx;
      color: #666666;
    }
  }

  .button {
    width: 190rpx;
    height: 70rpx;
    line-height: 70rpx;
    text-align: center;
    border-radius: 20rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #ffffff;
    background-color: #ff4d4f;
    &.added {
      background-color: #fff;
      color: #1e1e1e;
      border: 1px solid #ccc;
    }
  }
}
</style>
