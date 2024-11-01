import { type Meta, type StoryObj } from "storybook-solidjs";
import Modal from "./Index";

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: "Components/Modal/Modal",
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    return (
      <Modal
        onClickCloseModal={() => {}}
        isActive={true}
        disabled={false}
        label="Label"
        id="id"
      >
        <div>asd</div>
      </Modal>
    );
  },
};
