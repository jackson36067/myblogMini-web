<script setup lang="ts">
import "highlight.js/styles/atom-one-dark.css"; // 可以选择你喜欢的高亮样式
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
