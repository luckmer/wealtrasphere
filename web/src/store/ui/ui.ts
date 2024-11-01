import { MODAL_TYPE } from "@interfaces/enums";
import { IOpenModal } from "@interfaces/interfaces";
import { createMemo } from "solid-js";
import { createStore, produce } from "solid-js/store";

export interface IUiStore {
  openModal: IOpenModal;
}

export const defaultState: IUiStore = {
  openModal: {
    open: false,
    type: MODAL_TYPE.NONE,
  },
};

const [state, setState] = createStore<IUiStore>(defaultState);

export const setOpenModal = (data: IOpenModal) => {
  setState(
    produce((s) => {
      s.openModal = data;
    })
  );
};

export const appUiState = createMemo(() => state);
