<script setup lang="ts">
import Emoj from "@/components/emoj.vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
import type { ChatMessage, chatMessageDTO } from "@/types/chat";
import { getChatMessageListAPI } from "@/apis/chat";
import { useMemberStore } from "@/stores";

// 从请求参数中获取用户id
const pathParams = defineProps<{ id: string }>();
// 获取用户使用的安全距离
const { safeAreaInsets } = uni.getSystemInfoSync();
const memberStore = useMemberStore();

// 点击左侧图标返回
const backTo = () => {
  uni.navigateBack({ delta: 1 });
};
const comment = ref("");
const isEmojiPanelVisible = ref(false);
// 切换表情面板的显示/隐藏
const toggleEmojiPanel = () => {
  isEmojiPanelVisible.value = !isEmojiPanelVisible.value;
};

// 选择表情
const selectEmjo = (emjoi: string) => {
  comment.value += emjoi;
  isEmojiPanelVisible.value = false;
};

// 消息接受者信息
const receiverInfo = ref({
  id: "",
  nickName: "",
  avatar: "",
  lastOnlineTime: "",
  isOnline: false,
});
// 消息列表
const chatMessageList = ref<ChatMessage[]>([]);

const getChatMessageList = async () => {
  const res = await getChatMessageListAPI(pathParams.id);
  receiverInfo.value.avatar = res.data.avatar;
  receiverInfo.value.nickName = res.data.nickName;
  receiverInfo.value.id = res.data.id;
  receiverInfo.value.isOnline = res.data.isOnline;
  receiverInfo.value.lastOnlineTime = res.data.lastOnlineTime;
  chatMessageList.value = res.data.chatMessages;
};

// 获取消息以及接受者的信息
// 监听接收到的消息
onLoad(() => {
  uni.onSocketMessage((data) => {
    console.log(data);
  });
  getChatMessageList();
});

const sendMessage = () => {
  if (comment.value) {
    const chatMessage = ref<ChatMessage>({
      id: "",
      senderId: memberStore.profile!.id,
      receiverId: pathParams.id,
      content: comment.value,
      status: false,
      createTime: "",
    });
    uni.sendSocketMessage({
      data: JSON.stringify(chatMessage.value),
      success: (result) => {},
      fail: (error) => {},
    });
    chatMessageList.value.push(chatMessage.value);
    comment.value = "";
  } else {
    uni.showToast({ title: "请输入文字!", position: "top" });
  }
};

uni.onSocketMessage((data) => {
  console.log(data);
});
</script>

<template>
  <view class="chat" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <view @tap="backTo" class="back">
      <uni-icons
        type="icon-zuojiantou-cu"
        custom-prefix="iconfont"
        color="#17161c"
        size="26"
      >
      </uni-icons>
    </view>
    <view class="info">
      <view class="image">
        <image :src="receiverInfo.avatar" mode="scaleToFill" />
        <view v-if="receiverInfo.isOnline" class="online"></view>
      </view>
      <view class="state">
        <view class="nickName">{{ receiverInfo.nickName }}</view>
        <view :class="[{ true: receiverInfo.isOnline }, 'online']">{{
          receiverInfo.isOnline
            ? "在线"
            : receiverInfo.lastOnlineTime + "前在线"
        }}</view>
      </view>
    </view>
  </view>
  <scroll-view class="scroll-view" scroll-y>
    <view
      v-for="item in chatMessageList"
      :key="item.id"
      :class="[
        item.senderId === memberStore.profile?.id ? 'left' : 'right',
        'detail',
      ]"
    >
      <image
        :src="
          item.senderId === memberStore.profile?.id
            ? memberStore.profile.avatar
            : receiverInfo.avatar
        "
        mode="scaleToFill"
      />
      <view
        :class="[
          'content',
          item.senderId === memberStore.profile?.id ? 'sender' : 'receiver',
        ]"
      >
        {{ item.content }}
      </view>
    </view>
    <view
      class="tip"
      v-if="
        chatMessageList[chatMessageList.length - 1].status &&
        chatMessageList[chatMessageList.length - 1].senderId ===
          memberStore.profile?.id
      "
    >
      <image :src="receiverInfo.avatar" mode="scaleToFill" />
      <view>已读不回</view>
    </view>
  </scroll-view>
  <view>
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
        @tap="sendMessage"
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
  </view>
</template>

<style lang="scss">
@import "@/static/iconfont.css";
.chat {
  display: flex;
  align-items: center;
  width: 100%;
  // height: 210rpx;
  padding: 0 15rpx;
  padding-bottom: 10rpx;
  border-bottom: 2px solid #f4f4f4;
  box-sizing: border-box;
  z-index: 9999;
  .info {
    display: flex;
    height: 100%;
    margin-left: 40rpx;
    .image {
      position: relative;
      width: 100rpx;
      height: 100rpx;
      image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .online {
        position: absolute;
        width: 50rpx;
        height: 50rpx;
        border-radius: 50%;
        right: 0;
        bottom: -10rpx;
        background-color: #fff;
        &::after {
          display: block;
          position: absolute;
          content: "";
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          right: 5rpx;
          bottom: 5rpx;
          background-color: #3bd71b;
        }
      }
    }
    .state {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 80%;
      margin: 8rpx 0 0 40rpx;
      .nickName {
        font-weight: 700;
        font-size: 32rpx;
      }
      .online {
        font-size: 28rpx;
        color: #6f6f71;
      }
    }
  }
}
.scroll-view {
  height: calc(100vh - 400rpx); // 减去头部高度
  margin-top: 20rpx;
  padding-bottom: 20rpx;
  .detail {
    margin-top: 25rpx;
    display: flex;
    gap: 8rpx;
  }
  .left {
    align-self: flex-end;
    flex-direction: row-reverse;
  }
  .right {
    align-self: flex-start;
  }
  image {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 500rpx;
    padding: 0 30rpx;
    border-radius: 20rpx;
  }
  .sender {
    background-color: #6478ff;
    color: #fff;
  }
  .receiver {
    background-color: #f4f2f3;
    color: #1d1a22;
  }
  .tip {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8rpx;
    margin: 15rpx 110rpx 0 0;
    font-size: 28rpx;
    color: #ccc;
    image {
      width: 50rpx;
      height: 50rpx;
      border-radius: 50%;
    }
  }
}
.send-comment {
  position: relative;
  background-color: #fff;
  z-index: 99999;
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
  position: absolute;
  width: 100%;
  bottom: 101rpx;
  left: 0;
  z-index: 1;
  background-color: #fff;
  border-top: 1px solid #ddd;
  padding: 10px;
  max-height: 400rpx;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
