export enum NAVIGATION {
  DASHBOARD = "/",
  SETTINGS = "/settings",
  ACCOUNTS = "/accounts",
}

export enum MODAL_TYPE {
  EDIT_ACCOUNT = "EDIT_ACCOUNT",
  ADD_ACCOUNT = "ADD_ACCOUNT",
  NONE = "NONE",
}

export enum ADD_ACCOUNT {
  INIT = "INIT",
  ACCOUNT_NAME = "ACCOUNT_NAME",
  ADDRESS = "ADDRESS",
  UPLOAD = "UPLOAD",
}

export enum ACCOUNT_TYPE {
  BLOCKCHAIN = "Blockchain",
}

export enum BLOCKCHAIN {
  SOLANA = "SOLANA",
  UNKNOWN = "UNKNOWN",
}

export enum NATIVE_TOKEN_SYMBOL {
  SOLANA = "SOL",
}
