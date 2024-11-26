import { MODAL_TYPE } from '@interfaces/enums'

export interface IOpenModal {
  open: boolean
  type: MODAL_TYPE
  id?: string
}
