import daisyui from "npm:daisyui";
import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["cupcake"],
  },
} satisfies Config;
