import type Emoj from "@/components/emoj.vue";
import type NoteDialogPopup from "@/pages/social/component/NoteDialogPopup.vue";
import type SortPopup from "@/pages/social/component/SortPopup.vue";

// 图标类型 以icon开头的字符串
export type CustomIconType = `icon-${string}`;
type category = {
  icon: CustomIconType;
  title: string;
  color: string;
  url: string;
};
export type pageResult<T> = {
  total: number;
  list: T[];
};

export type EmojInstance = InstanceType<typeof Emoj>;

export type sortPopupInstance = InstanceType<typeof SortPopup>;

export type popup = {
  open: (type?: "top" | "bottom" | "left" | "right") => void;
  close: () => void;
};

export type noteDialogPopupInstance = InstanceType<typeof NoteDialogPopup>;

export type instancePositionInfo = {
  left: number;
  top: number;
};
