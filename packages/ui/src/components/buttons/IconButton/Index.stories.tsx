import { AiOutlineHome } from "solid-icons/ai";
import { type Meta, type StoryObj } from "storybook-solidjs";
import IconButton from "./Index";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "Components/Buttons/IconButton",
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: () => {
    return (
      <IconButton active={false} title="Portfolio">
        <AiOutlineHome
          fill="grey"
          class="group-hover:fill-purple-100"
          size={21}
        />
      </IconButton>
    );
  },
};
