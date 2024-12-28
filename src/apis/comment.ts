import type { articleCommentResult, sendCommentParams } from "@/types/comment";
import type { pageResult } from "@/types/component";
import { httpInstacne } from "@/utils/http";

export const getArticleCommentAPI = (id: string, isAll?: boolean) => {
  const data: Record<string, any> = { id };
  if (isAll) {
    data.isAll = isAll;
  }
  return httpInstacne<pageResult<articleCommentResult>>({
    method: "GET",
    url: "/comment/list",
    data,
  });
};

export const sendCommentAPI = (data: sendCommentParams) => {
  return httpInstacne({
    method: "POST",
    url: "/comment/send",
    data,
  });
};

export const doLikeCommentAPI = (id: string) => {
  return httpInstacne({
    method: "POST",
    url: `/comment/like/${id}`,
  });
};
