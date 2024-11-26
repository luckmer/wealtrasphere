use blockchain::{solana::rpc::RpcManager, SolanaManager};
use database::{AccountDetails, Blockchain, DeleteAccountData, NewAccount, UpdateAccountData};

pub struct AccountManager {}

impl AccountManager {
    pub fn new() -> Self {
        AccountManager {}
    }

    pub fn create_new_account(&self, new_account: NewAccount) -> Result<AccountDetails, String> {
        let chain = new_account.chain.clone();

        match chain {
            Blockchain::SOLANA => self.create_solana_account(new_account),
        }
    }

    pub fn edit_account_name(&self, account_data: UpdateAccountData) {
        database::db_commands::update_account_name(account_data);
    }

    pub fn delete_account(&self, account_data: DeleteAccountData) {
        database::db_commands::delete_account(account_data);
    }

    pub fn create_solana_account(&self, new_account: NewAccount) -> Result<AccountDetails, String> {
        if database::find_account_by_address(&new_account.account_address).is_ok() {
            return Err("Account already exists".to_string());
        }

        let rpc_manager = RpcManager::new();
        if !rpc_manager.validate_rpc_connection() {
            return Err("RPC connection is not valid, please try again later.".to_string());
        }

        let account_manager = SolanaManager::new(rpc_manager.client);
        let account = account_manager
            .create_new_account(new_account.clone())
            .map_err(|e| format!("failed to get new account: {}", e))?;

        let result = database::db_commands::insert_to_diesel(account)
            .map_err(|e| format!("failed to save account to database: {}", e))?;

        Ok(result)
    }
}
