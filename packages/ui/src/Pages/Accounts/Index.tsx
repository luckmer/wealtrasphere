import MissingAccounts from "@components/MissingAccounts/Index";
import NavigationBar from "@components/NavigationBar/Index";
import { Component, For, Show } from "solid-js";
import { IAccount } from "@interfaces/interfaces/accounts/index";
import Account from "@components/Account/Index";

export interface IProps {
  onClickEditAccount: (id: string) => void;
  onClickOpenAccount: (id: string) => void;
  onClickAddAccount: () => void;
  accounts: IAccount[];
  isFetching: boolean;
}

export const Accounts: Component<IProps> = (props) => {
  return (
    <div class="flex flex-col h-full items-center gap-[48px]">
      <NavigationBar onClickAddAccount={props.onClickAddAccount} />
      <Show
        when={props.accounts.length}
        fallback={
          <div class="w-full h-full flex justify-center items-center">
            <MissingAccounts onClickAddAccount={props.onClickAddAccount} />
          </div>
        }
      >
        <Show
          when={!props.isFetching}
          fallback={
            <div class="flex flex-row justify-center items-center gap-12">
              <span class="loading loading-ring loading-sm"></span>
              <span class="loading loading-ring loading-sm"></span>
              <span class="loading loading-ring loading-sm"></span>
              <span class="loading loading-ring loading-sm"></span>
            </div>
          }
        >
          <div class="w-full overflow-y-auto">
            <div class="w-full grid-cols- min-[810px]:grid-cols-2 min-[1600px]:grid-cols-4 grid gap-6 pr-16">
              <For each={props.accounts}>
                {(account) => (
                  <Account
                    {...account}
                    onClick={() => {
                      props.onClickOpenAccount(account.id);
                    }}
                    onClickEditAccount={() => {
                      props.onClickEditAccount(account.id);
                    }}
                  />
                )}
              </For>
            </div>
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default Accounts;
