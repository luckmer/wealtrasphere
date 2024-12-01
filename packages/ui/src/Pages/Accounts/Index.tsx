import MissingAccounts from '@components/MissingAccounts/Index'
import NavigationBar from '@components/NavigationBar/Index'
import { Component, createMemo, createSignal, For, Show } from 'solid-js'
import { IAccount } from '@interfaces/interfaces/accounts/index'
import Account from '@components/Account/Index'
import DefaultInput from '@components/Inputs/DefaultInput/Index'

export interface IProps {
  onClickEditAccount: (id: string) => void
  onClickOpenAccount: (id: string) => void
  onClickAddAccount: () => void
  accounts: IAccount[]
  isFetching: boolean
}

export const Accounts: Component<IProps> = (props) => {
  const [filter, setFilter] = createSignal('')

  const filteredAccounts = createMemo(() => {
    return props.accounts.filter(
      (account) =>
        account.accountName.toLowerCase().includes(filter().toLowerCase()) ||
        account.accountAddress.toLowerCase().includes(filter().toLowerCase())
    )
  })

  return (
    <div class="flex flex-col h-full items-center gap-[12px]">
      <NavigationBar onClickAddAccount={props.onClickAddAccount} />
      <Show
        when={props.accounts.length}
        fallback={
          <div class="w-full h-full flex justify-center items-center">
            <MissingAccounts onClickAddAccount={props.onClickAddAccount} />
          </div>
        }>
        <Show
          when={!props.isFetching}
          fallback={
            <div class="flex flex-row justify-center items-center gap-12">
              <span class="loading loading-ring loading-sm"></span>
              <span class="loading loading-ring loading-sm"></span>
              <span class="loading loading-ring loading-sm"></span>
              <span class="loading loading-ring loading-sm"></span>
            </div>
          }>
          <div class="w-full flex flex-col overflow-y-auto pr-16 gap-12">
            <DefaultInput
              placeholder="Search..."
              value={filter()}
              onChange={(e) => {
                setFilter(e.target.value)
              }}
            />
            <div class="w-full grid-cols min-[810px]:grid-cols-2 min-[1600px]:grid-cols-4 grid gap-6 ">
              <For each={filteredAccounts()}>
                {(account) => (
                  <Account
                    {...account}
                    onClick={() => {
                      props.onClickOpenAccount(account.id)
                    }}
                    onClickEditAccount={() => {
                      props.onClickEditAccount(account.id)
                    }}
                  />
                )}
              </For>
            </div>
          </div>
        </Show>
      </Show>
    </div>
  )
}

export default Accounts
