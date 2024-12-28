import type { articleInfo } from "./article";
import type { CustomIconType } from "./component";

export type classifyResult = {
  id: string;
  type: string;
  icon: CustomIconType;
  createTime: string;
  background: string;
};
export type classifyDetailResult = {
  id: string;
  type: string;
  articlePageVOList: articleInfo[];
};
