import { ParentComponent } from "solid-js";

export interface IProps {
  title: string;
}

const IconButton: ParentComponent<IProps> = (props) => {
  return (
    <div class="rounded-6 flex flex-row justify-center items-center gap-12 p-12 group group-hover:fill-white cursor-pointer transition-rotate duration-[250ms] w-full">
      <div>{props.children}</div>
      <div>
        <p class="not-italic text-[14px] font-medium text-black-200">
          {props.title}
        </p>
      </div>
    </div>
  );
};

export default IconButton;
