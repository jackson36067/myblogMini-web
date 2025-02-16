import type { followItem } from "@/types/follow";
import { httpInstacne } from "@/utils/http";

export const doFollowAPI = (id: string) => {
  return httpInstacne({
    method: "POST",
    url: `/follow/${id}`,
  });
};
export const getFollowListAPI = () => {
  return httpInstacne<followItem[]>({
    method: "GET",
    url: "/follow/list",
  });
};
