import Typography from "@components/Typography/Index";
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
        <Typography color="grey" class="h-[17px]" text="smallBold">
          {props.label}
        </Typography>
      </div>
      <div>
        <Typography color="grey" class="h-[17px]" text="smallBold">
          {props.label}
        </Typography>
      </div>
    </div>
  );
};

export default TokenInfoCard;
