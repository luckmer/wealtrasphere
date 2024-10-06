use crate::SOLANA_MAINNET_RPC;
use lazy_static::lazy_static;
use solana_client::rpc_client::RpcClient;
use solana_sdk::commitment_config::CommitmentConfig;
use solana_sdk::pubkey::Pubkey;
use std::sync::Arc;

lazy_static! {
    static ref RPC_CLIENT: Arc<RpcClient> = Arc::new({
        let rpc_url = SOLANA_MAINNET_RPC.to_string();
        RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed())
    });
}

pub struct SolanaRpcManager {
    client: Arc<RpcClient>,
}

impl SolanaRpcManager {
    pub fn new() -> Self {
        Self {
            client: RPC_CLIENT.clone(),
        }
    }

    pub fn get_balance(&self, pubkey: &Pubkey) -> Result<u64, Box<dyn std::error::Error>> {
        Ok(self.client.get_balance(pubkey)?)
    }

    pub fn get_latest_blockhash(
        &self,
    ) -> Result<solana_sdk::hash::Hash, Box<dyn std::error::Error>> {
        Ok(self.client.get_latest_blockhash()?)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::str::FromStr;

    #[test]
    fn test_get_balance_success() {
        let manager = SolanaRpcManager::new();
        let pubkey = Pubkey::from_str("Ar51584zpbMp9Qw8NDoN47H3FyDGCSXrGq6ypXXnNBkU").unwrap();

        match manager.get_balance(&pubkey) {
            Ok(_) => {
                assert!(true);
            }
            Err(_) => {
                assert!(false);
            }
        };
    }

    #[test]
    fn test_get_balance_failure() {
        let pubkey = Pubkey::from_str("InvalidPubkeyHere");
        assert!(pubkey.is_err());
    }

    #[test]
    fn test_get_latest_blockhash_success() {
        let manager = SolanaRpcManager::new();

        match manager.get_latest_blockhash() {
            Ok(_) => {
                assert!(true);
            }
            Err(_) => {
                assert!(false);
            }
        }
    }
}
