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
