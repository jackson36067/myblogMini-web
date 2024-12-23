import type { articleDetailResult, articleInfo } from "@/types/article";
import type { pageResult } from "@/types/conponent";
import { httpInstacne } from "@/utils/http";

export const getArticleAPI = (
  sign: number,
  page: number,
  pageSize: number,
  title?: string
) => {
  const data: Record<string, any> = { sign, page, pageSize };

  // 只有 title 有值时才添加到 data 中
  if (title) {
    data.title = title;
  }
  return httpInstacne<pageResult<articleInfo>>({
    method: "GET",
    url: "/article/page",
    data,
  });
};

export const doLikeAPI = (data: { id: string }) => {
  return httpInstacne({
    method: "POST",
    url: `/article/doLike`,
    data,
  });
};

export const getArticleLikeAPI = (title?: string) => {
  const data: Record<string, any> = {};
  if (title) {
    data.title = title;
  }
  return httpInstacne<articleInfo[]>({
    method: "GET",
    url: `/article/like`,
    data,
  });
};

export const getMyArticleAPI = (type: number, title?: string) => {
  const data: Record<string, any> = { type };
  if (title) {
    data.title = title;
  }
  return httpInstacne<articleInfo[]>({
    method: "GET",
    url: `/article/my`,
    data: data,
  });
};

export const getArticleDetailAPI = (id: string) => {
  return httpInstacne<articleDetailResult>({
    method: "GET",
    url: `/article/${id}`,
  });
};

export const doFavoriteArticleAPI = (id: string) => {
  return httpInstacne({
    method: "POST",
    url: `/article/favorite/${id}`,
  });
};
