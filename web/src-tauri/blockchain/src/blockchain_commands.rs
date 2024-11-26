use crate::BlockchainManager;
use database::{Blockchain, SolanaAccount};
use tokio;

#[tauri::command]
pub fn is_on_curve(address: String, chain: Blockchain) -> Result<bool, String> {
    BlockchainManager::new()
        .is_on_curve(address, chain)
        .map_err(|e| format!("Invalid address: {}", e))
}

#[tauri::command]
pub async fn load_account(address: String, chain: Blockchain) -> Result<SolanaAccount, String> {
    tokio::spawn(async move {
        match BlockchainManager::new().load_account(address, chain) {
            Ok(account) => Ok(account),
            Err(e) => Err(format!("Invalid address: {}", e)),
        }
    })
    .await
    .map_err(|err| format!("failed to load account: {}", err))?
}
