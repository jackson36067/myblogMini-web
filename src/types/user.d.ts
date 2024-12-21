export type LoginResult = {
  id: string;
  token: string;
  openid: string;
};

export type LoginParams = {
  code: string;
};

export type LoginProfile = {
  id: string;
  token: string;
  openid: string;
  nickName: string;
  avatar: string;
  gender: number;
};

export type UserInfo = {
  id: string;
  points: number;
  isSignIn: boolean;
  totalLike: number;
  totalFriend: number;
  totalFollow: number;
  totalFans: number;
};

export type updateUserParams = {
  avatar: string;
  nickName: string;
};
