import { MODAL_TYPE } from "@interfaces/enums";
import { Accounts } from "@pages/Accounts/Index";
import { setOpenModal } from "@store/ui/ui";

const AccountsRoot = () => {
  return (
    <Accounts
      onClickAddAccount={() => {
        setOpenModal({
          open: true,
          type: MODAL_TYPE.ADD_ACCOUNT,
        });
      }}
    />
  );
};

export default AccountsRoot;
