import type { LoginProfile } from "@/types/user";
import type { signResult } from "@/types/userSign";
import { defineStore } from "pinia";
import { ref } from "vue";

// 定义 Store
export const useSignStore = defineStore(
  "sign",
  () => {
    // 会员信息
    const sign = ref<signResult>({ continuousSignInDays: 0 });
    // 保存会员信息，登录时使用
    const setContinuousSignInDays = (continuousSignInDays: number) => {
      sign.value!.continuousSignInDays = continuousSignInDays;
    };

    // 记得 return
    return {
      sign,
      setContinuousSignInDays,
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
