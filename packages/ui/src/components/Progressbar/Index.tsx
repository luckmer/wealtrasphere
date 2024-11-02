import { Component } from "solid-js";

interface IProps {
  step: number;
}

const Progressbar: Component<IProps> = (props) => {
  return (
    <ul class="steps">
      <li
        data-content="1"
        class="step"
        classList={{
          "step-primary": props.step >= 1,
          "step-neutral": props.step < 1,
        }}
      >
        Account Type
      </li>
      <li
        data-content="2"
        class="step"
        classList={{
          "step-primary": props.step >= 2,
          "step-neutral": props.step < 2,
        }}
      >
        Account name
      </li>
      <li
        data-content="3"
        class="step step-neutral"
        classList={{
          "step-primary": props.step >= 3,
          "step-neutral": props.step < 3,
        }}
      >
        Address / csv
      </li>
      <li
        data-content="4"
        class="step step-neutral"
        classList={{
          "step-primary": props.step >= 4,
          "step-neutral": props.step < 4,
        }}
      >
        Upload
      </li>
    </ul>
  );
};

export default Progressbar;
