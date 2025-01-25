import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "Progress.Tag",
  appName: "Progress-Tag",
  webDir: "build",
  bundledWebRuntime: false,
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
