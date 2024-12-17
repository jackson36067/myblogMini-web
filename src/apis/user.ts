import type { LoginParams, LoginResult, UserInfo } from "@/types/user";
import { httpInstacne } from "@/utils/http";

export const wxLoginAPI = (data: LoginParams) => {
  return httpInstacne<LoginResult>({
    method: "POST",
    url: "/user/login",
    data,
  });
};

export const getUserInfoAPI = () => {
  return httpInstacne<UserInfo>({
    method: "GET",
    url: "/user/info",
  });
};
