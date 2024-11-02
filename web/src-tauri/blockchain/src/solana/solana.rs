use crate::SolanaRpcManager;
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

pub struct SolanaManager {}

impl SolanaManager {
    pub fn init_connection() -> SolanaRpcManager {
        SolanaRpcManager::new()
    }

    pub fn get_wallet_balance(address: &str) -> Result<u64, String> {
        let rpc_manager = SolanaManager::init_connection();
        let public_key = address.to_string();

        let pubkey =
            Pubkey::from_str(&public_key).map_err(|_| "Invalid public key format".to_string())?;

        rpc_manager
            .get_balance(&pubkey)
            .map_err(|err| format!("Error fetching balance: {}", err))
    }
    validate_address(){
        
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn get_wallet_balance_test() {
        match SolanaManager::get_wallet_balance("Ar51584zpbMp9Qw8NDoN47H3FyDGCSXrGq6ypXXnNBkU") {
            Ok(_) => {
                assert!(true);
            }
            Err(_) => {
                assert!(false);
            }
        }
    }
}
