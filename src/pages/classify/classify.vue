<script setup lang="ts">
import { getClassifyDetailAPI } from "@/apis/classify";
import MyArticle from "@/components/myArticle.vue";
import type { articleInfo } from "@/types/article";
import type { classifyDetailResult } from "@/types/classify";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
// 获取路径参数
const queryParams = defineProps<{
  id: string;
}>();
const classifyDetail = ref({} as classifyDetailResult);
const articleList = ref<articleInfo[]>([]);
const getClassifyDetail = async () => {
  const res = await getClassifyDetailAPI(queryParams.id);
  classifyDetail.value = res.data;
  articleList.value = res.data.articlePageVOList;
  uni.setNavigationBarTitle({ title: res.data.type + "类文章" });
};
onLoad(() => {
  getClassifyDetail();
});
</script>

<template>
  <view class="content">
    <MyArticle :list="articleList" />
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
