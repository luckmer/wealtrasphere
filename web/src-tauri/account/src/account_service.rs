use blockchain::{solana::rpc::RpcManager, SolanaManager};
use database::{AccountDetails, Blockchain, NewAccount};
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

    pub fn create_solana_account(&self, new_account: NewAccount) -> Result<AccountDetails, String> {
        let rpc_client = RpcManager::new();
        let status = rpc_client.validate_rpc_connection();

        if !status {
            return Err(String::from(
                "RPC connection is not valid, please try again later.",
            ));
        }

        let account_manager = SolanaManager::new(rpc_client.client);

        let account = account_manager
            .get_new_account(new_account.clone())
            .map_err(|e| format!("failed to get new account: {}", e))?;

        let result =
            database::db_commands::insert_to_diesel(account).map_err(|e| format!("{}", e))?;

        Ok(result)
    }
}
