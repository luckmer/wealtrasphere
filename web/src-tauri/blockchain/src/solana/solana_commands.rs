use super::SolanaManager;
use database::SolanaAccount;
use state::AppState;
use tauri::State;

pub fn load_solana_accounts(
    addresses: Vec<String>,
    state: State<'_, AppState>,
) -> Result<Vec<SolanaAccount>, String> {
    let mut rpc_manager = state.solana_rpc.lock().unwrap();
    if !rpc_manager.validate_rpc_connection() {
        return Err("RPC connection is not valid, please try again later.".to_string());
    }

    let solana = SolanaManager::new();

    let result = solana
        .load_accounts(addresses, &mut rpc_manager.client)
        .unwrap();

    Ok(result)
}
