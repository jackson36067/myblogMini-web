export type articleCommentResult = {
  id: string;
  nickName: string;
  createTime: string;
  userId: string;
  content: string;
  avatar: string;
  totalLike: number;
  isLike: boolean;
  isFollow: boolean;
};

export type sendCommentParams = {
  articleId: string;
  content: string;
};
