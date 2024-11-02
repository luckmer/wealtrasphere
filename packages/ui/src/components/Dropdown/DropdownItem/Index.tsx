import Typography from "@components/Typography/Index";
import { IoCheckmarkOutline } from "solid-icons/io";
import { Component, Show } from "solid-js";

export interface IProps {
  isActive?: boolean;
  onClick: () => void;
  label: string;
}

const DropdownItem: Component<IProps> = (props) => {
  return (
    <div
      class="p-12 rounded-6 cursor-pointer hover:bg-black-300 flex flex-row justify-between items-center"
      onClick={() => {
        props.onClick();
      }}
    >
      <Typography text="caption" color="white">
        {props.label}
      </Typography>
      <Show when={props.isActive}>
        <IoCheckmarkOutline color="white" size={20} />
      </Show>
    </div>
  );
};

export default DropdownItem;
