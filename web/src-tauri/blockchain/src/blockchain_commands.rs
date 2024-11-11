use database::Blockchain;

use crate::BlockchainManager;

#[tauri::command]
pub fn is_on_curve(address: String, chain: Blockchain) -> Result<bool, String> {
    BlockchainManager::new()
        .is_on_curve(address, chain)
        .map_err(|e| format!("Invalid address: {}", e))
}
