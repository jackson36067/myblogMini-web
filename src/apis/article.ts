import type { articleInfo } from "@/types/article";
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

export const doLikeAPI = (data: { id: number }) => {
  return httpInstacne({
    method: "POST",
    url: `/article/like`,
    data,
  });
};

export const getArticleLikeAPI = () => {
  return httpInstacne<articleInfo[]>({
    method: "GET",
    url: `/article/like`,
  });
};

export const getMyArticleAPI = () => {
  return httpInstacne<articleInfo[]>({
    method: "GET",
    url: `/article/my`,
  });
};
