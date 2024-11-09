use database::NewAccount;
use solana_client::rpc_client::RpcClient;
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

pub struct SolanaManager {
    client: RpcClient,
}

impl SolanaManager {
    pub fn new(rpc_client: RpcClient) -> Self {
        SolanaManager { client: rpc_client }
    }

    pub fn get_new_account(&self, new_account: NewAccount) -> Result<u64, u64> {
        let address = new_account.account_address.to_string();
        let pubkey = Pubkey::from_str(&address).unwrap();

        self.get_balance(&pubkey)
    }

    pub fn get_balance(&self, pubkey: &Pubkey) -> Result<u64, u64> {
        match self.client.get_balance(&pubkey) {
            Ok(balance) => Ok(balance),
            Err(err) => {
                println!("Failed to get balance: {}", err);
                Ok(0)
            }
        }
    }
}
