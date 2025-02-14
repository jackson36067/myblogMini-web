import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  build: {
    rollupOptions: {
      external: ["destr", "deep-pick-omit"],
    },
  },
  resolve: {
    alias: {
      destr: require.resolve("destr"),
      "deep-pick-omit": require.resolve("deep-pick-omit"),
    },
  },
});
