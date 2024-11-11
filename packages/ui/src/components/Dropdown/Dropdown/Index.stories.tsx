import { type Meta, type StoryObj } from "storybook-solidjs";
import Dropdown from "./Index";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: "Components/Dropdown/Dropdown",
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => {
    return (
      <Dropdown>
        <p>Dropdown</p>
      </Dropdown>
    );
  },
};
