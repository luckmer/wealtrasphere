import { type Meta, type StoryObj } from "storybook-solidjs";
import DefaultInput from "./Index";
import { createSignal } from "solid-js";

const meta: Meta<typeof DefaultInput> = {
  component: DefaultInput,
  title: "Components/Inputs/DefaultInput",
};
export default meta;
type Story = StoryObj<typeof DefaultInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = createSignal("");
    return (
      <DefaultInput
        value={value()}
        onChange={(v) => setValue(v)}
        placeholder="default input"
      />
    );
  },
};
