import { createMemo } from "solid-js";
import { createStore, produce } from "solid-js/store";

export interface IAccountsStore {}

export const defaultState: IAccountsStore = {};

const [state, setState] = createStore<IAccountsStore>(defaultState);

export const setOpenModal = () => {
  setState(
    produce((s) => {
      s;
    })
  );
};

export const appAccountsState = createMemo(() => state);
