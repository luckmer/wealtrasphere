import { type Meta, type StoryObj } from "storybook-solidjs";
import RoundedButton from "./Index";

const meta: Meta<typeof RoundedButton> = {
  component: RoundedButton,
  title: "Components/Buttons/roundedButton",
};
export default meta;
type Story = StoryObj<typeof RoundedButton>;

export const Empty: Story = {
  render: () => {
    return <RoundedButton />;
  },
};
