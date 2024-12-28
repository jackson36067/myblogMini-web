import type { groupMemberResult } from "./groupMember";

export type userGroupResult = {
  id: string;
  groupName: string;
  groupMemberVOList: groupMemberResult[]; // 分组成员对象数组
  isMember: boolean; // 用户在是否在分组成员中
};

export type addUserFollowGroupResult = {
  id: string;
  avatar: string;
  nickName: string;
  isMember: boolean;
};
