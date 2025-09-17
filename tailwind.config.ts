import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
    "!./node_modules/**/*",
    "!./dist/**/*",
    "!./.taskmaster/**/*",
    "!./UI_UX_GUIDE/**/*",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
