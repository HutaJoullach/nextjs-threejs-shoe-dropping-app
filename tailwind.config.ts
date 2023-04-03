import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // variants: {
  //   fill: ["hover", "focus"], // this line is for hover state
  // },
  plugins: [],
} satisfies Config;
