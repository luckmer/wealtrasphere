import { FaSolidXmark } from "solid-icons/fa";
import { type Component } from "solid-js";

export interface IProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ModalHeader: Component<IProps> = (props) => {
  return (
    <div class="flex justify-between items-center">
      <p class="text-left text-[18px] text-white font-medium leading-[20px] not-italic">
        {props.label}
      </p>
      <div
        class="modal-action mt-[0px]"
        onClick={() => {
          props.onClick?.();
        }}
      >
        <div class="flex items-center just">
          <button class="cursor-pointer" disabled={props.disabled}>
            <p class="text-white text-left">
              <FaSolidXmark size={20} fill="#FFFFFF" />
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
