import type { classifyDetailResult, classifyResult } from "@/types/classify";
import { httpInstacne } from "@/utils/http";

export const getAllClassifyAPI = () => {
  return httpInstacne<classifyResult[]>({
    method: "GET",
    url: "/classify/list",
  });
};

export const getClassifyDetailAPI = (id: string) => {
  return httpInstacne<classifyDetailResult>({
    method: "GET",
    url: `/classify/${id}`,
  });
};
