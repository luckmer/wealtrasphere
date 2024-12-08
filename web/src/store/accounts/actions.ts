import { BLOCKCHAIN } from '@interfaces/enums'
import { invoke } from '@tauri-apps/api'

export const loadAccounts = async (addresses: string[], chain: BLOCKCHAIN) => {
  try {
    let response = await invoke('load_accounts', { addresses, chain })
    console.log(response)
  } catch (err) {
    console.log('failed to load account', err)
  } finally {
    //
  }
}
