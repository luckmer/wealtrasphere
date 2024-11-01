import theme from "./common/theme";

module.exports = {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}"],
  theme: theme,
  plugins: [require("daisyui")],
};
