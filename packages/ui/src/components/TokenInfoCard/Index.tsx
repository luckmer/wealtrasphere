import { Component } from "solid-js";

export interface IProps {
  isFirst?: boolean;
  label: string;
  description: string;
}

const TokenInfoCard: Component<IProps> = (props) => {
  return (
    <div
      class="bg-black-300 p-[14px] cursor-default flex flex-row w-full justify-between"
      classList={{
        "rounded-b-16": typeof props.isFirst !== "undefined" && !props.isFirst,
        "rounded-t-16": typeof props.isFirst !== "undefined" && props.isFirst,
      }}
    >
      <div>
        <p class="text-black-200 text-[12px] font-bold tracking-[0.02em] h-[17px]">
          {props.label}
        </p>
      </div>
      <div>
        <p class="text-white-100 text-[12px] font-bold tracking-[0.02em] h-[17px]">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default TokenInfoCard;
