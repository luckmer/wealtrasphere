import { typography } from "@common/typography";
import Typography from "@components/Typography/Index";
import { VariantProps } from "class-variance-authority";
import { Component, Show } from "solid-js";

export interface IProps {
  onClick: () => void;
  title: string;
  active?: boolean;
  styles?: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface ButtonProps extends IProps, VariantProps<typeof typography> {}

const DefaultButton: Component<ButtonProps> = (props) => {
  console.log(props.loading);
  return (
    <button
      disabled={props.disabled}
      onClick={() => {
        props.onClick();
      }}
      classList={{
        "bg-purple-200 hover:bg-purple-100": props.active,
        "bg-grey-100 hover:bg-grey-200": !props.active,
        "!cursor-default": props.disabled,
      }}
      class={
        "rounded-6 outline-none flex flex-row gap-12 p-12  group group-hover:fill-white cursor-pointer transition-rotate duration-[250ms] items-center"
      }
    >
      <Show
        when={props.loading}
        fallback={
          <Typography {...props} color={props?.color ?? "black"}>
            {props.title}
          </Typography>
        }
      >
        <div class="flex w-[51px] h-[16px] justify-center items-center">
          <span class="loading loading-bars loading-xs"></span>
        </div>
      </Show>
    </button>
  );
};

export default DefaultButton;
