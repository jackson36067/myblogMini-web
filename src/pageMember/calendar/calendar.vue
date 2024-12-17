<script setup>
import { getSignInfoAPI } from "@/apis/userSign";
import { useSignStore } from "@/stores/modules/sign";
import { onLoad, onReady } from "@dcloudio/uni-app";
import { onBeforeMount, onMounted, ref } from "vue";
const signStore = useSignStore();
function getDate(date) {
  if (!date) {
    date = new Date();
  }
  if (typeof date !== "object") {
    date = date.replace(/-/g, "/");
  }
  const dd = new Date(date);

  const y = dd.getFullYear();
  const m =
    dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
  const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
  return {
    fullDate: y + "-" + m + "-" + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay(),
  };
}

const selected = ref([]);
const getSignList = async () => {
  const res = await getSignInfoAPI();
  // 清空数组并重新赋值 -> 确保 Vue 能检测到数据变化。
  selected.value = [];
  res.data.forEach((item) => {
    selected.value.push({
      date: getDate(item.signDate).fullDate,
      info: "已签到",
    });
  });
};
onMounted(() => {
  getSignList();
});

function change(e) {
  console.log("change 返回:", e);
}
</script>

<template>
  <view style="margin-left: 20rpx"
    >已经连续签到
    <strong style="display: inline; font-size: 55rpx; color: #f6b07e">{{
      signStore.sign.continuousSignInDays
    }}</strong>
    天还有
    <strong style="display: inline; font-size: 55rpx; color: #519c4a">0</strong>
    次补签机会
  </view>
  <view style="margin-left: 20rpx; font-size: 24rpx; color: #999"
    >连续签到可以获取对应天数的积分,最高可以获取<span style="color: red"
      >30</span
    >积分</view
  >
  <view
    style="
      margin: 0 auto;
      margin-top: 60rpx;
      width: calc(100% - 40rpx);
      border-radius: 15rpx;
      overflow: hidden;
    "
  >
    <!-- 插入模式 -->
    <uni-calendar
      class="uni-calendar--hook"
      :selected="selected"
      :showMonth="true"
      @change="change"
    />
  </view>
</template>
<style>
page {
  background-color: #f1f1f1;
}
</style>
