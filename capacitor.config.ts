import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "equipment.manager",
  appName: "equipment-manager",
  webDir: "build",
  bundledWebRuntime: false,
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
