import { httpInstacne } from "@/utils/http";

export const doFollowAPI = (id: string) => {
  return httpInstacne({
    method: "POST",
    url: `/follow/${id}`,
  });
};
