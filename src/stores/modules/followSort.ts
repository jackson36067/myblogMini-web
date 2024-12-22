import type { sortItemResult } from "@/types/social";
import type { LoginProfile } from "@/types/user";
import { defineStore } from "pinia";
import { ref } from "vue";

// 定义 Store
export const useFollowSortStore = defineStore(
  "sort",
  () => {
    // 会员信息
    const sort = ref<sortItemResult>({ sort: 0, name: "最近关注" });
    // 保存会员信息，登录时使用
    const setNewSort = (sortItem: sortItemResult) => {
      sort.value = sortItem;
    };

    // 记得 return
    return {
      sort,
      setNewSort,
    };
  },
  // TODO: 持久化
  {
    // 只能在网页端配置持久化
    // persist: true,
    // 小程序端配置
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key);
        },
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
      },
    },
  }
);
