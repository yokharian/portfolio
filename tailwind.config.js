/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,njk,md}",
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
