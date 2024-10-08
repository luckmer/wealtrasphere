const theme = require("./common/theme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  theme: {
    ...theme,
  },
  plugins: [],
};
