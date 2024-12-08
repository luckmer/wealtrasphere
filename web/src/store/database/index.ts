import { BLOCKCHAIN } from '@interfaces/enums'
import { ILoadDatabase } from '@interfaces/interfaces/database'
import { setAccounts } from '@store/accounts/accounts'
import { loadAccounts } from '@store/accounts/actions'
import { setIsFetchingDatabase } from '@store/ui/ui'
import { invoke } from '@tauri-apps/api'

export const getDatabaseResponse = async (): Promise<ILoadDatabase | undefined> => {
  try {
    setIsFetchingDatabase(true)
    const response = await loadDatabaseAccounts()
    return response
  } catch {
    //add notyfications
    setAccounts([])
    return undefined
  } finally {
    setIsFetchingDatabase(false)
  }
}

export const loadDatabaseAccounts = async (): Promise<ILoadDatabase> => {
  const response = await invoke<ILoadDatabase>('load_database')
  const accounts = response.accounts.map((account) => {
    return {
      id: account.id,
      balance: account.balance,
      accountName: account.account_name,
      accountAddress: account.account_address,
      chain: account.chain as BLOCKCHAIN,
    }
  })
  setAccounts(accounts)

  return response
}

export const loadDatabase = async () => {
  const data = await getDatabaseResponse()
  if (typeof data !== 'undefined') {
    const groupedByChain = data.accounts.reduce((acc, account) => {
      if (!acc[account.chain]) {
        acc[account.chain] = []
      }
      acc[account.chain].push(account.account_address)
      return acc
    }, {} as Record<BLOCKCHAIN, string[]>)

    const chainTokensArray = Object.entries(groupedByChain).map(([chain, addresses]) => ({
      chain: chain as BLOCKCHAIN,
      addresses,
    }))

    for (const { chain, addresses } of chainTokensArray) {
      await loadAccounts(addresses, chain)
    }
  }
}
