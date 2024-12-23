<script setup lang="ts">
import { useFollowSortStore } from "@/stores/modules/followSort";
import type { sortItemResult } from "@/types/social";
import { ref } from "vue";

const followSortStore = useFollowSortStore();
const sortPopupVisible = ref(false);

const updateSortPopupVisible = () => {
  sortPopupVisible.value = !sortPopupVisible.value;
};
defineExpose({
  updateSortPopupVisible,
});

const sortItem = ref<sortItemResult[]>([
  {
    name: "最近关注",
    sort: 0,
  },
  {
    name: "最早关注",
    sort: 1,
  },
]);
const emit = defineEmits<{
  (event: "selectSort", sortItem: sortItemResult): void;
}>();
const selectItem = (item: sortItemResult) => {
  sortPopupVisible.value = false;
  emit("selectSort", item);
};
</script>

<template>
  <uni-transition
    :styles="{ borderRadius: '15rpx' }"
    :mode-class="['fade', 'zoom-in']"
    :show="sortPopupVisible"
  >
    <view class="dropdown-container">
      <view
        class="dropdown-menu"
        v-for="(item, index) in sortItem"
        :key="index"
      >
        <view class="dropdown-item" @tap="selectItem(item)">{{
          item.name
        }}</view>
        <uni-icons
          v-if="followSortStore.sort.sort === item.sort"
          type="checkmarkempty"
          size="26"
          color="#f8486f"
        ></uni-icons>
      </view>
    </view>
  </uni-transition>
</template>
<style lang="scss">
.dropdown-container {
  position: fixed;
  top: -160rpx;
  right: 35rpx;
  width: 230rpx;
  height: 181rpx;
  z-index: 1000;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 15rpx;
  .dropdown-menu {
    display: flex;
    width: 100%; // 宽度保持为 100%
    height: 90rpx;
    line-height: 80rpx;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
    .dropdown-item {
      padding: 0 30rpx; // 将 10px 转换为 20rpx
      font-size: 28rpx;
      color: #191820;
    }
  }
  // 尖角
  &::before {
    content: ""; /* 必须有内容 */
    position: absolute;
    top: -20rpx; /* 将三角形放到盒子顶部 */
    left: 50%; /* 水平居中 */
    border-left: 20rpx solid transparent; /* 左侧透明 */
    border-right: 20rpx solid transparent; /* 右侧透明 */
    border-bottom: 20rpx solid #fff; /* 底部为盒子的背景色 */
  }
}
</style>
