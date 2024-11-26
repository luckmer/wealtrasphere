import { appAccountsState } from './accounts'
import { createStoreSelectors } from '../utils'

export const accountsSelector = createStoreSelectors(appAccountsState)
