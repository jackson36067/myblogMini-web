<script setup lang="ts">
import { getArticleLikeAPI, getMyArticleAPI } from "@/apis/article";
import MyArticle from "@/components/myArticle.vue";
import type { articleInfo } from "@/types/article";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const title = defineProps<{ params: string }>();

// tab默认选中标签
const current = ref(0);
// tab栏item内容
const tabItems = ref<string[]>(["已展示", "未展示"]);
// 搜索框值
const queryParams = ref("");

const articleList = ref<articleInfo[]>([]);
const getLikeArticleList = async () => {
  const res = await getArticleLikeAPI(queryParams?.value);
  articleList.value = res.data;
};

const getMyArticleList = async () => {
  const res = await getMyArticleAPI(current.value, queryParams?.value);
  articleList.value = res.data;
};

const getArticle = () => {
  if (title.params === "我的点赞") {
    getLikeArticleList();
  } else if (title.params === "我的资源") {
    getMyArticleList();
  }
};

onLoad(() => {
  getArticle();
  uni.setNavigationBarTitle({ title: title.params });
});

const inputStyle: UniHelper.UniEasyinputStyles = {
  color: "",
  borderColor: "",
  backgroundColor: "#f7f7f7",
  disableColor: "",
};

// 点击tab栏切换内容
const onClickItem: UniHelper.UniSegmentedControlOnClickItem = (event) => {
  current.value = event.currentIndex;
  articleList.value = [];
  getMyArticleList();
};

const onArticleTitleChange = () => {
  getArticle();
};
const doGetAllArticle = () => {
  getArticle();
};
</script>

<template>
  <view class="content">
    <view class="query">
      <view class="input">
        <uni-easyinput
          prefixIcon="search"
          v-model="queryParams"
          placeholder="搜索你想要的文章"
          :inputBorder="false"
          trim="all"
          :styles="inputStyle"
          @clear="doGetAllArticle"
        >
        </uni-easyinput>
      </view>
      <button @tap="onArticleTitleChange">搜索</button>
    </view>
    <view
      class="uni-padding-wrap uni-common-mt"
      v-if="title.params === '我的资源'"
    >
      <uni-segmented-control
        :current="current"
        :values="tabItems"
        style-type="text"
        active-color="#edbe95"
        @clickItem="onClickItem"
        class="seg"
      />
    </view>
    <view class="border"></view>
    <MyArticle :list="articleList" />
  </view>
</template>

<style lang="scss">
@import "@/static/iconfont.css";
page {
  background-color: #fcfeff;
}
.content {
  margin-top: 30rpx;
  .query {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    .input {
      width: 540rpx;
      height: 50rpx;
      background-color: #fff;
      box-sizing: border-box;
      padding-left: 15rpx;
      margin-left: 10rpx;
      border-radius: 20rpx;
      text-align: center;
      background-color: #f7f7f7;
      font-size: 26rpx;
      overflow: hidden;
    }
    button {
      width: 150rpx;
      height: 50rpx;
      font-size: 26rpx;
      line-height: 50rpx;
      border-radius: 20rpx;
      background-color: #0383ff;
      color: #fff;
    }
  }
  .border {
    width: 100%;
    height: 2rpx;
    background-color: #f2f2f2;
    margin-top: 5rpx;
  }
}
</style>
