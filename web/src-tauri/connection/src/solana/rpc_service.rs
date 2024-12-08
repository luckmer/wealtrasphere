use solana_client::rpc_client::RpcClient;
use solana_sdk::commitment_config::CommitmentConfig;

use super::SOLANA_MAINNET_RPC;

pub struct RpcManager {
    pub client: RpcClient,
}

impl RpcManager {
    pub fn new() -> Self {
        let rpc_url = SOLANA_MAINNET_RPC.to_string();
        let client = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());

        Self { client }
    }

    pub fn validate_rpc_connection(&self) -> bool {
        match self.client.get_version() {
            Ok(version) => {
                println!("RPC connection is valid. Version: {}", version);
                true
            }
            Err(err) => {
                println!("RPC connection is invalid: {:?}", err);
                false
            }
        }
    }
}
