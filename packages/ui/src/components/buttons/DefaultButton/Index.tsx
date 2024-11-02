import { typography } from "@common/typography";
import Typography from "@components/Typography/Index";
import { VariantProps } from "class-variance-authority";
import { Component } from "solid-js";

export interface IProps {
  onClick: () => void;
  title: string;
  active?: boolean;
}

export interface ButtonProps extends IProps, VariantProps<typeof typography> {}

const DefaultButton: Component<ButtonProps> = (props) => {
  return (
    <div
      onClick={() => {
        props.onClick();
      }}
      classList={{
        "bg-purple-200 hover:bg-purple-100": props.active,
        "bg-grey-100 hover:bg-grey-200": !props.active,
      }}
      class="rounded-6 flex flex-row gap-12 p-12 px-24 group group-hover:fill-white cursor-pointer transition-rotate duration-[250ms] items-center"
    >
      <Typography {...props} color={props?.color ?? "black"}>
        {props.title}
      </Typography>
    </div>
  );
};

export default DefaultButton;
