import { Component } from "solid-js";

export interface IProps {
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

const DefaultInput: Component<IProps> = (props) => {
  return (
    <input
      value={props.value}
      onInput={(e) => {
        props.onChange(e.target.value);
      }}
      class="w-full p-12 rounded-6 border border-solid border-black-300 bg-black-400 outline-none text-white-100"
      placeholder={props.placeholder ?? "..."}
    />
  );
};

export default DefaultInput;
