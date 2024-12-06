import { MODAL_TYPE } from '@interfaces/enums'
import { type IOpenModal } from '@interfaces/interfaces/ui'
import { createMemo } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export interface IUiStore {
  isFetchingDatabase: boolean
  openModal: IOpenModal
}

export const defaultState: IUiStore = {
  isFetchingDatabase: true,
  openModal: {
    open: false,
    type: MODAL_TYPE.NONE,
  },
}

const [state, setState] = createStore<IUiStore>(defaultState)

export const setOpenModal = (data: IOpenModal) => {
  setState(
    produce((s) => {
      s.openModal = data
    })
  )
}

export const setIsFetchingDatabase = (status: boolean) => {
  setState(
    produce((s) => {
      s.isFetchingDatabase = status
    })
  )
}

export const appUiState = createMemo(() => state)
