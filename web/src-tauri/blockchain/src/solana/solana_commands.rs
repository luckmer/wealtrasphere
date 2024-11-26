use database::SolanaAccount;

use super::{rpc::RpcManager, SolanaManager};

pub fn load_solana_account(address: String) -> Result<SolanaAccount, String> {
    let rpc = RpcManager::new();

    if !rpc.validate_rpc_connection() {
        return Err("RPC connection is not valid, please try again later.".to_string());
    };

    let solana = SolanaManager::new(rpc.client);

    Ok(solana.load_account(address).unwrap())
}
