use database::models::NewAccount;

use crate::AccountManager;

#[tauri::command]
pub fn create_account(new_account: NewAccount) -> Result<NewAccount, String> {
    println!("Creating new account... {:?}", new_account);
    let manager: AccountManager = AccountManager::new();
    manager
        .create_new_account(new_account)
        .map_err(|e| format!("Failed to create new account: {}", e))
}
