import { Component } from "solid-js";
import { FaSolidArrowLeft } from "solid-icons/fa";

export interface IProps {
  onclick: () => void;
  rotate?: boolean;
}

const RoundedButton: Component<IProps> = (props) => {
  return (
    <div
      classList={{
        "rotate-180": props.rotate,
      }}
      class="rounded-100 bg-black-300 flex p-12 group group-hover:fill-white cursor-pointer  transition-rotate duration-[250ms]"
      onclick={() => {
        props.onclick();
      }}
    >
      <FaSolidArrowLeft
        fill="grey"
        size={16}
        class="group-hover:fill-[#fff] transition-fill duration-[250ms]"
      />
    </div>
  );
};

export default RoundedButton;
