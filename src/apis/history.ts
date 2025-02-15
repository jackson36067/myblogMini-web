import { httpInstacne } from "@/utils/http";

export const deleteBrowseHistoryAPI = (current: number) => {
  return httpInstacne({
    method: "DELETE",
    url: `/history/delete/${current}`,
  });
};
