import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./**/*.{html,njk,md,ts,js}",
    "!./node_modules/**/*",
    "!./_site/**/*",
    "!./.taskmaster/**/*",
    "!./UI_UX_GUIDE/**/*",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
