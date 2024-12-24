import type { groupMemberResult } from "./groupMember";

export type userGroupResult = {
  id: string;
  groupName: string;
  groupMemberVOList: groupMemberResult[];
  isMember: boolean;
};
