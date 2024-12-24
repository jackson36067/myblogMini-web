<script setup lang="ts">
import { getAllClassifyAPI } from "@/apis/classify";
import type { classifyResult } from "@/types/classify";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import FunctionSkeleton from "./component/functionSkeleton.vue";

// 生成随机的渐变色
function getRandomGradient(): string {
  // 生成随机颜色（RGB 格式）
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 156) + 100; // 100-255之间，避免过暗
    const g = Math.floor(Math.random() * 156) + 100;
    const b = Math.floor(Math.random() * 156) + 100;
    return `rgb(${r}, ${g}, ${b})`;
  };
  // 随机生成渐变方向
  const directions = [
    "to right",
    "to left",
    "to bottom",
    "to top",
    "to bottom right",
    "to top left",
  ];
  const randomDirection =
    directions[Math.floor(Math.random() * directions.length)];

  // 两个随机颜色（确保渐变对比度好看）
  const color1 = getRandomColor();
  const color2 = getRandomColor();

  // 返回完整的线性渐变 CSS 字符串
  return `linear-gradient(${randomDirection}, ${color1}, ${color2})`;
}

const calssifyList = ref<classifyResult[]>([]);
const getClassifyList = async () => {
  const res = await getAllClassifyAPI();
  calssifyList.value = res.data;
  // 给每个 item 添加背景色
  calssifyList.value = calssifyList.value.map((item) => ({
    ...item,
    background: getRandomGradient(),
  }));
};
const isLoading = ref(true);
onLoad(async () => {
  await getClassifyList();
  isLoading.value = false;
});
</script>

<template>
  <FunctionSkeleton v-if="isLoading" />
  <template v-else>
    <view class="article">文章分类</view>
    <view class="classify">
      <navigator
        class="item"
        v-for="item in calssifyList"
        :key="item.id"
        :style="{
          background: item.background,
        }"
        hover-class="none"
        :url="`/pages/classify/classify?id=${item.id}`"
      >
        <view class="type">
          <span style="font-size: 46rpx">{{ item.type[0] }}</span
          >{{ item.type.slice(1) }}</view
        >
        <uni-icons
          class="icon"
          :type="item.icon"
          custom-prefix="iconfont"
          size="40"
        />
      </navigator>
    </view>
  </template>
</template>
<style lang="scss">
@import "@/static/iconfont.css";
page {
  background-color: #f1f1f1;
}
.article {
  font-size: 50rpx;
  margin: 40rpx 0 0 40rpx;
  font-weight: 700;
  color: #fd1d4a;
}
.classify {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 40rpx 20rpx 0 20rpx;
  .item {
    width: 350rpx;
    height: 150rpx;
    margin-top: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;
    padding: 43rpx 20rpx;
    box-sizing: border-box;
    .type {
      float: left;
      font-size: 25rpx;
    }
    .icon {
      float: right;
    }
  }
}
</style>
