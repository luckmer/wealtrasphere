export interface ILoadDatabaseAccount {
  account_address: string
  account_name: string
  balance: number
  chain: string
  id: string
}

export interface ILoadDatabase {
  accounts: ILoadDatabaseAccount[]
}
