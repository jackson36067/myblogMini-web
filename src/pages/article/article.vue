<script setup lang="ts">
import { getArticleLikeAPI, getMyArticleAPI } from "@/apis/article";
import Article from "@/components/article.vue";
import type { articleInfo } from "@/types/article";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const title = defineProps<{ params: string }>();

const articleList = ref<articleInfo[]>([]);
const getLikeArticleList = async () => {
  const res = await getArticleLikeAPI();
  articleList.value = res.data;
};

const getMyArticleList = async () => {
  const res = await getMyArticleAPI();
  articleList.value = res.data;
};

onLoad(() => {
  if (title.params === "我的点赞") {
    getLikeArticleList();
  } else if (title.params === "我的资源") {
    getMyArticleList();
  }
  uni.setNavigationBarTitle({ title: title.params });
});
</script>

<template>
  <view class="content">
    <Article :list="articleList" />
  </view>
</template>

<style lang="scss">
@import "@/static/iconfont.css";
page {
  background-color: #f1f1f1;
}
.content {
  margin-top: 30rpx;
}
</style>
