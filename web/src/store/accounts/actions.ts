import { invoke } from "@tauri-apps/api";
import { setAccounts } from "./accounts";
import { ILoadDatabase } from "@interfaces/interfaces/database";
import { setIsFetchingDatabase } from "@store/ui/ui";

export const fetchDatabaseAccounts = async () => {
  try {
    setIsFetchingDatabase(true);
    const response = await invoke<ILoadDatabase>("load_database");
    const accounts = response.accounts.map((account) => {
      return {
        id: account.id,
        balance: account.balance,
        accountName: account.account_name,
        accountAddress: account.account_address,
        chain: account.chain,
      };
    });
    setAccounts(accounts);
  } catch {
    setAccounts([]);
  } finally {
    setIsFetchingDatabase(false);
  }
};
