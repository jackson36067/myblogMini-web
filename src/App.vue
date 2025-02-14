<script setup lang="ts">
import "highlight.js/styles/atom-one-dark.css"; // 可以选择你喜欢的高亮样式
import { onShow, onUnload } from "@dcloudio/uni-app";
import { useUnReadMessageStore } from "./stores/modules/unReadStore";
import { watch } from "vue";
import { onMounted } from "vue";

onUnload(() => {
  uni.onSocketClose((result) => {
    console.log(result);
  });
});
const unReadMessageStore = useUnReadMessageStore();
const judgeTotalCount = () => {
  const unreadCount = unReadMessageStore.totalUnreadMessage;
  if (unreadCount > 0) {
    uni.setTabBarBadge({
      index: 2, // 你的 tabBar 索引
      text: unreadCount.toString(), // 必须是字符串
    });
  } else {
    uni.removeTabBarBadge({ index: 2 }); // 清除角标
  }
};
// 获取未读信息量
const getTotalUnReadMessageFun = () => {
  judgeTotalCount();
};
onShow(() => {
  getTotalUnReadMessageFun();
});
onMounted(() => {
  getTotalUnReadMessageFun();
});

watch(
  () => unReadMessageStore.totalUnreadMessage,
  () => {
    judgeTotalCount();
  }
);
</script>
<style></style>
