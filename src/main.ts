import { createSSRApp } from "vue";
import App from "./App.vue";
import pinia from "./stores";
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  return {
    app,
  };
}

// 在项目的入口文件中添加以下代码
if (!Array.prototype.at) {
  Array.prototype.at = function (index: number) {
    return index < 0 ? this[this.length + index] : this[index];
  };
}
