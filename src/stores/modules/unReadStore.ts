import { defineStore } from "pinia";
import { ref } from "vue";

// 定义 Store
export const useUnReadMessageStore = defineStore(
  "unread",
  () => {
    // 为读信息
    const totalUnreadMessage = ref<number>(0);
    // 保存未读信息
    const setTotalUnReadMessage = (totalUnreadMessages: number) => {
      totalUnreadMessage.value = totalUnreadMessages;
    };
    const clearUnReadMessage = () => {
      totalUnreadMessage.value = 0;
    };
    // // 删除某个发送者的未读信息
    // const readSenderMessage = (senderId: string) => {
    //   const index = unreadMessage.value.findIndex((item) => {
    //     return (item.senderId = senderId);
    //   });
    //   unreadMessage.value[index].unReadMessageNumber = 0;
    // };
    // 接收到某个发送者的新信息
    // const receiverNewMessage = (senderId: string) => {
    //   unreadMessage.value.find((item) => {
    //     if (item.senderId == senderId) {
    //       item.unReadMessageNumber += 1;
    //     }
    //   });
    // };
    // 记得 return
    return {
      totalUnreadMessage,
      setTotalUnReadMessage,
      clearUnReadMessage,
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
