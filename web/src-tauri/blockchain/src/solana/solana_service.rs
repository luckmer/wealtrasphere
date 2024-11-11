use database::{AccountDetails, NewAccount};
use solana_client::rpc_client::RpcClient;
use solana_sdk::native_token::lamports_to_sol;
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

pub struct SolanaManager {
    client: RpcClient,
}

impl SolanaManager {
    pub fn new(rpc_client: RpcClient) -> Self {
        SolanaManager { client: rpc_client }
    }

    pub fn create_new_account(&self, new_account: NewAccount) -> Result<AccountDetails, String> {
        let address = new_account.account_address.to_string();
        let pubkey = Pubkey::from_str(&address).unwrap();

        Ok(AccountDetails {
            balance: self.get_balance(&pubkey).unwrap(),
            id: new_account.id,
            account_address: new_account.account_address,
            account_name: new_account.account_name,
            chain: "SOLANA".to_string(),
        })
    }

    pub fn get_balance(&self, public_key: &Pubkey) -> Result<f64, f64> {
        match self.client.get_balance(&public_key) {
            Ok(balance) => Ok(lamports_to_sol(balance)),
            Err(err) => {
                println!("Failed to get balance: {}", err);
                Ok(0.0)
            }
        }
    }
}
