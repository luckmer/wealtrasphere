import { BLOCKCHAIN } from '@interfaces/enums'

export interface ILoadDatabaseAccount {
  account_address: string
  account_name: string
  balance: number
  chain: BLOCKCHAIN
  id: string
}

export interface ILoadDatabase {
  accounts: ILoadDatabaseAccount[]
}
