import type { userDataResult } from "@/types/social";
import { httpInstacne } from "@/utils/http";

export const getUserDataListAPI = (
  current: number,
  sort?: number,
  nickNameOrComment?: string
) => {
  const data: Record<string, any> = { current };
  if (sort) {
    data.sort = sort;
  }
  if (nickNameOrComment) {
    data.nickNameOrComment = nickNameOrComment;
  }
  return httpInstacne<userDataResult[]>({
    method: "GET",
    url: "/data/list",
    data,
  });
};
