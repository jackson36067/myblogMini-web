<script setup lang="ts">
import { ref } from "vue";
import type { _UniIconsCustomType } from "@uni-helper/uni-types/index";
import type { category, pageResult } from "@/types/conponent";
import type { articleInfo } from "@/types/article";
import { doLikeAPI, getArticleAPI } from "@/apis/article";
import { onLoad } from "@dcloudio/uni-app";
const swiperBanner = ref<string[]>([
  "https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg",
  "https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg",
]);

const activeIndex = ref(0);
// 当轮播图发生改变后触发
const swiperChange: UniHelper.SwiperOnChange = (event) => {
  // !非空断言
  activeIndex.value = event.detail!.current;
};
const categoryList = ref<category[]>([
  {
    icon: "icon-github",
    title: "开源项目",
    color: "#b945cc",
  },
  {
    icon: "icon-file",
    title: "面试刷题",
    color: "#de5e59",
  },
  {
    icon: "icon-r",
    title: "小程序",
    color: "#edc505",
  },
  {
    icon: "icon-shopping",
    title: "开源资源",
    color: "#df7a25",
  },
]);

const inputStyle: UniHelper.UniEasyinputStyles = {
  color: "",
  borderColor: "",
  backgroundColor: "",
  disableColor: "",
};

const articleTitle = ref("");

// tab默认选中标签
const current = ref(0);
// tab栏item内容
const tabItems = ref<string[]>(["最新", "热门", "标签"]);

// 文章内容
const page = ref(1);
const pageSize = ref(10);

const articleList = ref<articleInfo[]>([]);

const getArticleList = async () => {
  const res = await getArticleAPI(
    current.value,
    page.value,
    pageSize.value,
    articleTitle?.value
  );
  articleList.value = res.data.list;
};

onLoad(() => {
  getArticleList();
});

// 点击tab栏切换内容
const onClickItem: UniHelper.UniSegmentedControlOnClickItem = (event) => {
  current.value = event.currentIndex;
  page.value = 1;
  articleList.value = [];
  getArticleList();
};

// 点赞实现
const doLike = async (id: number) => {
  await doLikeAPI({ id });
  getArticleList();
};
</script>

<template>
  <view class="carousel">
    <swiper
      :circular="true"
      :autoplay="true"
      :interval="3000"
      @change="swiperChange"
    >
      <swiper-item v-for="(item, index) in swiperBanner" :key="index">
        <navigator
          url="/pages/index/index"
          hover-class="none"
          class="navigator"
        >
          <image mode="aspectFill" class="image" :src="item"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in swiperBanner.length"
        :key="item"
        :class="['dot', { active: index === activeIndex }]"
      ></text>
    </view>
  </view>
  <view class="category">
    <navigator
      class="category-item"
      hover-class="none"
      url="/pages/index/index"
      v-for="(item, index) in categoryList"
      :key="index"
    >
      <uni-icons
        custom-prefix="iconfont"
        :type="item.icon"
        size="30"
        :color="item.color"
      ></uni-icons>
      <text class="text">{{ item.title }}</text>
    </navigator>
  </view>
  <view class="query">
    <uni-easyinput
      prefixIcon="search"
      v-model="articleTitle"
      placeholder="搜索感兴趣的文章"
      :inputBorder="false"
      trim="all"
      :styles="inputStyle"
    ></uni-easyinput>
  </view>
  <view class="uni-padding-wrap uni-common-mt">
    <uni-segmented-control
      :current="current"
      :values="tabItems"
      style-type="text"
      active-color="#edbe95"
      @clickItem="onClickItem"
      class="seg"
    />
  </view>
  <view class="content">
    <view class="card-container" v-for="item in articleList" :key="item.id">
      <!-- 卡片图片 -->
      <image
        class="card-image"
        mode="aspectFill"
        :src="item.coverImage"
      ></image>
      <!-- 卡片内容区域 -->
      <view class="card-content">
        <text class="card-title">{{ item.author }}</text>
        <text class="card-description">
          {{ item.title }}
        </text>
        <view class="card-footer">
          <text class="date">{{ item.createTime }}</text>
          <view class="icons">
            <uni-icons
              class="icon"
              custom-prefix="iconfont"
              type="icon-guankan"
              size="20"
              color="#999"
            ></uni-icons>
            <text class="icon-text">{{ item.totalVisit }}</text>
            <uni-icons
              class="icon"
              custom-prefix="iconfont"
              :type="!item.isLike ? 'icon-aixin' : 'icon-aixin1'"
              size="20"
              :color="!item.isLike ? '#999' : 'red'"
              @tap="doLike(item.id)"
            ></uni-icons>
            <text class="icon-text" style="margin-left: 5rpx">{{
              item.totalLike
            }}</text>
            <uni-icons
              class="icon"
              custom-prefix="iconfont"
              type="icon-pinglun"
              size="20"
              color="#999"
            ></uni-icons>
            <text class="icon-text">{{ item.totalComment }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "@/static/iconfont.css";
/* 轮播图 */
.carousel {
  width: 680rpx;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;
  border-radius: 5px;
  margin: 0 auto;
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .active {
      background-color: #fff;
    }
  }
  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
.category {
  width: 680rpx;
  height: 110rpx;
  display: flex;
  margin: 60rpx auto;
  justify-content: space-between;
  align-items: center;
  .category-item {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
.query {
  width: 680rpx;
  margin: 0 auto;
  background-color: #f0f0f0;
  border-radius: 30rpx;
  overflow: hidden;
}
.uni-padding-wrap {
  margin: 30rpx 0;
  width: 680rpx;
  .seg {
    width: 228rpx;
  }
}
.content {
  background-color: #ededed;
  padding: 15rpx 0;
  /* 卡片容器样式 */
  .card-container {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 20rpx;
    box-shadow: 0 8rpx 12rpx rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 20rpx;

    /* 左侧图片 */
    .card-image {
      width: 140rpx;
      height: 140rpx;
      flex-shrink: 0;
      margin-left: 20rpx;
      border-radius: 20rpx;
    }

    /* 右侧内容区域 */
    .card-content {
      flex: 1;
      padding: 20rpx;
      padding-bottom: 10rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      /* 标题样式 */
      .card-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
        margin-bottom: 10rpx;
      }

      /* 描述样式 */
      .card-description {
        font-size: 24rpx;
        color: #666;
        margin-bottom: 20rpx;
        line-height: 1.4;
      }
      /* 底部信息区域 */
      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20rpx;
        color: #999;
        .icons {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 8rpx; // 图标与文本间距
          }
          .icon-text {
            font-size: 30rpx;
            color: #999; // 与原样式保持一致
            margin-right: 30rpx;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
