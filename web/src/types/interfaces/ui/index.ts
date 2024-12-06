import { BLOCKCHAIN, MODAL_TYPE } from '@interfaces/enums'

export interface IOpenModal {
  open: boolean
  type: MODAL_TYPE
  id?: string
}

export interface IDashboardToken {
  address: string
  label: string
  img: string
}

export interface IDashboardTokens {
  tokens: IDashboardToken[]
  chain: BLOCKCHAIN
}
