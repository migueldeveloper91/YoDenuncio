import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.codigoconproposito.yodenuncio",
  appName: "YoDenuncio",
  webDir: "dist",

  plugins: {
    GoogleMaps: {
      apiKey: "AIzaSyCP32R8QUUoOqYvvHRXylJ7FIVuaEYSkIQ", // 👈 agrega tu API KEY de Maps aquí
    },
  },
};

export default config;
