<script setup lang="ts">
import { addArticleAPI } from "@/apis/article";
import { getAllClassifyAPI } from "@/apis/classify";
import type { popup } from "@/types/component";
import { onLoad } from "@dcloudio/uni-app";
import { computed, ref } from "vue";

// 文章内容
const content = ref("");
// 标题
const title = ref("javaScript防抖");

// 封面图片
const coverImage = ref(
  "http://jackson1.oss-cn-beijing.aliyuncs.com/fe9d233a-4f94-46e7-a2f1-1e97a9da9bcc.jpg" // 测试数据
);

// 上传封面
const handleUploadCover = () => {
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ["image"],
    success: (res) => {
      // 本地路径 (上传的图片的本地路径)
      const { tempFilePath } = res.tempFiles[0];
      // 文件上传
      uni.uploadFile({
        url: "http://localhost:8080/api/user/upload",
        name: "image",
        filePath: tempFilePath, // 新头像
        success: (res) => {
          if (res.statusCode === 200) {
            // 提取头像
            coverImage.value = JSON.parse(res.data).data;
            // 当前页面更新头像
            uni.showToast({ icon: "success", title: "上传成功" });
          } else {
            uni.showToast({ icon: "error", title: "出现错误" });
          }
        },
      });
    },
  });
};

// 标签类型定义
interface Tag {
  id: number;
  name: string;
  active: boolean;
}

// 标签数据
const tags = ref<Tag[]>([
  { id: 1, name: "原创", active: false },
  { id: 2, name: "java", active: false },
  { id: 3, name: "python", active: false },
  { id: 4, name: "数据库", active: false },
  { id: 5, name: "运维部署", active: false },
  { id: 6, name: "人工智能", active: false },
  { id: 7, name: "区块链", active: false },
  { id: 8, name: "javaScript", active: false },
  { id: 9, name: "typescript", active: false },
  { id: 10, name: "vue", active: false },
  { id: 11, name: "react", active: false },
  { id: 12, name: "springBoot", active: false },
  { id: 13, name: "springCloud", active: false },
  { id: 14, name: "mybatis", active: false },
  { id: 15, name: "springSecurity", active: false },
  { id: 16, name: "springMVC", active: false },
  { id: 17, name: "spring", active: false },
  { id: 18, name: "mysql", active: false },
  { id: 19, name: "redis", active: false },
  { id: 20, name: "docker", active: false },
  { id: 21, name: "kubernetes", active: false },
  { id: 23, name: "linux", active: false },
  { id: 24, name: "springDataJpa", active: false },
  { id: 25, name: "mybatisPlus", active: false },
]);

// 可见范围
const visibility = ref<"all" | "self">("all");

// 获取可见范围值
const getVisibility = () => {
  return visibility.value === "all" ? true : false;
};

// 标签弹窗相关
const tagPopup = ref<popup>();

// 显示标签选择弹窗
const showTagPopup = () => {
  tagPopup.value?.open();
};

// 关闭标签选择弹窗
const closeTagPopup = () => {
  tagPopup.value?.close();
};

// 确认选择标签
const confirmTags = () => {
  closeTagPopup();
};

// 选择标签
const toggleTag = (tag: Tag): void => {
  tag.active = !tag.active;
};

// 选中的标签列表
const selectedTags = computed(() => {
  return tags.value.filter((tag) => tag.active).map((tag) => tag.name);
});

// 获取所有分类数据
const calssifyList = ref<string[]>([]);
// 选择的分类结果
const classify = ref("");
const getClassifyList = async () => {
  const res = await getAllClassifyAPI();
  calssifyList.value = res.data.map((item) => {
    return item.type;
  });
};
onLoad(() => {
  getClassifyList();
});

// 文章描述
const description = ref("防抖详解");

// 保存文章
const saveArticle = async () => {
  if (!title.value.trim()) {
    uni.showToast({
      title: "请输入文章标题",
      icon: "none",
    });
    return;
  }
  if (!content.value.trim()) {
    uni.showToast({
      title: "请输入文章内容",
      icon: "none",
    });
    return;
  }

  try {
    // TODO: 实现保存文章的接口调用
    const params = {
      title: title.value,
      content: content.value,
      description: description.value,
      coverImage: coverImage.value,
      isShow: getVisibility(),
      tags: selectedTags.value,
      type: classify.value,
    };
    await addArticleAPI(params);
    uni.showToast({
      title: "保存成功",
      icon: "success",
    });
    uni.navigateBack({ delta: 1 });
  } catch (error) {
    uni.showToast({
      title: "保存失败",
      icon: "error",
    });
  }
};
</script>

<template>
  <view class="write-article">
    <view class="article-title">
      <input
        v-model="title"
        type="text"
        placeholder="请输入文章标题"
        class="title-input"
      />
    </view>

    <view class="cover-container">
      <view class="cover-content" @click="handleUploadCover">
        <image
          v-if="coverImage"
          :src="coverImage"
          mode="aspectFill"
          class="cover-image"
        />
        <view v-else class="upload-placeholder">
          <text class="iconfont icon-add"></text>
          <text class="upload-text">点击上传封面</text>
        </view>
      </view>
    </view>

    <view class="editor-container">
      <textarea
        class="editor"
        v-model="content"
        placeholder="文章内容..."
        :maxlength="1000000000"
      ></textarea>
    </view>

    <view class="visibility-container">
      <view class="visibility-title">可见范围:</view>
      <view class="visibility-options">
        <view
          class="visibility-item"
          :class="{ active: visibility === 'all' }"
          @click="visibility = 'all'"
        >
          全部可见
        </view>
        <view
          class="visibility-item"
          :class="{ active: visibility === 'self' }"
          @click="visibility = 'self'"
        >
          仅我可见
        </view>
      </view>
    </view>

    <view class="tag-select">
      <view class="tag-select-btn" @click="showTagPopup">
        <text>标签选择</text>
        <text class="iconfont icon-right"></text>
      </view>
      <uni-popup
        ref="tagPopup"
        type="bottom"
        :overlayStyle="{ 'touch-action': 'none' }"
      >
        <view class="popup-content">
          <view class="popup-header">
            <text class="popup-title">选择标签</text>
            <text class="popup-close" @click="closeTagPopup">关闭</text>
          </view>
          <view class="popup-tags">
            <view
              v-for="tag in tags"
              :key="tag.id"
              class="popup-tag-item"
              :class="{ active: tag.active }"
              @click="toggleTag(tag)"
            >
              {{ tag.name }}
            </view>
          </view>
          <view class="popup-footer">
            <button class="confirm-btn" @click="confirmTags">确认</button>
          </view>
        </view>
      </uni-popup>
    </view>

    <view class="description-container">
      <view class="description-title">文章描述:</view>
      <textarea
        class="description-input"
        v-model="description"
        placeholder="请输入文章描述..."
        :maxlength="300"
      ></textarea>
    </view>

    <view class="example-body">
      <uni-combox
        :candidates="calssifyList"
        placeholder="请选择文章分类"
        v-model="classify"
        emptyTips="暂时没有文章分类"
      ></uni-combox>
    </view>

    <view class="btn-container">
      <button class="save-btn" @click="saveArticle">发布文章</button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.write-article {
  padding: 20rpx;

  .article-title {
    margin-bottom: 20rpx;

    .title-input {
      width: 100%;
      height: 80rpx;
      padding: 0 20rpx;
      font-size: 32rpx;
      border: 1px solid #dcdfe6;
      border-radius: 8rpx;
    }
  }

  .cover-container {
    margin-bottom: 30rpx;

    .cover-content {
      width: 100%;
      height: 300rpx;
      border: 1px solid #dcdfe6;
      border-radius: 8rpx;
      overflow: hidden;

      .cover-image {
        width: 100%;
        height: 100%;
      }

      .upload-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f5f7fa;

        .iconfont {
          font-size: 60rpx;
          color: #909399;
          margin-bottom: 10rpx;
        }

        .upload-text {
          font-size: 28rpx;
          color: #909399;
        }
      }
    }
  }

  .editor-container {
    min-height: 500rpx;
    border: 1px solid #dcdfe6;
    border-radius: 8rpx;
    margin-bottom: 30rpx;

    .editor {
      width: calc(100% - 40rpx);
      padding: 20rpx;
    }
  }

  .visibility-container {
    margin-bottom: 30rpx;

    .visibility-title {
      font-size: 28rpx;
      color: #606266;
      margin-bottom: 20rpx;
    }

    .visibility-options {
      display: flex;
      gap: 20rpx;

      .visibility-item {
        padding: 10rpx 20rpx;
        background-color: #f5f7fa;
        border-radius: 6rpx;
        font-size: 26rpx;
        color: #606266;
        cursor: pointer;

        &.active {
          background-color: #409eff;
          color: #ffffff;
        }

        &:active {
          opacity: 0.8;
        }
      }
    }
  }
  .tag-select {
    margin-bottom: 30rpx;

    .tag-select-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      background-color: #f5f7fa;
      border-radius: 8rpx;
      font-size: 28rpx;
      color: #606266;

      .iconfont {
        font-size: 24rpx;
        color: #909399;
      }
    }

    .popup-content {
      background-color: #ffffff;
      border-radius: 20rpx 20rpx 0 0;
      padding: 30rpx;
      padding-bottom: env(safe-area-inset-bottom); /* 适配底部安全区域 */

      .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30rpx;

        .popup-title {
          font-size: 32rpx;
          font-weight: 500;
          color: #303133;
        }

        .popup-close {
          font-size: 28rpx;
          color: #909399;
        }
      }

      .popup-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;
        margin-bottom: 30rpx;

        .popup-tag-item {
          padding: 10rpx 20rpx;
          background-color: #f5f7fa;
          border-radius: 6rpx;
          font-size: 26rpx;
          color: #606266;

          &.active {
            background-color: #409eff;
            color: #ffffff;
          }
        }
      }

      .popup-footer {
        .confirm-btn {
          width: 100%;
          height: 80rpx;
          line-height: 80rpx;
          text-align: center;
          background-color: #409eff;
          color: #ffffff;
          border-radius: 8rpx;
          font-size: 28rpx;
        }
      }
    }
  }

  .example-body {
    background-color: #ffffff;
    margin-bottom: 30rpx;
    z-index: 9999;
  }

  .description-container {
    margin-bottom: 30rpx;

    .description-title {
      font-size: 28rpx;
      color: #303133;
      margin-bottom: 10rpx;
    }

    .description-input {
      width: 100%;
      height: 160rpx;
      padding: 20rpx;
      font-size: 26rpx;
      border: 1px solid #dcdfe6;
      border-radius: 8rpx;
      box-sizing: border-box;
    }
  }

  .btn-container {
    .save-btn {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      background-color: #409eff;
      color: #fff;
      border-radius: 8rpx;
      font-size: 32rpx;

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
