import { MODAL_TYPE } from "@interfaces/enums";
import { Accounts } from "@pages/Accounts/Index";
import { accountsSelector } from "@store/accounts/selectors";
import { uiSelector } from "@store/ui/selectors";
import { setOpenModal } from "@store/ui/ui";

export const AccountsRoot = () => {
  return (
    <Accounts
      isFetching={uiSelector.isFetchingDatabase()}
      accounts={accountsSelector.accounts()}
      onClickOpenAccount={(id) => {
        console.log(id);
      }}
      onClickEditAccount={(id) => {
        setOpenModal({
          type: MODAL_TYPE.EDIT_ACCOUNT,
          open: true,
          id,
        });
      }}
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
