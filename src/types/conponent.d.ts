// 图标类型 以icon开头的字符串
export type CustomIconType = `icon-${string}`;
type category = {
  icon: CustomIconType;
  title: string;
  color: string;
};
export type pageResult<T> = {
  total: number;
  list: T[];
};
