import type {
  addUserFollowGroupResult,
  userGroupResult,
} from "@/types/userGroup";
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

export const getAddGroupMemberInfoListAPI = (
  groupId: string,
  nickNameOrComment: string
) => {
  const data: Record<string, any> = { groupId };
  if (nickNameOrComment) {
    data.nickNameOrComment = nickNameOrComment;
  }
  return httpInstacne<addUserFollowGroupResult[]>({
    method: "GET",
    url: "/group/add/list",
    data,
  });
};

export const updateGroupNameAPI = (id: string, groupName: string) => {
  return httpInstacne({
    method: "PUT",
    url: "/group/name",
    data: {
      id,
      groupName,
    },
  });
};

export const deleteGroupByIdAPI = (id: string) => {
  return httpInstacne({
    method: "DELETE",
    url: `/group/${id}`,
  });
};
