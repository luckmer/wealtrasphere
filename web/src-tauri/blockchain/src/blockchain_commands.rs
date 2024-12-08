use crate::BlockchainManager;
use database::{Blockchain, SolanaAccount};
use state::AppState;
use tauri::State;

#[tauri::command]
pub fn is_on_curve(address: String, chain: Blockchain) -> Result<bool, String> {
    BlockchainManager::new()
        .is_on_curve(address, chain)
        .map_err(|e| format!("Invalid address: {}", e))
}

#[tauri::command]
pub async fn load_accounts(
    addresses: Vec<String>,
    chain: Blockchain,
    state: State<'_, AppState>,
) -> Result<Vec<SolanaAccount>, String> {
    // we have to save that to sqlite
    match BlockchainManager::new().load_account(addresses, chain, state) {
        Ok(account) => Ok(account),
        Err(e) => Err(format!("Invalid address: {}", e)),
    }
}
