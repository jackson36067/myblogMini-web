<script setup lang="ts">
import MyArticle from "@/components/myArticle.vue";
import type { articleInfo } from "@/types/article";
import { onLoad } from "@dcloudio/uni-app";
import { getArticleBrowseHistoryAPI } from "@/apis/article";
import { getUserBrowseHistoryAPI } from "@/apis/user";
import { deleteBrowseHistoryAPI } from "@/apis/history";
import { ref } from "vue";
import UserData from "@/components/userData.vue";
import type { userDataResult } from "@/types/social";

const current = ref(0);
const items = ["用户", "文章"];
// 文章列表
const articleList = ref<articleInfo[]>([]);
const getArticleBrowseHistory = async () => {
  const res = await getArticleBrowseHistoryAPI();
  articleList.value = res.data;
};
// 用户列表
const userList = ref<userDataResult[]>([]);
const getUserBrowseHistory = async () => {
  const res = await getUserBrowseHistoryAPI();
  userList.value = res.data;
};
onLoad(() => {
  getArticleBrowseHistory();
  getUserBrowseHistory();
});
const onClickItem: UniHelper.UniSegmentedControlOnClickItem = (event) => {
  current.value = event.currentIndex;
};
const deleteBrowseHistory = () => {
  uni.showModal({
    title: "",
    content: "确定清空记录吗",
    showCancel: true,
    success: async ({ confirm }) => {
      if (confirm) {
        await deleteBrowseHistoryAPI(current.value);
        uni.showToast({ title: "清空记录成功", position: "top" });
        // 更新数据
        if (current.value === 0) {
          getUserBrowseHistory();
        } else if (current.value === 1) {
          getArticleBrowseHistory();
        }
      }
    },
  });
};
</script>
<template>
  <view class="history">
    <uni-segmented-control
      :current="current"
      :values="items"
      @clickItem="onClickItem"
      styleType="text"
      activeColor="#1d1c23"
      inActiveColor="#737373"
      style="display: inline-block; width: 90%"
    >
    </uni-segmented-control>
    <uni-icons
      type="icon-shanchu"
      size="20"
      custom-prefix="iconfont"
      style="display: inline-block; width: 10%"
      @tap="deleteBrowseHistory"
    />
    <!-- 展示历史用户浏览记录 -->
    <view v-show="current === 0" style="margin-top: 30rpx">
      <UserData :list="userList" :current="1" />
    </view>
    <!-- 展示历史文章浏览记录 -->
    <view v-show="current === 1" style="margin-top: 30rpx">
      <MyArticle :list="articleList" />
    </view>
  </view>
</template>

<style lang="scss">
@import "@/static/iconfont.css";
</style>
