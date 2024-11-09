use blockchain::{solana::rpc::RpcManager, SolanaManager};
use database::{Blockchain, NewAccount};

pub struct AccountManager {}

impl AccountManager {
    pub fn new() -> Self {
        AccountManager {}
    }

    pub fn create_new_account(&self, new_account: NewAccount) -> Result<NewAccount, String> {
        let chain = new_account.chain.clone();

        match chain {
            Blockchain::SOLANA => self.create_solana_account(new_account),
        }
    }

    pub fn create_solana_account(&self, new_account: NewAccount) -> Result<NewAccount, String> {
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
            .map_err(|e| format!("{}", e))?;

        println!("new account {:?}", account);

        // stuff z konta

        // balans main konta
        // tokeny
        // historię już sformatowana
        // zapis do bazy danych

        Ok(new_account)
    }
}
