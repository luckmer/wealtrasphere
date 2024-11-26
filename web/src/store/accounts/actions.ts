import { BLOCKCHAIN } from '@interfaces/enums'
import { ILoadDatabaseAccount } from '@interfaces/interfaces/database'
import { invoke } from '@tauri-apps/api'

export const loadAccountProfiles = async (accounts: ILoadDatabaseAccount[]) => {
  try {
    for (const account of accounts) {
      try {
        let responses = await invoke('load_account', {
          address: account.account_address,
          chain: BLOCKCHAIN.SOLANA,
        })

        console.log(responses)
      } catch (err) {
        console.log(err)
      }
    }
  } catch (error) {
    console.error('Error loading accounts:', error)
  } finally {
    //
  }
}

export const loadAccount = async (address: string, chain: BLOCKCHAIN) => {
  try {
    let response = await invoke('load_account', { address, chain })
    console.log(response)
  } catch (err) {
    console.log('failed to load account', err)
  } finally {
    //
  }
}
