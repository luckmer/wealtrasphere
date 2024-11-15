import ModalHeader from "@components/ModalHeader/Index";
import { createEffect, ParentComponent } from "solid-js";

export interface IProps {
  onClickCloseModal: () => void;
  isSending?: boolean;
  isActive: boolean;
  disabled: boolean;
  label: string;
  id: string;
}

export const Modal: ParentComponent<IProps> = (props) => {
  createEffect(() => {
    if (props.isActive) {
      const el = document.getElementById(props.id);
      if (el instanceof HTMLDialogElement) {
        el.showModal();
      }
    }
  });

  return (
    <dialog id={props.id} class="modal select-none">
      <div class="absolute bg-transparent overflow-visible">
        <div class="min-w-[600px] bg-black-300 p-12 rounded-6 border border-solid border-black-400 z-10 flex flex-col gap-12">
          <ModalHeader
            disabled={props.disabled}
            label={props.label}
            onClick={() => {
              props.onClickCloseModal();
            }}
          />
          {props.children}
        </div>
      </div>
      <div
        class="modal-backdrop"
        onClick={() => {
          props.onClickCloseModal();
        }}
      >
        <button
          class="cursor-default outline-none"
          disabled={props.isSending}
        />
      </div>
    </dialog>
  );
};

export default Modal;
