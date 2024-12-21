import type Emoj from "@/components/emoj.vue";

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

export type popup = {
  open: (type?: "top" | "bottom" | "left" | "right") => void;
  close: () => void;
};
