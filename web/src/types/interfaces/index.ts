import { ACCOUNT_TYPE, BLOCKCHAIN, MODAL_TYPE } from "@interfaces/enums";
export interface INewAccount {
  account_address: string;
  chain: BLOCKCHAIN;
  account_type: ACCOUNT_TYPE;
  account_name: string;
  id: string;
}

export interface IOpenModal {
  open: boolean;
  type: MODAL_TYPE;
}
