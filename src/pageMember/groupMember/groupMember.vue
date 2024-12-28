<script setup lang="ts">
import UserData from "@/components/userData.vue";
import type { popup } from "@/types/component";
import type { groupMemberResult } from "@/types/groupMember";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import MorePopup from "./component/MemberMorePopup.vue";
import NoteDialogPopup from "@/pages/social/component/NoteDialogPopup.vue";
import { createOrUpdateUserNoteAPI } from "@/apis/note";
import { removeMemberFromGroupAPI } from "@/apis/groupMember";
import GroupMorePopup from "./component/GroupMorePopup.vue";
import {
  deleteGroupByIdAPI,
  getUserGroupListAPI,
  updateGroupNameAPI,
} from "@/apis/userGroup";
import GroupNameDialogPopup from "./component/GroupNameDialogPopup.vue";

const { safeAreaInsets } = uni.getSystemInfoSync();
const backTo = () => {
  uni.navigateBack({ delta: 1 });
};
const props = defineProps<{
  id: string; // 分组id
}>();
const list = ref<groupMemberResult[]>([]);
const name = ref("");
const getGroupMember = async () => {
  // 获取所有分组数据,在过滤出需要的数据
  const res = await getUserGroupListAPI();
  const result = res.data.find((item) => item.id == props.id);
  list.value = result!.groupMemberVOList;
  name.value = result!.groupName;
};
onLoad(() => {
  getGroupMember();
});

// 更多操作弹窗
const memberMorePopup = ref<popup>();
const popupStyle = ref({
  top: "0px",
  right: "0px",
  position: "fixed" as "fixed",
});

const groupMemberInfo = ref(
  {} as { nickName: string; comment: string; id: string }
);

const showMorePopup = (
  nickName: string,
  comment: string,
  id: string,
  index: number
) => {
  popupStyle.value.right = "10px";
  popupStyle.value.top = 190 * (index + 1) + safeAreaInsets!.top + 120 + "rpx";
  if (index === 0) {
    popupStyle.value.top =
      160 * (index + 1) + safeAreaInsets!.top + 160 + "rpx";
  }
  if (memberMorePopup.value) memberMorePopup.value.open();
  groupMemberInfo.value.nickName = nickName;
  groupMemberInfo.value.comment = comment;
  groupMemberInfo.value.id = id;
};
const note = ref("");
const changeNoteValue = (newValue: string) => {
  note.value = newValue;
};
const notePopup = ref<popup>();

const showNoteDialog = () => {
  notePopup.value?.open();
  note.value = groupMemberInfo.value.comment
    ? groupMemberInfo.value.comment
    : groupMemberInfo.value.nickName;
  memberMorePopup.value?.close();
};

const notePopupClose = () => {
  notePopup.value?.close();
};
const notePopupConfirm = async () => {
  await createOrUpdateUserNoteAPI(groupMemberInfo.value.id, note.value);
  getGroupMember();
};

const removeMemberFromGroup = async () => {
  await removeMemberFromGroupAPI(props.id, groupMemberInfo.value.id);
  getGroupMember();
  uni.showToast({
    title: `移除成员${groupMemberInfo.value.nickName}成功`,
    icon: "success",
  });
  memberMorePopup.value?.close();
};

const groupMorePopup = ref<popup>();

// 点击更过操作按钮,显示更多操作弹窗
const showGroupMorePopup = () => {
  groupMorePopup.value?.open();
};

const closeGroupMorePopup = () => {
  groupMorePopup.value?.close();
};

// 修改分组名称弹窗
const groupNamePopup = ref<popup>();
const showchangeGroupNamePopup = () => {
  groupNamePopup.value?.open();
  groupMorePopup.value?.close();
};
const changeGroupName = (newValue: string) => {
  name.value = newValue;
};

const doChangeGroupName = async () => {
  await updateGroupNameAPI(props.id, name.value);
};

// 点击添加成员跳转到添加成员页面
const toAddMember = () => {
  uni.navigateTo({ url: `/pageMember/addMember/addMember?id=${props.id}` });
  if (groupMorePopup.value) groupMorePopup.value?.close();
};

// 删除用户分组
const deleteGroup = () => {
  groupMorePopup.value?.close();
  uni.showModal({
    title: "仅删除分组, 不会取关组内作者, 确认删除?",
    success: async (success) => {
      if (success.confirm) {
        await deleteGroupByIdAPI(props.id);
        uni.navigateBack({ delta: 1 });
      }
    },
  });
};
</script>

<template>
  <view
    class="groupMember"
    :style="{
      paddingTop: safeAreaInsets?.top + 'px',
    }"
  >
    <uni-nav-bar
      @clickLeft="backTo"
      :border="false"
      left-icon="left"
      :title="name"
    />
  </view>

  <view class="main" v-if="list.length">
    <view class="content">
      <UserData :list="list" :current="1" @moreOperate="showMorePopup" />
    </view>
    <view class="more-button">
      <view class="top-border"></view>
      <view class="more-text" @tap="showGroupMorePopup">更多操作</view>
    </view>
  </view>
  <view class="empty-member" v-else>
    <!-- 空状态内容 -->
    <view class="empty_content">
      <view class="icon">
        <view class="user-icon">
          <uni-icons
            type="icon-tianjiayonghu1"
            color="#dcdcde"
            size="60"
            custom-prefix="iconfont"
          ></uni-icons>
        </view>
      </view>
      <view class="text">没有成员</view>
      <view class="add-button" @tap="toAddMember">添加成员</view>
    </view>
  </view>
  <uni-popup
    ref="memberMorePopup"
    type="center"
    background-color="#fff"
    mask-background-color="rgba(0,0,0,0.2)"
  >
    <MorePopup
      :style="popupStyle"
      @showNoteDialog="showNoteDialog"
      @removeMemberFromGroup="removeMemberFromGroup"
    />
  </uni-popup>
  <uni-popup ref="notePopup" type="dialog">
    <uni-popup-dialog
      mode="input"
      title="设置备注"
      :duration="2000"
      @close="notePopupClose"
      @confirm="notePopupConfirm"
      message="成功消息"
    >
      <NoteDialogPopup
        :userNoteNickName="
          groupMemberInfo.comment
            ? groupMemberInfo.comment
            : groupMemberInfo.nickName
        "
        :note="note"
        @changeNoteValue="changeNoteValue"
      />
    </uni-popup-dialog>
  </uni-popup>
  <uni-popup
    ref="groupMorePopup"
    type="bottom"
    background-color="#fff"
    mask-background-color="rgba(0,0,0,0.2)"
    border-radius="20rpx"
  >
    <GroupMorePopup
      @closeGroupMorePopup="closeGroupMorePopup"
      @showChangeGroupName="showchangeGroupNamePopup"
      @toAddMember="toAddMember"
      @deleteGroup="deleteGroup"
    />
  </uni-popup>

  <uni-popup ref="groupNamePopup" type="dialog">
    <uni-popup-dialog
      mode="input"
      title="修改分组名称"
      :duration="2000"
      @close="groupNamePopup?.close()"
      @confirm="doChangeGroupName"
      message="成功消息"
    >
      <GroupNameDialogPopup
        :groupName="name"
        @changeGroupNameValue="changeGroupName"
      />
    </uni-popup-dialog>
  </uni-popup>
</template>

<style lang="scss">
@import "@/static/iconfont.css";
page {
  height: 100%;
}
.main {
  position: relative;
  height: 88%;
  .content {
    padding: 30rpx 20rpx;
  }
  .more-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 45rpx;
    width: 100%;
    /* 上方的边框 */
    .top-border {
      width: 100%;
      height: 2rpx;
      background-color: #e0e0e0;
    }
    /* 按钮样式 */
    .more-text {
      margin-top: 20rpx; /* 与上方边框的间距 */
      width: 90%; /* 占父容器的90%宽度 */
      max-width: 700rpx; /* 限制最大宽度 */
      padding: 24rpx 0; /* 按钮高度 */
      text-align: center;
      background-color: #ff3366; /* 按钮背景颜色 */
      color: #fff; /* 按钮文字颜色 */
      font-size: 32rpx; /* 按钮文字大小 */
      font-weight: bold;
      border-radius: 16rpx; /* 按钮圆角 */
      box-shadow: 0rpx 8rpx 12rpx rgba(0, 0, 0, 0.1); /* 按钮阴影效果 */
    }
  }
}
.empty-member {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;

  .empty_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 500rpx;
    flex: 1;
    text-align: center;

    .icon {
      margin-bottom: 80rpx;
    }

    .text {
      font-size: 28rpx;
      color: #1e1e20;
      margin-bottom: 80rpx;
      font-weight: 700;
    }

    .add-button {
      font-weight: 700;
      font-size: 30rpx;
      color: #1b1920;
      background-color: #f3f3f3;
      padding: 22rpx 92rpx;
      border-radius: 20rpx;
    }
  }
}
</style>
