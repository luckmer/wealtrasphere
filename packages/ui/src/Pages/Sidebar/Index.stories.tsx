import { type Meta, type StoryObj } from "storybook-solidjs";
import Sidebar from "./Index";
import { NAVIGATION } from "@interfaces/enums";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: "Pages/Sidebar",
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => {
    return <Sidebar navigation={NAVIGATION.DASHBOARD} />;
  },
};
