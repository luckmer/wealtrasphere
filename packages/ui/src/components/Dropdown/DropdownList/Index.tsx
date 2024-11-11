import { Component, For } from "solid-js";
import DropdownItem from "../DropdownItem/Index";
import { ACCOUNT_TYPE } from "@interfaces/enums";

export interface IProps {
  onClick: (name: ACCOUNT_TYPE) => void;
  activeElement: string;
  data: ACCOUNT_TYPE[];
}

const DropdownList: Component<IProps> = (props) => {
  return (
    <div
      tabIndex={0}
      class=" dropdown-content w-full p-[12px] rounded-6 top-[55px] bg-black-400"
    >
      <For each={props.data}>
        {(data) => (
          <DropdownItem
            label={data}
            isActive={data === props.activeElement}
            onClick={() => {
              props.onClick(data);
            }}
          />
        )}
      </For>
    </div>
  );
};

export default DropdownList;
