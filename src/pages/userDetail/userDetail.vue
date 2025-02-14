<script setup lang="ts">
import { ref } from "vue";
import { getUserDetailDataAPI } from "@/apis/user";
import { getUserDetailArticleAPI } from "@/apis/article";
import { onLoad } from "@dcloudio/uni-app";
import type { userDetailData } from "@/types/user";
import type { popup } from "@/types/component";
import MorePopup from "@/pages/social/component/MorePopup.vue";
import type { noteResult } from "@/types/note";
import type { moreUserData } from "@/types/social";
import { createOrUpdateUserNoteAPI, getUserNoteAPI } from "@/apis/note";
import NoteDialogPopup from "../social/component/NoteDialogPopup.vue";
import type { articleInfo } from "@/types/article";
import MyArticle from "@/components/myArticle.vue";

const pathParams = defineProps<{
  id: string;
}>();
const { safeAreaInsets } = uni.getSystemInfoSync();
const userDetailData = ref<userDetailData>({
  id: "",
  avatar: "",
  nickName: "",
  comment: "",
  totalLike: 0,
  totalFans: 0,
  totalFollow: 0,
  isFollow: false,
  isMutualAttention: false,
});
const getUserDetailData = async () => {
  const res = await getUserDetailDataAPI(pathParams.id);
  userDetailData.value = res.data;
};
onLoad(() => {
  getUserDetailData();
});

const goBack = () => {
  uni.navigateBack({ delta: 1 });
};

const current = ref(1);

const morePopup = ref<popup>();
const showMorePopup = () => {
  morePopup.value?.open();
};
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
const isMorePopupShow = ref(false);
const onMorePopupChange: UniHelper.UniPopupOnChange = (event) => {
  isMorePopupShow.value = event.show;
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
  getUserDetailData();
};

const articleTypeCurrent = ref(0);
const userDetailArticle = ref<articleInfo[]>([]);
const getUserDetailArticle = async () => {
  const res = await getUserDetailArticleAPI(
    pathParams.id,
    articleTypeCurrent.value
  );
  userDetailArticle.value = res.data;
};
onLoad(() => {
  getUserDetailArticle();
});
const userTabItems = ref(["他的作品", "他的喜欢"]);
const onClickItem: UniHelper.UniSegmentedControlOnClickItem = (event) => {
  articleTypeCurrent.value = event.currentIndex;
  userDetailArticle.value = [];
  getUserDetailArticle();
};
</script>

<template>
  <view class="userDetail">
    <view :style="{ paddingTop: safeAreaInsets?.top + 'px' }" class="basic">
      <view
        class="back"
        :style="{ top: safeAreaInsets?.top + 'px' }"
        @tap="goBack"
      >
        <uni-icons
          custom-prefix="iconfont"
          type="icon-zuojiantou-cu"
          size="24"
          color="#ccc"
        ></uni-icons>
      </view>
      <view class="basic_info">
        <view class="avatar">
          <image :src="userDetailData.avatar" mode="scaleToFill" class="img" />
        </view>
        <!-- 备注或者用户名 -->
        <view>{{
          userDetailData.comment
            ? userDetailData.comment
            : userDetailData.nickName
        }}</view>
      </view>
    </view>

    <view class="sum_data">
      <view class="num_daat">
        <view class="likeNum right">{{ userDetailData.totalLike }}</view>
        <text>获赞</text>
      </view>
      <view class="num_daat">
        <view class="followNum right">{{ userDetailData.totalFollow }}</view>
        <text>关注</text>
      </view>
      <view class="num_daat">
        <view class="fanNum right">{{ userDetailData.totalFans }}</view>
        <text>粉丝</text>
      </view>
    </view>
    <view class="relationship" v-if="userDetailData.isMutualAttention">
      <uni-icons
        custom-prefix="iconfont"
        type="icon-yonghuzu"
        size="24"
        color="#191722"
        class="icon"
      />
      <text>他是你的朋友</text>
    </view>

    <view class="relation_solution">
      <view v-if="userDetailData.isMutualAttention" class="info">
        <view class="button" @tap="showMorePopup">
          <view>互相关注</view>
          <uni-icons
            custom-prefix="iconfont"
            :type="!isMorePopupShow ? 'icon-sanjiaoxing' : 'icon-triangle-fill'"
            size="12"
          />
        </view>
        <view class="button">
          <uni-icons
            custom-prefix="iconfont"
            type="icon-fasong1"
            size="24"
            color="#18171f"
          />
          <navigator
            :url="`/pages/chat/chat?id=${userDetailData.id}`"
            hover-class="none"
          >
            发私信
          </navigator>
        </view>
      </view>
      <view v-else-if="userDetailData.isFollow" class="info">
        <view class="button" @tap="showMorePopup">
          <view class="button">
            <view>已关注</view>
            <uni-icons
              custom-prefix="iconfont"
              :type="
                !isMorePopupShow ? 'icon-sanjiaoxing' : 'icon-triangle-fill'
              "
              size="12"
            />
          </view>
        </view>
        <view class="button">
          <uni-icons
            custom-prefix="iconfont"
            type="icon-fasong1"
            size="24"
            color="#18171f"
          />
          <navigator
            :url="`/pages/chat/chat?id=${userDetailData.id}`"
            hover-class="none"
          >
            发私信
          </navigator>
        </view>
      </view>
      <view v-else class="not_follow_button">
        <view>关注</view>
        <uni-icons
          custom-prefix="iconfont"
          type="icon-jiahao"
          size="20"
          color="#fff"
        />
      </view>
      <view class="more">
        <uni-icons custom-prefix="iconfont" type="icon-sanjiaoxing" size="12" />
      </view>
    </view>
    <view class="seg">
      <view>
        <uni-segmented-control
          :current="articleTypeCurrent"
          :values="userTabItems"
          @clickItem="onClickItem"
          styleType="text"
          activeColor="#38373f"
          inActiveColor="#737373"
        ></uni-segmented-control>
        <view class="content" v-if="userDetailArticle.length">
          <view class="article">
            <MyArticle :list="userDetailArticle" />
          </view>
        </view>
        <view v-else class="none">暂时没有更多数据</view>
      </view>
    </view>
  </view>

  <uni-popup ref="morePopup" type="bottom" @change="onMorePopupChange">
    <MorePopup
      :current="current"
      :userInfo="{
        id: userDetailData.id,
        nickName: userDetailData.nickName,
        comment: userDetailData.comment,
      }"
      @close-more-popup="closeMorePopup"
      @show-note-popup="getUserNote"
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
</template>

<style lang="scss">
@import "@/static/iconfont.css";
.userDetail {
  width: 100%;

  .basic {
    position: relative;
    background: linear-gradient(to bottom, #a2cce2, #0e7fc7);
    width: 100%;
    height: 400rpx;
    z-index: 1; /* 设置较低的层级 */

    .back {
      position: absolute;
      left: 30rpx;
      width: 80rpx;
      height: 80rpx;
      text-align: center;
      line-height: 80rpx;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
    }

    .basic_info {
      display: flex;
      align-items: center;
      position: absolute;
      top: 230rpx;
      left: 30rpx;

      .avatar {
        width: 150rpx;
        height: 150rpx;
        margin-right: 40rpx;

        .img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }

  .sum_data {
    display: flex;
    position: relative;
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    border-radius: 35rpx;
    margin-top: -50rpx;
    padding: 0rpx 0 0 30rpx;
    z-index: 2;
    box-sizing: border-box;
    .num_daat {
      display: flex;
      align-items: center;
      width: 20%;
      height: 100%;

      .right {
        color: #1d1c23;
        margin-right: 10rpx;
        font-size: 44rpx;
        font-weight: 700;
      }

      text {
        color: #747474;
        font-size: 28rpx;
      }
    }
  }

  .relationship {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60rpx;
    padding-left: 30rpx;
    .icon {
      margin-right: 20rpx;
    }
  }

  .relation_solution {
    display: flex;
    padding: 0 30rpx;
    margin-top: 15rpx;
    .info {
      display: flex;
      .button {
        display: flex;
        justify-content: center;
        gap: 10rpx;
        align-items: center;
        width: 290rpx;
        height: 80rpx;
        background-color: #f1f1f1;
        color: #191722;
        border-radius: 15rpx;
        margin-right: 15rpx;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .more {
      width: 90rpx;
      height: 80rpx;
      background-color: #f1f1f1;
      border-radius: 15rpx;
      text-align: center;
      line-height: 80rpx;
      margin-left: 15rpx;
    }
    .not_follow_button {
      display: flex;
      justify-content: center;
      gap: 10rpx;
      align-items: center;
      width: 575rpx;
      height: 80rpx;
      background-color: #ff2353;
      color: #fff;
      border-radius: 15rpx;
    }
  }
  .seg {
    margin-top: 40rpx;
    .content {
      .article {
        height: 100rpx;
      }
    }
    .none {
      height: 400rpx;
      width: 100%;
      text-align: center;
      color: #737373;
      line-height: 400rpx;
      font-size: 32rpx;
    }
  }
}
</style>
