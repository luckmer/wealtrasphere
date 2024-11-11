import { MODAL_TYPE } from "@interfaces/enums";
import { uiSelector } from "@store/ui/selectors";
import { Match, Show, Switch } from "solid-js";
import AddAccountModal from "./AddAccountModal";

const ModalRoot = () => {
  return (
    <Show when={uiSelector.openModal().open}>
      <div class="absolute top-0 left-0 z-[99]">
        <Switch>
          <Match when={uiSelector.openModal().type === MODAL_TYPE.ADD_ACCOUNT}>
            <AddAccountModal />
          </Match>
        </Switch>
      </div>
    </Show>
  );
};

export default ModalRoot;
