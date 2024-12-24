<script setup lang="ts">
import { ref } from "vue";
import SortPopup from "./component/SortPopup.vue";
import type { popup, sortPopupInstance } from "@/types/conponent";
import type {
  moreUserData,
  sortItemResult,
  userDataResult,
} from "@/types/social";
import { onLoad } from "@dcloudio/uni-app";
import { getUserDataListAPI } from "@/apis/data";
import { useFollowSortStore } from "@/stores/modules/followSort";
import { doFollowAPI } from "@/apis/follow";
import MorePopup from "./component/MorePopup.vue";
import type { noteResult } from "@/types/note";
import type { userGroupResult } from "@/types/userGroup";
import { createOrUpdateUserNoteAPI, getUserNoteAPI } from "@/apis/note";
import NoteDialogPopup from "./component/NoteDialogPopup.vue";
import { addUserGroupAPI, getUserGroupListAPI } from "@/apis/userGroup";
import GroupPopup from "./component/GroupPopup.vue";
import type { groupMemberResult } from "@/types/groupMember";
import { insertOrChangeMemberToGroupAPI } from "@/apis/groupMember";

const { safeAreaInsets } = uni.getSystemInfoSync();
// 从路径参数中获取current(取决于展示哪个)
const params = defineProps<{
  current: string;
}>();

const followSortStore = useFollowSortStore();

// 输入框内容
const nickNameOrComment = ref("");

const inputStyle: UniHelper.UniEasyinputStyles = {
  color: "",
  borderColor: "",
  backgroundColor: "#f3f3f3",
  disableColor: "",
};

// 点击左侧图标回到上一个页面
const returnMien = () => {
  uni.switchTab({ url: "/pages/mine/mine" });
};

// tab默认选中标签
const current = ref(0);
// tab栏item内容
const tabItems = ref<string[]>(["朋友", "关注", "粉丝"]);

// 获取用户信息
const userDataList = ref<userDataResult[]>([]);
const getUserDataList = async () => {
  const res = await getUserDataListAPI(
    current.value,
    followSortStore.sort?.sort,
    nickNameOrComment.value
  );
  userDataList.value = res.data;
};

onLoad(() => {
  current.value = Number(params.current);
  getUserDataList();
});

const onInputChange = () => {
  getUserDataList();
};

// 点击tab栏切换内容
const onClickItem: UniHelper.UniSegmentedControlOnClickItem = (event) => {
  current.value = event.currentIndex;
  nickNameOrComment.value = "";
  getUserDataList();
};

// 关注页选择排序方式
const selectSort = (sortItem: sortItemResult) => {
  followSortStore.setNewSort({ sort: sortItem.sort, name: sortItem.name });
  getUserDataList();
};

// 显示排序方式
const sortPopup = ref<sortPopupInstance>();
const showSortPopup = () => {
  sortPopup.value?.updateSortPopupVisible();
};

// 点击关注或者取消关注
const doFollow = async (id: string) => {
  await doFollowAPI(id);
  getUserDataList();
};

// 更多操作弹窗实例
const morePopup = ref<popup>();
// 储存更多操作需要的数据
const userInfo = ref({ nickName: "", comment: "", id: "" });
// 点击右侧...图标获取更多操作
const moreOperate = (nickName: string, comment: string, id: string) => {
  morePopup.value?.open();
  userInfo.value.nickName = nickName;
  userInfo.value.comment = comment;
  userInfo.value.id = id;
};
// 关闭更多组件弹窗
const closeMorePopup = () => {
  morePopup.value?.close();
};

// 填写备注对话框实例
const notePopup = ref<popup>();

// 获取用户备注
const userNote = ref<noteResult>({
  id: "",
  note: "",
  userId: "",
  userNoteId: "",
});
const userNoteNickName = ref("");
const getUserNote = async (userInfo: moreUserData) => {
  notePopup.value?.open();
  userNoteNickName.value = userInfo.nickName;
  const res = await getUserNoteAPI(userInfo.id);
  if (res.data) {
    userNote.value = res.data;
  } else {
    userNote.value.userNoteId = userInfo.id;
    userNote.value.note = userInfo.nickName;
  }
  morePopup.value?.close();
};

const notePopupClose = () => {
  notePopup.value?.close();
};

// 创建或者修改用户备注
const changeNoteValue = (newValue: string) => {
  userNote.value.note = newValue;
};
const notePopupConfirm = async () => {
  await createOrUpdateUserNoteAPI(
    userNote.value.userNoteId,
    userNote.value.note
  );
  getUserDataList();
};

// 判断该用户是否为该组成员
const isGroupMember = (id: string, groupMembers: groupMemberResult[]) => {
  return groupMembers.some((member) => member.id === id);
};

// 分组弹窗实例
const groupPopup = ref<popup>();
// 获取分组信息
const genGroupInfo = async (memberId: string) => {
  const res = await getUserGroupListAPI();
  userGroupList.value = res.data;
  userGroupList.value.forEach((item) => {
    // 判断该用户在每个组是否为存在,其实要么在一个组存在,要么不存在
    item.isMember = isGroupMember(memberId, item.groupMemberVOList);
  });
};
const userGroupList = ref<userGroupResult[]>([]);
const memberId = ref("0"); // 成员id
const getGroupInfo = async (userInfo: moreUserData) => {
  groupPopup.value?.open();
  memberId.value = userInfo.id;
  genGroupInfo(userInfo.id);
  console.log(userGroupList.value);
  morePopup.value?.close();
};

const groupName = ref("");

// 获取最新输入框的值
const onChangeGroupNameValue = async (newValue: string) => {
  groupName.value = newValue;
};

const groupNamePopupConfirm = async (memberId: string) => {
  await addUserGroupAPI(groupName.value);
  groupName.value = "";
  genGroupInfo(memberId);
  uni.showToast({ title: "新建分组成功", icon: "success" });
};

// 修改或者新增用户分组成员
const insertOrChangeGroupMember = async (id: string, memberId: string) => {
  await insertOrChangeMemberToGroupAPI(id, memberId);
  genGroupInfo(memberId);
};

// 更多弹窗取消关注功能
const cancleFollow = (id: string) => {
  doFollow(id);
  morePopup.value?.close();
};
</script>
<template>
  <view :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <!-- 自定义导航栏 -->
    <uni-nav-bar left-icon="left" @clickLeft="returnMien">
      <view class="uni-nav-bar-content">
        <!-- 这里将 segmented-control 放在导航栏中 -->
        <uni-segmented-control
          :current="current"
          :values="tabItems"
          style-type="text"
          active-color="#191820"
          @clickItem="onClickItem"
          class="seg"
          inActiveColor="#717171"
        />
      </view>
    </uni-nav-bar>
  </view>
  <view class="query">
    <uni-easyinput
      prefixIcon="search"
      v-model="nickNameOrComment"
      placeholder="搜索用户备注或者名字"
      :inputBorder="false"
      trim="all"
      :styles="inputStyle"
      @change="onInputChange"
      @clear="onInputChange"
    ></uni-easyinput>
  </view>
  <view class="content">
    <view class="num">
      <view v-if="current === 0"> 我的朋友 ({{ userDataList.length }}人) </view>
      <view v-if="current === 1" class="follow">
        <view>我的关注 ({{ userDataList.length }}人)</view>
        <view class="sort" @tap="showSortPopup">
          <view style="margin-right: 10rpx">{{
            followSortStore.sort?.name
          }}</view>
          <uni-icons
            custom-prefix="iconfont"
            type="icon-paixu"
            size="16"
          ></uni-icons>
        </view>
      </view>
      <view v-if="current === 2"> 我的粉丝 ({{ userDataList.length }}人) </view>
    </view>
    <view class="user" v-for="item in userDataList" :key="item.id">
      <image class="img" :src="item.avatar" mode="scaleToFill" />
      <view class="user-info">
        <view class="nickName">{{
          item.comment ? item.comment : item.nickName
        }}</view>
        <view class="tags">4个作品为查看|看作品 ></view>
      </view>
      <view v-if="current !== 0" style="display: flex; align-items: center">
        <view
          :class="[
            'button',
            {
              'follow-button': item.isFollow,
            },
            {
              'no-follow-button': !item.isFollow,
            },
          ]"
          @tap="doFollow(item.id)"
          >{{ !item.isFollow ? "回关" : current === 2 ? "互相关注" : "已关注" }}
        </view>
        <uni-icons
          custom-prefix="iconfont"
          type="icon-24gf-ellipsis"
          size="20"
          class="more"
          @tap="moreOperate(item.nickName, item.comment, item.id)"
        >
        </uni-icons>
      </view>
    </view>
  </view>
  <!-- 关注排序弹窗 -->
  <SortPopup ref="sortPopup" @selectSort="selectSort" />
  <!-- 点击...图标的更多操作弹窗 -->
  <uni-popup
    ref="morePopup"
    type="bottom"
    is-mask-click
    background-color="#f3f3f3"
    borderRadius="20rpx 20rpx 20rpx 20rpx"
    mask-background-color="rgba(0,0,0,0.6)"
  >
    <MorePopup
      :current="current"
      :userInfo="userInfo"
      @closeMorePopup="closeMorePopup"
      @showNotePopup="getUserNote"
      @showGroupPopup="getGroupInfo"
      @cancleFollow="cancleFollow"
    />
  </uni-popup>
  <!-- 设置备注对话框 -->
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
        :userNoteNickName="userNoteNickName"
        :note="userNote.note"
        @changeNoteValue="changeNoteValue"
      />
    </uni-popup-dialog>
  </uni-popup>
  <!-- 分组弹窗 -->
  <uni-popup
    ref="groupPopup"
    type="bottom"
    is-mask-click
    background-color="#fff"
    borderRadius="20rpx 20rpx 20rpx 20rpx"
    mask-background-color="rgba(0,0,0,0.6)"
  >
    <GroupPopup
      :groupList="userGroupList"
      :memberId="memberId"
      @closeGroupPopup="groupPopup?.close()"
      :groupName="groupName"
      @onChangeGroupNameValue="onChangeGroupNameValue"
      @groupNamePopupConfirm="groupNamePopupConfirm"
      @changeGroupMember="insertOrChangeGroupMember"
    />
  </uni-popup>
</template>
<style lang="scss">
@import "@/static/query.css";
@import "@/static/iconfont.css";
.uni-nav-bar-content {
  margin: 0 auto;
  .seg {
    width: 500rpx;
    .segmented-control__item {
      width: 120rpx;
    }
  }
}
.content {
  width: 680rpx;
  margin: 0 auto;
  .num {
    margin-top: 40rpx;
    color: #888;
    font-size: 28rpx;
    .follow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sort {
        display: flex;
        font-family: MiSans Regular;
        font-size: 28rpx;
      }
    }
  }
  .user {
    display: flex;
    align-items: center;
    width: 100%;
    height: 160rpx;
    margin-top: 30rpx;
    .img {
      border-radius: 50%;
      width: 120rpx;
      height: 120rpx;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20rpx;
      width: 330rpx;
      .nickName {
        font-weight: 700;
        white-space: nowrap; /* 防止文本换行 */
        overflow: hidden; /* 隐藏超出部分 */
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        margin-bottom: 5rpx;
      }
      .tags {
        width: 260rpx;
        background-color: #e8e8ea;
        color: #747476;
        padding: 0 5rpx;
        border: 1px solid #e1e1e1;
        white-space: nowrap; /* 防止文本换行 */
        font-size: 24rpx;
        border-radius: 15rpx;
        overflow: hidden; /* 隐藏超出部分 */
        text-overflow: ellipsis; /* 超出部分显示省略号 */
        margin-top: 5rpx;
      }
    }
    .button {
      width: 140rpx;
      text-align: center;
      padding: 15rpx 0;
      margin: 0 25rpx 0 20rpx;
      border-radius: 20rpx;
    }
    .follow-button {
      background-color: #e8e8ea;
      color: #353535;
    }
    .no-follow-button {
      background-color: #ff2353;
      color: #fff;
    }
  }
}
</style>
