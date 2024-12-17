import type { signInfoResult, signResult } from "@/types/userSign";
import { httpInstacne } from "@/utils/http";

export const doSignAPI = () => {
  return httpInstacne<signResult>({
    method: "POST",
    url: "/sign",
  });
};

export const getSignInfoAPI = () => {
  return httpInstacne<signInfoResult[]>({
    method: "GET",
    url: "/sign/list",
  });
};
