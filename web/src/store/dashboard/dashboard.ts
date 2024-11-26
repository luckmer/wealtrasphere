import { createMemo } from "solid-js";
import { createStore, produce } from "solid-js/store";

export interface IDashboardStore {}

export const defaultState: IDashboardStore = {};

const [state, setState] = createStore<IDashboardStore>(defaultState);

export const setAccounts = () => {
  setState(
    produce((s) => {
      s = defaultState;
    })
  );
};

export const appDashboardState = createMemo(() => state);
