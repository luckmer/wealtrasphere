import { ACCOUNT_TYPE, BLOCKCHAIN } from "@interfaces/enums";

export interface IAccount {
  id: string;
  balance: number;
  accountName: string;
  accountAddress: string;
  chain: BLOCKCHAIN;
}

export interface INewAccount {
  account_address: string;
  chain: BLOCKCHAIN;
  account_type: ACCOUNT_TYPE;
  account_name: string;
  id: string;
}
