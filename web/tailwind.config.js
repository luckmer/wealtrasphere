import theme from "../packages/ui/common/theme";

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../packages/ui/**/*.{ts,tsx}",
  ],
  theme: theme,
  plugins: [require("daisyui")],
};
