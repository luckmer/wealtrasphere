import { BLOCKCHAIN, NATIVE_TOKEN_SYMBOL } from '@interfaces/enums'

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
}

export const shortAddress = (str: string, length: number = 10): string => {
  return `${str.slice(0, Math.floor(length / 2))}...${str.slice(-length + Math.floor(length / 2))}`
}

export const formatBalance = (amount: number, decimals: number = 6): string => {
  const units = ['', 'K', 'M', 'B', 'T']
  let unitIndex = 0

  while (Math.abs(amount) >= 1000 && unitIndex < units.length - 1) {
    amount /= 1000
    unitIndex++
  }

  return `${amount.toFixed(decimals)}${units[unitIndex]}`
}

export const getNativeTokenSymbol = (chain: BLOCKCHAIN) => {
  switch (chain) {
    case BLOCKCHAIN.SOLANA:
      return NATIVE_TOKEN_SYMBOL.SOLANA
  }
}
