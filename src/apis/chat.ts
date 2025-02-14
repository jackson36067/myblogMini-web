import type { chatMessageDTO, unReadMessage } from "@/types/chat";
import { httpInstacne } from "@/utils/http";

export const getChatMessageListAPI = (id: string) => {
  return httpInstacne<chatMessageDTO>({
    method: "GET",
    url: `/chat/list/${id}`,
  });
};

export const getUnReadMessageListAPI = () => {
  return httpInstacne<unReadMessage[]>({
    method: "GET",
    url: "/chat/unread",
  });
};
