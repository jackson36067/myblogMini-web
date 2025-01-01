export type articleInfo = {
  id: string;
  title: string;
  coverImage: string;
  author: string;
  createTime: string;
  totalVisit: number;
  totalLike: number;
  totalComment: number;
  isLike: boolean;
  description: string;
  tags: string[];
};

export type articleDetailResult = {
  id: string;
  title: string;
  createTime: string;
  content: string;
  coverImage: string;
  totalComment: string;
  totalLike: string;
  totalVisit: string;
  avatar: string;
  nickName: string;
  isLike: boolean;
  isFollow: boolean;
  tags: string[];
  articleId: string;
  isFavorite: boolean;
};

export type addArticleParmas = {
  content: string;
  title: string;
  coverImage: string;
  tags: string[];
  isShow: boolean;
  description: string;
};
