import { MODAL_TYPE } from "@interfaces/enums";
import { uiSelector } from "@store/ui/selectors";
import { Modal } from "@components/Modal/Index";
import { setOpenModal } from "@store/ui/ui";
import Progressbar from "@components/Progressbar/Index";

// TODO: create missing logic

const AddAccountModal = () => {
  return (
    <Modal
      label="Add account"
      disabled={false}
      isSending={false}
      id="id"
      isActive={uiSelector.openModal().type === MODAL_TYPE.ADD_ACCOUNT}
      onClickCloseModal={() => {
        setOpenModal({ open: false, type: MODAL_TYPE.NONE });
      }}
    >
      <Progressbar />
      <div>
        <p>asdasd</p>
      </div>
    </Modal>
  );
};

export default AddAccountModal;
