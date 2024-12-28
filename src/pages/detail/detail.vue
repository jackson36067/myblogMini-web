<script setup lang="ts">
import {
  doFavoriteArticleAPI,
  doLikeAPI,
  getArticleDetailAPI,
} from "@/apis/article";
import type { articleDetailResult } from "@/types/article";
import { onLoad } from "@dcloudio/uni-app";
import marked from "marked"; // 引入 marked 库
import hljs from "highlight.js"; // 引入 highlight.js
import { ref } from "vue";
import Emoj from "@/components/emoj.vue";
import type { articleCommentResult } from "@/types/comment";
import {
  doLikeCommentAPI,
  getArticleCommentAPI,
  sendCommentAPI,
} from "@/apis/comment";
import { useMemberStore } from "@/stores";
import { doFollowAPI } from "@/apis/follow";
import Comment from "./component/Comment.vue";
import type { popup } from "@/types/component";
import MoreCommentPopup from "./component/MoreCommentPopup.vue";

// 获取安全距离
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

const memberStore = useMemberStore();

const params = defineProps<{
  id: string;
}>();
const parsedData = ref<string>("");

const articleDetailData = ref({} as articleDetailResult);
// 解析文章内容
const getArticleDetail = async () => {
  const res = await getArticleDetailAPI(params.id);
  articleDetailData.value = res.data;
  const content = res.data.content.replace(/\\`/g, "`").replace(/\\n/g, "\n");
  // 自定义 marked 渲染器
  const renderer = new marked.Renderer();
  // 为 <h1> 标签添加内联样式
  renderer.heading = (text: string, level: number) => {
    return `<h${level} style="color: red;margin:10px 0">${text}</h${level}>`;
  };

  // 为代码块添加背景色
  renderer.code = (code: string) => {
    const highlighted = hljs.highlightAuto(code).value;
    const lines = highlighted.split("\n");
    const numberedCode = lines
      .map(
        (line, index) =>
          `<span style="font-size: 12px; color: #999; position: sticky; display: inline-block; left: 0; z-index: 1; width: 20px; padding:0 20px 0; background-color: #fff; border-radius: 10px; ">${
            index + 1
          }</span> <span style="display: inline-block; z-index=99">${line}</span>`
      )
      .join("\n");
    return `<pre style="display: flex; background-color: #f6f8fa; border-radius: 20px; color:#000; font-size:16px;  box-sizing: border-box;  white-space: pre; overflow-x: auto; max-width: 100%; position: relative"><code>${numberedCode}</code></pre>`;
  };

  // 为链接添加颜色
  renderer.link = (href: string, title: string, text: string) => {
    return `<a href="${href}" style="color: skyblue" title="${title}">${text}</a>`;
  };
  // 解析数据
  parsedData.value = marked(content, { renderer });
  uni.setNavigationBarTitle({ title: res.data.title });
};

const articleCommentList = ref<articleCommentResult[]>([]);
// 获取文章评论
const getArticleCommentList = async () => {
  const res = await getArticleCommentAPI(params.id);
  articleCommentList.value = res.data.list;
};

// 解析数据
onLoad(() => {
  getArticleDetail();
  getArticleCommentList();
});

// 输入的评论内容
const comment = ref<string>("");
const isEmojiPanelVisible = ref<boolean>(false); // 控制表情面板的显示

// 切换表情面板的显示/隐藏
const toggleEmojiPanel = () => {
  isEmojiPanelVisible.value = !isEmojiPanelVisible.value;
};

// 选择表情
const selectEmjo = (emjoi: string) => {
  comment.value += emjoi;
  isEmojiPanelVisible.value = false;
};

// 滚动到最新评论
const scrollTop = ref(0);
// 发送评论
const sendComment = async () => {
  if (comment.value) {
    await sendCommentAPI({ articleId: params.id, content: comment.value });
    uni.showToast({ title: "发送成功", icon: "success" });
    getArticleCommentList();
    comment.value = "";
    // 当评论更新时，滚动到最底部
    scrollTop.value = 1000000; // 滚动到最底部
  } else {
    uni.showToast({ title: "请输入内容", icon: "error" });
  }
};

// 评论区点击关注发布者
const doFollow = async (userId: string) => {
  await doFollowAPI(userId);
  uni.showToast({ title: "关注成功", icon: "success" });
  getArticleCommentList();
};

// 点赞评论
const doCommentLike = async (id: string) => {
  await doLikeCommentAPI(id);
  getArticleCommentList();
};

// 点赞文章
const doArticleLike = async (id: string, isLike: boolean) => {
  await doLikeAPI({ id });
  uni.showToast({
    title: isLike ? "取消点赞" : "点赞成功",
    icon: "success",
  });
  getArticleDetail();
};

// 收藏文章
const doFavoriteArticle = async (id: string, isFavorite: boolean) => {
  await doFavoriteArticleAPI(id);
  uni.showToast({
    title: isFavorite ? "取消收藏" : "收藏成功",
    icon: "success",
  });
  getArticleDetail();
};
// 分享弹出层实例
const sharePopup = ref<popup>();
// 点击后展示弹出层
const doShowShare = () => {
  if (sharePopup.value) {
    sharePopup.value!.open();
  }
};

// 获取更多评论弹出层
const commentPopup = ref<popup>();
const allCommentList = ref<articleCommentResult[]>([]);
const showCommentPopup = async (id: string) => {
  if (commentPopup.value) {
    commentPopup.value!.open();
  }
  const res = await getArticleCommentAPI(id, true);
  allCommentList.value = res.data.list;
};
</script>

<template>
  <scroll-view scroll-y :scroll-top="scrollTop">
    <!-- 文章基础模块 -->
    <view class="title" style="margin: 10rpx 20rpx; font-size: 36rpx">{{
      articleDetailData.title
    }}</view>
    <view
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 40rpx 20rpx;
      "
    >
      <view style="display: flex">
        <image
          style="width: 90rpx; height: 90rpx; border-radius: 50%"
          :src="articleDetailData.avatar"
          mode="scaleToFill"
        />
        <view
          style="
            margin-left: 20rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 90rpx;
          "
        >
          <text>{{ articleDetailData.nickName }}</text>
          <view class="example-body" style="display: flex; margin-left: -6rpx">
            <view
              class="tag-view"
              style="margin-right: 8rpx"
              v-for="(item, index) in articleDetailData.tags"
              :key="index"
            >
              <uni-tag
                :text="item"
                type="primary"
                :inverted="true"
                custom-style="background: linear-gradient(to right, #e6f7ff, #d0efff); border-color: rgba(173, 216, 230, 0.8); color:  #1890ff;"
              />
            </view>
          </view>
        </view>
      </view>
      <view
        v-if="
          articleDetailData.nickName !== memberStore.profile?.nickName &&
          articleDetailData.isFollow
        "
        style="
          width: 120rpx;
          height: 50rpx;
          border: 1px solid #ccc;
          border-radius: 25rpx;
          text-align: center;
          line-height: 50rpx;
        "
        >关注</view
      >
    </view>
    <view class="visit" style="margin: 0rpx 20rpx; font-size: 24rpx">
      <text class="icon-text">{{ articleDetailData.totalVisit }}人阅读</text>
    </view>
    <!-- 文章内容模块 -->
    <view class="content">
      <div
        v-html="parsedData"
        class="markdown-content"
        style="background-color: #fff"
      ></div>
    </view>
    <!-- 文章评论模块 -->
    <view class="comment">
      <uni-section
        title="评论列表"
        type="line"
        padding
        titleFontSize="38rpx"
        titleColor="#333"
        style="border-bottom: 3px solid #f1f1f1"
      >
      </uni-section>
      <Comment
        :list="articleCommentList"
        @doFollow="doFollow"
        @doCommentLike="doCommentLike"
      />
    </view>
    <!-- 评论过多不展示,直接点击后获取更过评论模块 -->
    <view
      class="more"
      v-if="articleCommentList.length >= 5"
      @tap="showCommentPopup(params.id)"
    >
      点击看更多评论 >
    </view>
    <!-- 获取更多评论弹出层 -->
    <uni-popup
      ref="commentPopup"
      type="bottom"
      background-color="#fff"
      :overlayStyle="{ 'touch-action': 'none' }"
      mask-background-color="rgba(0,0,0,0.4)"
      mask-click
    >
      <MoreCommentPopup
        :list="allCommentList"
        @closePopup="commentPopup?.close()"
        @doFollow="doFollow"
        @doCommentLike="doCommentLike"
      />
    </uni-popup>
  </scroll-view>
  <!-- 发送评论模块 -->
  <view
    class="send-comment"
    :style="{ paddingBottom: safeAreaInsets?.bottom + 'rpx' }"
  >
    <input
      v-model="comment"
      type="text"
      placeholder="善语结善缘，恶语伤人心"
      placeholder-style="padding-left: 10rpx; font-size:24rpx;"
    />
    <uni-icons
      class="icon-send"
      custom-prefix="iconfont"
      type="icon-fasong"
      size="26"
      :color="comment.trim() ? '#fd3c13' : '#333'"
      @tap="sendComment"
    ></uni-icons>
    <uni-icons
      class="icon-expression"
      custom-prefix="iconfont"
      type="icon-biaoqing"
      size="26"
      color="#999"
      @tap="toggleEmojiPanel"
    ></uni-icons>
  </view>
  <!-- 表情模块 -->
  <view class="emoji-panel" v-if="isEmojiPanelVisible">
    <Emoj ref="emoj" @selectEmjo="selectEmjo" />
  </view>
  <!-- 点赞,收藏,分享文章模块 -->
  <view class="social-actions">
    <view class="social-actions__like">
      <uni-icons
        class="icon-expression"
        custom-prefix="iconfont"
        :type="!articleDetailData.isLike ? 'icon-aixin' : 'icon-aixin1'"
        size="24"
        :color="!articleDetailData.isLike ? '#ff9300' : 'red'"
        @tap="doArticleLike(articleDetailData.id, articleDetailData.isLike)"
      ></uni-icons>
    </view>
    <!-- 点赞,收藏,分享模块 -->
    <view class="social-actions__favorite">
      <uni-icons
        :type="articleDetailData.isFavorite ? 'icon-star' : 'icon-wujiaoxing'"
        :color="articleDetailData.isFavorite ? '#f6a623' : '#ff9300'"
        size="24"
        custom-prefix="iconfont"
        @tap="doFavoriteArticle(params.id, articleDetailData.isFavorite)"
      />
    </view>
    <view class="social-actions__share">
      <uni-icons
        type="icon-weibiaoti-"
        color="#ff9300"
        size="24"
        custom-prefix="iconfont"
        @tap="doShowShare"
      />
    </view>
  </view>
  <!-- 分享到 -->
  <uni-popup
    ref="sharePopup"
    type="share"
    mask-background-color="rgba(0,0,0,0.4)"
    is-mask-click
    backgroundColor="#fff"
  >
    <view style="margin-bottom: 30rpx">
      <uni-popup-share
        title="分享到"
        style="padding-bottom: 102px"
      ></uni-popup-share>
    </view>
  </uni-popup>
</template>
<style lang="scss">
@import "@/static/iconfont.css";
// 页面背景和字体
.content {
  font-family: "Arial", sans-serif;
  background-color: #fff;
  color: #333;
  line-height: 1.8;
  margin: 0;
  padding: 20px;
}

.comment {
  border-top: 5rpx solid #f1f1f1;
}

.send-comment {
  position: relative;
  background-color: #fff;
  z-index: 99999;
  position: sticky;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  border-top: 1px solid #999;
  padding: 10rpx 14rpx 0;
  input {
    width: 82%;
    height: 100%;
    background-color: #f6f8fa;
    padding: 10rpx 0;
    border-radius: 20rpx;
  }
  .icon-send {
    position: absolute;
    top: 15rpx;
    right: 20rpx;
  }
  .icon-expression {
    position: absolute;
    top: 15rpx;
    right: 70rpx;
  }
}
.emoji-panel {
  width: 100%;
  position: fixed;
  bottom: 101rpx;
  left: 0;
  z-index: 9999;
  background-color: #fff;
  border-top: 1px solid #ddd;
  padding: 10px;
  max-height: 400rpx;
  overflow-y: auto;
  box-sizing: border-box;
}
.more {
  margin: 30rpx 0;
  text-align: center;
  font-size: 26rpx;
  font-family: "Courier New", Courier, monospace;
}
.social-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20rpx;
  position: fixed;
  right: 80rpx;
  bottom: 300rpx;
  padding: 0 5rpx;
  background-color: #fbfbfb;
  .social-actions__like {
    margin: 40rpx 0;
  }
  .social-actions__share {
    margin: 40rpx 0;
  }
}
</style>
@/types/component
