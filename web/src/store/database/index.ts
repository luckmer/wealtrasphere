import { BLOCKCHAIN } from "@interfaces/enums";
import {
  ILoadDatabase,
  ILoadDatabaseAccount,
} from "@interfaces/interfaces/database";
import { setAccounts } from "@store/accounts/accounts";
import { setIsFetchingDatabase } from "@store/ui/ui";
import { invoke } from "@tauri-apps/api";

export const getDatabaseResponse = async () => {
  try {
    setIsFetchingDatabase(true);
    const response = await invoke<ILoadDatabase>("load_database");
    const accounts = response.accounts.map((account) => {
      return {
        id: account.id,
        balance: account.balance,
        accountName: account.account_name,
        accountAddress: account.account_address,
        chain: account.chain as BLOCKCHAIN,
      };
    });
    setAccounts(accounts);

    return response;
  } catch {
    //add notyfications
    setAccounts([]);
    return undefined;
  } finally {
    setIsFetchingDatabase(false);
  }
};

export const loadDatabase = async () => {
  const data = await getDatabaseResponse();

  if (typeof data !== "undefined") {
    await loadAccounts(data.accounts);
  }
};

export const loadAccounts = async (accounts: ILoadDatabaseAccount[]) => {
  try {
    for (const account of accounts) {
      try {
        let responses = await invoke("load_account", {
          address: account.account_address,
          chain: BLOCKCHAIN.SOLANA,
        });

        console.log(responses);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (error) {
    console.error("Error loading accounts:", error);
  } finally {
    console.log("got accounts");
  }
};
