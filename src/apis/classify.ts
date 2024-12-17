import type { classifyResult } from "@/types/classify";
import { httpInstacne } from "@/utils/http";

export const getAllClassifyAPI = () => {
  return httpInstacne<classifyResult[]>({
    method: "GET",
    url: "/classify/list",
  });
};
