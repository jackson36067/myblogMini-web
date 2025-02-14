export type chatMessageDTO = {
  id: string;
  nickName: string;
  avatar: string;
  isOnline: boolean; // 是否在线
  lastOnlineTime: string;
  chatMessages: ChatMessage[];
};
export type ChatMessage = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  status: boolean;
  createTime: string;
};

export type unReadMessage = {
  senderId: string;
  avatar: string;
  nickName: string;
  lastOnlineTime: string;
  unReadMessageNumber: number;
};
