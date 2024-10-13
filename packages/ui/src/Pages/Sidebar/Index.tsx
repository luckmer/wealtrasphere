import IconButton from "@components/buttons/IconButton/Index";
import RoundedButton from "@components/buttons/RoundedButton/Index";
import { AiOutlineHome } from "solid-icons/ai";
import { Component, createSignal } from "solid-js";
import { NAVIGATION } from "@interfaces/enums/index";

export interface IProps {
  navigation: NAVIGATION;
}

const Sidebar: Component<IProps> = (props) => {
  const [rotate, setRotate] = createSignal<boolean>(true);
  const [showButton, setShowButton] = createSignal(false);
  const [showText, setShowText] = createSignal(true);

  return (
    <div
      onTransitionEnd={(e) => {
        if (e.propertyName !== "width") return;
        if (rotate()) {
          setShowText(true);
        }
      }}
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
      class="h-full bg-black-400 p-24 flex flex-col relative transition-width duration-[350ms] ease-in-out"
      classList={{ "w-[225px]": rotate(), "w-full": !rotate() }}
    >
      <div
        class="absolute top-[30px] -translate-y-1/2 right-[-20px] transition-opacity duration-[350ms] ease-in-out"
        classList={{
          "opacity-0 invisible": !showButton(),
          "opacity-100 visible": showButton(),
        }}
      >
        <RoundedButton
          rotate={!rotate()}
          onclick={() => {
            setRotate((prev) => !prev);
            setShowText(false);
          }}
        />
      </div>
      <div class="pt-[30px] flex flex-col gap-[12px]">
        <div
          class="transition-opacity duration-[350ms] ease-in-out pb-[12px]"
          classList={{
            "w-[0px] opacity-0 invisible": !showText(),
          }}
        >
          <p class="text-white-100 text-[10px] font-bold tracking-[0.02em]">
            NAVIGATION
          </p>
        </div>
        <IconButton
          title={showText() ? "Dashboard" : ""}
          active={props.navigation === NAVIGATION.DASHBOARD}
          hideText={!showText()}
        >
          <AiOutlineHome
            size={21}
            fill={
              props.navigation === NAVIGATION.DASHBOARD ? "#817DF7" : "grey"
            }
            class="group-hover:fill-purple-100"
          />
        </IconButton>
        <IconButton
          title={showText() ? "Accounts" : ""}
          active={props.navigation === NAVIGATION.ACCOUNTS}
          hideText={!showText()}
        >
          <AiOutlineHome
            size={21}
            fill={props.navigation === NAVIGATION.ACCOUNTS ? "#817DF7" : "grey"}
            class="group-hover:fill-purple-100"
          />
        </IconButton>
        <IconButton
          title={showText() ? "Settings " : ""}
          active={props.navigation === NAVIGATION.SETTINGS}
          hideText={!showText()}
        >
          <AiOutlineHome
            size={21}
            fill={props.navigation === NAVIGATION.SETTINGS ? "#817DF7" : "grey"}
            class="group-hover:fill-purple-100"
          />
        </IconButton>
      </div>
    </div>
  );
};

export default Sidebar;
