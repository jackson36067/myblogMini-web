import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), tailwindcss()],
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
