import { BLOCKCHAIN } from "@interfaces/enums";
import { IAccount } from "@interfaces/interfaces/accounts";
import { createMemo } from "solid-js";
import { createStore, produce } from "solid-js/store";

export interface IAccountsStore {
  accounts: IAccount[];
}

export const defaultAccount = {
  id: "----",
  balance: 0,
  accountName: "----",
  accountAddress: "----",
  chain: BLOCKCHAIN.UNKNOWN,
};

export const defaultState: IAccountsStore = {
  accounts: [],
};

const [state, setState] = createStore<IAccountsStore>(defaultState);

export const setAccounts = (accounts: IAccount[]) => {
  setState(
    produce((s) => {
      s.accounts = accounts;
    })
  );
};

export const appAccountsState = createMemo(() => state);
