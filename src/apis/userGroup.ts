import type { userGroupResult } from "@/types/userGroup";
import { httpInstacne } from "@/utils/http";

export const getUserGroupListAPI = () => {
  return httpInstacne<userGroupResult[]>({
    method: "GET",
    url: "/group/list",
  });
};

export const addUserGroupAPI = (groupName: string) => {
  return httpInstacne({
    method: "POST",
    url: "/group/add",
    data: {
      groupName,
    },
  });
};
