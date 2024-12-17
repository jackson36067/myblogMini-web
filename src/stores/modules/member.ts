import type { LoginProfile } from "@/types/user";
import { defineStore } from "pinia";
import { ref } from "vue";

// 定义 Store
export const useMemberStore = defineStore(
  "member",
  () => {
    // 会员信息
    const profile = ref<LoginProfile>();
    // 保存会员信息，登录时使用
    const setProfile = (val: LoginProfile) => {
      profile.value = val;
    };

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined;
    };

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
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
