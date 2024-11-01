import MissingAccounts from "@components/MissingAccounts/Index";
import NavigationBar from "@components/NavigationBar/Index";
import { Component } from "solid-js";

export interface IProps {
  onClickAddAccount: () => void;
}

export const Accounts: Component<IProps> = (props) => {
  return (
    <div class="flex flex-col h-full items-center gap-[48px] ">
      <NavigationBar onClickAddAccount={props.onClickAddAccount} />
      <div class="w-full h-full flex justify-center items-center">
        <MissingAccounts onClickAddAccount={props.onClickAddAccount} />
      </div>
    </div>
  );
};

export default Accounts;
