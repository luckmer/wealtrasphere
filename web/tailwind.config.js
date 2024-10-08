const theme = require("../packages/ui/common/theme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  theme: {
    extend: {
      ...theme,
    },
  },
  plugins: [],
};
