use database::models::AccountDetails;
use database::types::NewAccount;

use crate::AccountManager;

#[tauri::command]
pub fn create_account(new_account: NewAccount) -> Result<AccountDetails, String> {
    println!("Creating new account... {:?}", new_account);
    let manager: AccountManager = AccountManager::new();

    manager
        .create_new_account(new_account)
        .map_err(|e| format!("{}", e))
}
