import DefaultButton from '@components/buttons/DefaultButton/Index'
import IconButton from '@components/buttons/IconButton/Index'
import Dropdown from '@components/Dropdown/Dropdown/Index'
import DropdownList from '@components/Dropdown/DropdownList/Index'
import DefaultInput from '@components/Inputs/DefaultInput/Index'
import Modal from '@components/Modal/Index'
import Typography from '@components/Typography/Index'
import { ACCOUNT_TYPE, BLOCKCHAIN, MODAL_TYPE } from '@interfaces/enums'
import { ILoadDatabaseAccount } from '@interfaces/interfaces/database'
import { defaultAccount, setAccounts, updateAccount } from '@store/accounts/accounts'
import { accountsSelector } from '@store/accounts/selectors'
import { uiSelector } from '@store/ui/selectors'
import { setOpenModal } from '@store/ui/ui'
import { invoke } from '@tauri-apps/api'
import theme from '@theme/theme'
import { RiArrowsArrowDownSLine } from 'solid-icons/ri'
import { createMemo, createSignal, onMount } from 'solid-js'

const EditAccountModal = () => {
  const [accountName, setAccountName] = createSignal('')
  const [revert, setRevert] = createSignal<boolean>(false)

  const accountID = createMemo(() => {
    return uiSelector.openModal().id
  })

  const account = createMemo(() => {
    if (!accountID()) return defaultAccount
    const account = accountsSelector.accounts().find(({ id }) => id === accountID())
    return account ?? defaultAccount
  })

  onMount(() => {
    setAccountName(account().accountName)
  })

  const onClickDeleteAccount = async () => {
    try {
      const data = { accountData: { id: account().id } }
      const response = await invoke<ILoadDatabaseAccount[]>('delete_account', data)

      const accounts = response.map((account) => {
        return {
          id: account.id,
          balance: account.balance,
          accountName: account.account_name,
          accountAddress: account.account_address,
          chain: account.chain as BLOCKCHAIN,
        }
      })

      setAccounts(accounts)
    } catch (err) {
      console.log('failed to delete account ', err)
    }
    setOpenModal({ open: false, type: MODAL_TYPE.NONE })
  }

  const onClickEditAccount = async () => {
    try {
      if (accountName() === account().accountName) {
        setOpenModal({ open: false, type: MODAL_TYPE.NONE })
        return
      }

      const data = {
        accountData: {
          id: account().id,
          account_name: !accountName().length ? 'Wallet' : accountName(),
        },
      }

      const response = await invoke<{ id: string; account_name: string }>('edit_account', data)

      updateAccount(response.id, response.account_name)
    } catch {
      console.log('failed to update account ')
    }
    setOpenModal({ open: false, type: MODAL_TYPE.NONE })
  }

  return (
    <Modal
      isActive={uiSelector.openModal().type === MODAL_TYPE.EDIT_ACCOUNT}
      label="Edit account"
      isSending={false}
      disabled={false}
      id="id"
      onClickCloseModal={() => {
        setOpenModal({ open: false, type: MODAL_TYPE.NONE })
      }}>
      <div class="flex flex-col gap-24 pt-12">
        <div class="w-full h-auto flex flex-col gap-24">
          <div class="flex flex-col gap-12">
            <Typography text="body" color="white">
              Account name
            </Typography>
            <div class="w-full flex flex-row justify-center items-center gap-12 bg-black-400 rounded-4 pr-12">
              <DefaultInput
                onBlur={() => {
                  if (!accountName().length) {
                    setAccountName(account().accountName)
                  }
                }}
                value={accountName()}
                placeholder="Account name"
                onChange={(e) => {
                  const value = e.target.value
                  if (value.length > 50) {
                    e.target.value = accountName() ?? ''
                    return
                  }
                  if (!value.trim().length) {
                    setAccountName('')
                    return
                  }
                  setAccountName(value.trim())
                }}
              />
              <Typography text="caption" color="white">
                {accountName()?.length ?? 0}/50
              </Typography>
            </div>
          </div>
          <div class="flex flex-col gap-12">
            <Typography text="body" color="white">
              Account Type
            </Typography>
            <Dropdown
              onFocusOut={() => {
                setRevert(false)
              }}>
              <IconButton
                reverse
                styles="bg-black-400 outline-none min-h-[50px]"
                title={ACCOUNT_TYPE.BLOCKCHAIN}
                color="white"
                onClick={() => {
                  if (revert()) return
                  setRevert(true)
                }}>
                <RiArrowsArrowDownSLine
                  class="transition-rotate duration-[250ms]"
                  color={theme.colors.white[100]}
                  size={24}
                  classList={{
                    'rotate-0': !revert(),
                    'rotate-180': revert(),
                  }}
                />
              </IconButton>
              <DropdownList
                data={Object.values(ACCOUNT_TYPE)}
                onClick={() => {
                  const elem: Element | null = document.activeElement
                  if (elem instanceof HTMLElement) {
                    elem?.blur()
                  }
                }}
                activeElement={ACCOUNT_TYPE.BLOCKCHAIN}
              />
            </Dropdown>
          </div>
        </div>
        <div class="flex flex-row w-full justify-end gap-12">
          <DefaultButton
            dangerous
            title="Delete account"
            text="caption"
            color="white"
            onClick={() => {
              onClickDeleteAccount().catch(() => {})
            }}
          />
          <div class="flex flex-row gap-12">
            <DefaultButton
              active
              title="Save changes"
              text="caption"
              color="black"
              onClick={() => {
                onClickEditAccount().catch(() => {})
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default EditAccountModal
