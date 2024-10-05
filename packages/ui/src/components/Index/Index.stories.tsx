import { type Meta, type StoryObj } from "storybook-solidjs";
import Hello from "./Index";

const meta: Meta<typeof Hello> = {
  component: Hello,
  title: "Components/Hello",
};
export default meta;
type Story = StoryObj<typeof Hello>;

export const Empty: Story = {
  render: () => {
    return <Hello />;
  },
};
