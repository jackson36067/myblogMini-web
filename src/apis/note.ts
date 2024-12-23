import type { noteResult } from "@/types/note";
import { httpInstacne } from "@/utils/http";

export const getUserNoteAPI = (id: string) => {
  return httpInstacne<noteResult>({
    method: "GET",
    url: `/note/${id}`,
  });
};

export const createOrUpdateUserNoteAPI = (id: string, note: string) => {
  return httpInstacne({
    method: "POST",
    url: `/note`,
    data: {
      id,
      note,
    },
  });
};
