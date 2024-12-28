import type { groupMemberResult } from "@/types/groupMember";
import { httpInstacne } from "@/utils/http";

export const insertOrChangeMemberToGroupAPI = (
  id: string,
  memberId: string
) => {
  return httpInstacne({
    method: "POST",
    url: "/group/member",
    data: {
      id,
      memberId,
    },
  });
};

export const addOrDeleteMemberToGroupAPI = (id: string, memberId: string) => {
  return httpInstacne({
    method: "POST",
    url: "/group/member/change",
    data: {
      id,
      memberId,
    },
  });
};

/**
 *
 * @param id 分组id
 * @param memberId 成员id
 * @returns
 */
export const removeMemberFromGroupAPI = (id: string, memberId: string) => {
  return httpInstacne({
    method: "POST",
    url: "/group/member/remove",
    data: {
      id,
      memberId,
    },
  });
};
