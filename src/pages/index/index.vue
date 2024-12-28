<script setup lang="ts">
import { ref } from "vue";
import type { _UniIconsCustomType } from "@uni-helper/uni-types/index";
import type { category, pageResult } from "@/types/component";
import type { articleInfo } from "@/types/article";
import { doLikeAPI, getArticleAPI } from "@/apis/article";
import { onLoad } from "@dcloudio/uni-app";
import Article from "@/components/article.vue";
import IndexSkeleton from "./component/indexSkeleton.vue";
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
    url: "",
  },
  {
    icon: "icon-file",
    title: "面试刷题",
    color: "#de5e59",
    url: "",
  },
  {
    icon: "icon-r",
    title: "小程序",
    color: "#edc505",
    url: "",
  },
  {
    icon: "icon-shopping",
    title: "开源资源",
    color: "#df7a25",
    url: "",
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

const isLoading = ref(true);
onLoad(async () => {
  await getArticleList();
  isLoading.value = false;
});

const doLike = async (id: string) => {
  await doLikeAPI({ id });
  getArticleList();
};

// 点击tab栏切换内容
const onClickItem: UniHelper.UniSegmentedControlOnClickItem = (event) => {
  current.value = event.currentIndex;
  page.value = 1;
  articleList.value = [];
  getArticleList();
};

const onArticleTitleChange = () => {
  getArticleList();
};
</script>

<template>
  <IndexSkeleton v-if="isLoading" />
  <template v-else>
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
        @change="onArticleTitleChange"
      ></uni-easyinput>
    </view>
    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control
        :current="current"
        :values="tabItems"
        style-type="text"
        active-color="#dd524d"
        @clickItem="onClickItem"
        class="seg"
      />
    </view>
    <view class="content">
      <Article :list="articleList" @clicked="doLike" />
    </view>
  </template>
</template>

<style lang="scss">
@import "@/static/iconfont.css";
@import "@/static/query.css";
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
}
</style>
@/types/component
