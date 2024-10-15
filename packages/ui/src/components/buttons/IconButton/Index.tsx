import { ParentComponent } from "solid-js";

export interface IProps {
  title: string;
  hideText?: boolean;
  active: boolean;
}

const IconButton: ParentComponent<IProps> = (props) => {
  return (
    <div
      class="rounded-6 flex flex-row gap-12 p-12 group group-hover:fill-white cursor-pointer transition-rotate duration-[250ms]"
      classList={{
        "bg-black-300": props.active,
      }}
    >
      {props.children}
      <div
        class="transition-opacity duration-[250ms] ease-in-out "
        classList={{
          "w-[0px] opacity-0 invisible absolute": props.hideText,
        }}
      >
        <p
          class="not-italic text-[14px] group-hover:text-white-100 font-medium tracking-[0.02em]"
          classList={{
            "font-medium text-white-100": props.active,
            "font-medium text-black-200": !props.active,
          }}
        >
          {props.title}
        </p>
      </div>
    </div>
  );
};

export default IconButton;
