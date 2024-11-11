import theme from "../packages/ui/common/theme";

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../packages/ui/**/*.{ts,tsx}",
    "!**/node_modules/**",
  ],
  theme: theme,
  plugins: [require("daisyui")],
};
