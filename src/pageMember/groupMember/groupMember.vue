<script setup lang="ts">
import UserData from "@/components/userData.vue";
import type { popup } from "@/types/component";
import type { groupMemberResult } from "@/types/groupMember";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import MorePopup from "./component/MorePopup.vue";
import NoteDialogPopup from "@/pages/social/component/NoteDialogPopup.vue";
import { createOrUpdateUserNoteAPI } from "@/apis/note";
import {
  getMemberByGroupIdAPI,
  removeMemberFromGroupAPI,
} from "@/apis/groupMember";

const { safeAreaInsets } = uni.getSystemInfoSync();
const backTo = () => {
  uni.navigateBack({ delta: 1 });
};
const props = defineProps<{
  id: string;
  name: string;
}>();
const list = ref<groupMemberResult[]>([]);
const getGroupMember = async () => {
  const res = await getMemberByGroupIdAPI(props.id);
  list.value = res.data;
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
</script>

<template>
  <view class="groupMember" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <uni-nav-bar
      @clickLeft="backTo"
      :border="false"
      left-icon="left"
      :title="name"
    />
  </view>
  <view class="content">
    <UserData :list="list" :current="1" @moreOperate="showMorePopup" />
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
</template>

<style lang="scss">
@import "@/static/iconfont.css";
.content {
  padding: 30rpx 20rpx;
}
</style>
