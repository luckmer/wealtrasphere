import { type Meta, type StoryObj } from "storybook-solidjs";
import ModalHeader from "./Index";

const meta: Meta<typeof ModalHeader> = {
  component: ModalHeader,
  title: "Components/Modal/ModalHeader",
};

export default meta;
type Story = StoryObj<typeof ModalHeader>;

export const Default: Story = {
  render: () => {
    return <ModalHeader label="Modal Header" onClick={() => {}} />;
  },
};
