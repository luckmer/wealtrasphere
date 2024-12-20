import { join, dirname } from "path";
import { mergeConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('storybook-solidjs-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("storybook-solidjs-vite"),
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      define: { "process.env.NODE_DEBUG": "false" },
      plugins: [tsconfigPaths()],
    });
  },
};
export default config;
