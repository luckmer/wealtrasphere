import { type Meta, type StoryObj } from "storybook-solidjs";
import RoundedButton from "./Index";
import { createSignal } from "solid-js";

const meta: Meta<typeof RoundedButton> = {
  component: RoundedButton,
  title: "Components/Buttons/RoundedButton",
};
export default meta;
type Story = StoryObj<typeof RoundedButton>;

export const Default: Story = {
  render: () => {
    const [rotate, setRotate] = createSignal(false);
    return (
      <RoundedButton
        rotate={rotate()}
        onclick={() => {
          setRotate((prev) => !prev);
        }}
      />
    );
  },
};
