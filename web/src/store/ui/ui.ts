import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";

export interface IUiStore {}

export const defaultState: IUiStore = {};

const [state, _] = createStore<IUiStore>(defaultState);

export const appUiState = createMemo(() => state);
