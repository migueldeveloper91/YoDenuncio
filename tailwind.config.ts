import { type Config } from "tailwindcss";

export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./src/**/*.css" 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
