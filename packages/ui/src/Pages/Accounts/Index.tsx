import MissingAccounts from "@components/MissingAccounts/Index";
import NavigationBar from "@components/NavigationBar/Index";
import { Component, Show } from "solid-js";

export interface IProps {
  onClickAddAccount: () => void;
  accounts: any[];
}

export const Accounts: Component<IProps> = (props) => {
  return (
    <div class="flex flex-col h-full items-center gap-[48px] ">
      <NavigationBar onClickAddAccount={props.onClickAddAccount} />
      <Show
        when={props.accounts.length}
        fallback={
          <div class="w-full h-full flex justify-center items-center">
            <MissingAccounts onClickAddAccount={props.onClickAddAccount} />
          </div>
        }
      >
        <div>accounts (soon)</div>
      </Show>
    </div>
  );
};

export default Accounts;
