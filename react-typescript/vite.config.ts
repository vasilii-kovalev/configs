import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "hooks/": "/src/hooks/",
      "mocks/": "/src/mocks/",
      "models/": "/src/models/",
      "pages/": "/src/pages/",
      "services/": "/src/services/",
      "templates/": "/src/templates/",
      "types/": "/src/types/",
      "utils/": "/src/utils/",
    },
  },
});

export default viteConfig;
