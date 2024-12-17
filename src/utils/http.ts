import { useMemberStore } from "@/stores/modules/member";

// 基地址
const baseUrl = "http://localhost:8080/api";
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith("http")) {
      options.url = baseUrl + options.url;
    }
    // 请求过时
    options.timeout = 10000;
    options.header = {
      ...options.header,
      // 请求需要
      "source-client": "miniapp",
    };
    // console.log(options)
    // 请求头中附带token
    const memberStore = useMemberStore();
    const token = memberStore.profile?.token;
    if (token) {
      options.header.Authorization = token;
    }
  },
};
uni.addInterceptor("request", httpInterceptor);
uni.addInterceptor("uploadFile", httpInterceptor);

/**
 * 封装响应拦截器
 * @param options
 * @returns
 */
interface DataInterface<T> {
  code: string;
  msg: string;
  data: T;
}
export const httpInstacne = <T>(options: UniApp.RequestOptions) => {
  return new Promise<DataInterface<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 当token失效或者返回500时也会进入success
      success(res) {
        // 响应状态码必须在200-299之间
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as DataInterface<T>);
        } else if (res.statusCode === 401) {
          // 返回状态码为401,表示未登录或者token失效,清空用户信息,跳转至登录页
          const memberStore = useMemberStore();
          memberStore.clearProfile();
          uni.navigateTo({ url: "/pages/login/login" });
          reject(res);
        } else {
          uni.showToast({
            title: (res.data as DataInterface<T>).msg || "数据获取失败",
            icon: "error",
          });
          reject(res);
        }
      },
      // 只有网络错误才会走到fail
      fail(res) {
        uni.showToast({
          title: "网络错误, 请换个网络试试",
          icon: "error",
        });
        reject(res);
      },
    });
  });
};
