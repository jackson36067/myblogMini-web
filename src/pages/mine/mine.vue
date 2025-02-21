<script setup lang="ts">
import { getUserInfoAPI } from "@/apis/user";
import { doSignAPI } from "@/apis/userSign";
import { useMemberStore } from "@/stores";
import { useSignStore } from "@/stores/modules/sign";
import type { category, popup } from "@/types/component";
import type { UserInfo } from "@/types/user";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import LikePopup from "./component/LikePopup.vue";
import MineSkeleton from "./component/mineSkeleton.vue";

const memberStore = useMemberStore();
const signStore = useSignStore();

type own = { name: string; num: number };
const ownList = ref<own[]>([
  {
    name: "点赞",
    num: 1,
  },
  {
    name: "朋友",
    num: 0,
  },
  {
    name: "关注",
    num: 1,
  },
  {
    name: "粉丝",
    num: 0,
  },
]);

// 点击点赞获取popup弹窗
const likePopup = ref<popup>();
const doSocialAction = (name: string) => {
  if (name === "点赞") {
    likePopup.value?.open();
  }
  if (name === "朋友") {
    uni.navigateTo({ url: `/pages/social/SocialSegmented?current=${0}` });
  }
  if (name === "关注") {
    uni.navigateTo({ url: `/pages/social/SocialSegmented?current=${1}` });
  }
  if (name === "粉丝") {
    uni.navigateTo({ url: `/pages/social/SocialSegmented?current=${2}` });
  }
};
// 关闭弹窗
const doCloseLikePopup = () => {
  likePopup.value?.close();
};

const categoryList = ref<category[]>([
  {
    icon: "icon-shoucang",
    title: "我的收藏",
    color: "#f57d1f",
    url: `/pages/article/article?params=${"我的收藏"}`,
  },
  {
    icon: "icon-aixin",
    title: "我的点赞",
    color: "#e54d41",
    url: `/pages/article/article?params=${"我的点赞"}`,
  },
  {
    icon: "icon-r",
    title: "我的资源",
    color: "#e2c12f",
    url: `/pages/article/article?params=${"我的资源"}`,
  },
  {
    icon: "icon-shopping",
    title: "我的积分",
    color: "#df7a25",
    url: "",
  },
]);

const userInfo = ref<UserInfo>({
  id: "",
  points: 0,
  isSignIn: false,
  totalLike: 0,
  totalFriend: 0,
  totalFollow: 0,
  totalFans: 0,
});
const getUserInfo = async () => {
  const res = await getUserInfoAPI();
  userInfo.value = res.data;
  // 规定
  ownList.value[0].num = res.data.totalLike;
  ownList.value[1].num = res.data.totalFriend;
  ownList.value[2].num = res.data.totalFollow;
  ownList.value[3].num = res.data.totalFans;
};
const isLoading = ref(true);
onLoad(async () => {
  await getUserInfo();
  isLoading.value = false;
});

const doSign = async () => {
  const res = await doSignAPI();
  signStore.sign!.continuousSignInDays = res.data.continuousSignInDays;
  console.log(res.data.continuousSignInDays);
  uni.showToast({
    title: "签到成功",
    icon: "success",
  });
  getUserInfo();
};

// 跳转到签到日历详情页
const toCalendar = () => {
  uni.navigateTo({ url: "/pageMember/calendar/calendar" });
};

const itemList = ref<category[]>([
  {
    icon: "icon-pinglun1",
    title: "评论管理",
    color: "#9edfb8",
    url: `/pages/mine/mine`,
  },
  {
    icon: "icon-editor",
    title: "发布文章",
    color: "#B6A9E9",
    url: "/pageMember/writeArticle/writeArticle",
  },
  {
    icon: "icon-fenlei",
    title: "类别管理",
    color: "#CDBE9B",
    url: `/pages/mine/mine`,
  },
  {
    icon: "icon-biaoqian",
    title: "标签管理",
    color: "#E5A3A3",
    url: `/pages/mine/mine`,
  },
  {
    icon: "icon-yonghuzu",
    title: "分组管理",
    color: "#666666",
    url: "/pageMember/followGroup/followGroup",
  },
  {
    icon: "icon-lishi",
    title: "历史观看",
    color: "skyblue",
    url: "/pages/history/history",
  },
  {
    icon: "icon-lahei",
    title: "黑名单管理",
    color: "#fd3c13",
    url: "",
  },
]);
</script>
<template>
  <MineSkeleton v-if="isLoading" />
  <template v-else>
    <view class="info" v-if="memberStore.profile?.id">
      <image
        class="avatar gray"
        mode="aspectFill"
        :src="memberStore.profile.avatar"
      ></image>
      <view class="meta">
        <view class="nickname">
          {{ memberStore.profile.nickName }}
        </view>
        <view class="extra">
          <text class="tips" style="color: #e3b194"
            >积分: {{ userInfo?.points }}</text
          >
        </view>
      </view>
      <view class="chevron-right">
        <navigator
          url="/pageMember/userInfo/userInfo"
          open-type="navigate"
          hover-class="none"
        >
          <uni-icons
            custom-prefix="iconfont"
            type="icon-chevron-right"
            size="16"
          ></uni-icons>
        </navigator>
      </view>
    </view>
    <!-- 未登录 -->
    <view class="info" v-else>
      <navigator url="/pages/login/login" hover-class="none">
        <image
          class="avatar gray"
          mode="aspectFill"
          src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png"
        ></image>
      </navigator>
      <view class="meta">
        <navigator url="/pages/login/login" hover-class="none" class="nickname">
          未登录
        </navigator>
        <view class="extra">
          <text class="tips">点击登录账号</text>
        </view>
      </view>
    </view>
    <view class="card" v-if="userInfo?.isSignIn" @tap="toCalendar">
      <span class="span"
        >已连续签到
        <strong class="strong">{{
          signStore.sign?.continuousSignInDays
        }}</strong>
        天</span
      >
      <button class="button">今日已签到</button>
    </view>
    <view class="card" v-else>
      <span class="span">今日还未签到 </span>
      <button class="button" @tap="doSign">点击签到</button>
    </view>
    <view class="own">
      <view
        class="own-list"
        v-for="(item, index) in ownList"
        :key="index"
        @tap="doSocialAction(item.name)"
      >
        <view class="number">{{ item.num }}</view>
        <view class="name">{{ item.name }}</view>
      </view>
    </view>
    <!-- 总点赞弹窗 -->
    <uni-popup
      ref="likePopup"
      type="center"
      background-color="#fff"
      is-mask-click
      mask-background-color="rgba(0,0,0,0.4)"
    >
      <LikePopup
        :nickName="memberStore.profile!.nickName"
        :totalLike="ownList[0].num"
        @closeLikePopup="doCloseLikePopup"
      />
    </uni-popup>
    <view class="category">
      <navigator
        class="category-item"
        hover-class="none"
        v-for="(item, index) in categoryList"
        :key="index"
        :url="item.url"
      >
        <uni-icons
          custom-prefix="iconfont"
          :type="item.icon"
          size="30"
          :color="item.color"
        ></uni-icons>
        <text class="text">{{ item.title }}</text>
      </navigator>
    </view>
    <view class="content">
      <navigator
        v-for="(item, index) in itemList"
        :key="index"
        class="list-item"
        :url="item.url"
        open-type="navigate"
        hover-class="none"
      >
        <!-- 左侧图标 -->
        <view class="icon-wrapper">
          <uni-icons
            custom-prefix="iconfont"
            :type="item.icon"
            size="22"
            :color="item.color"
          ></uni-icons>
        </view>
        <!-- 中间标题文本 -->
        <view class="title">{{ item.title }}</view>
        <!-- 右侧箭头 -->
        <view class="arrow-wrapper">
          <uni-icons
            custom-prefix="iconfont"
            type="icon-chevron-right"
            size="20"
            color="#d8d8d8"
          ></uni-icons>
        </view>
      </navigator>
    </view>
  </template>
</template>
<style lang="scss">
@import "@/static/iconfont.css";
.info {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20rpx;
  padding: 0 20rpx;
  height: 120rpx;
  .avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 10%;
    background-color: #eee;
  }
  .meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 30rpx;
    padding: 16rpx 0;
    margin-left: 20rpx;
    .nickname {
      max-width: 350rpx;
      margin-bottom: 16rpx;
      font-size: 30rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .extra {
      display: flex;
      font-size: 20rpx;
    }
  }
  .chevron-right {
    margin-left: 400rpx;
  }
}
.card {
  box-sizing: border-box;
  width: calc(100% - 40rpx);
  height: 200rpx;
  line-height: 200rpx;
  background: linear-gradient(90deg, #ff8e88, #fd1d4a); /* 渐变色 */
  margin: 40rpx auto;
  border-radius: 25rpx;
  box-shadow: 0 8rpx 12rpx rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: white;
  font-size: 30rpx;
  padding: 0 20rpx;
  .span {
    float: left;
    display: block;
    .strong {
      display: inline;
      font-size: 70rpx;
    }
  }
  .button {
    float: right;
    background: white;
    color: #000;
    border: none;
    border-radius: 20rpx;
    padding: 5rpx 30rpx;
    margin-top: 75rpx;
    font-size: 25rpx;
    cursor: pointer;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2); /* 按钮阴影 */
  }
}
.own {
  display: flex;
  justify-content: space-around;
  padding-bottom: 20rpx;
  border-bottom: 4rpx solid #f3f3f3;
  .own-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 32rpx;
    .number {
      font-weight: 700;
    }
  }
}
.category {
  width: 680rpx;
  height: 110rpx;
  display: flex;
  margin: 60rpx auto;
  justify-content: space-between;
  align-items: center;
  .category-item {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .text {
      font-size: 26rpx;
    }
  }
}
.content {
  margin-top: 30rpx;
  border-top: 16rpx solid #f3f3f3;
  .list-item {
    display: flex;
    align-items: center;
    padding: 20rpx 30rpx;
    background-color: #ffffff;
    border-bottom: 1rpx solid #f0f0f0;

    .icon-wrapper {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;

      .icon {
        width: 48rpx;
        height: 48rpx;
      }
    }

    .title {
      flex: 1;
      font-size: 28rpx;
      color: #333333;
    }

    .arrow-wrapper {
      display: flex;
      align-items: center;
    }
  }
}
</style>
