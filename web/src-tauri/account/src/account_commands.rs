use database::models::AccountDetails;
use database::types::NewAccount;
use database::{DeleteAccountData, UpdateAccountData};

use crate::AccountManager;

#[tauri::command]
pub fn create_account(new_account: NewAccount) -> Result<AccountDetails, String> {
    let manager: AccountManager = AccountManager::new();

    manager
        .create_new_account(new_account)
        .map_err(|e| e.to_string())
}

#[tauri::command]

pub fn edit_account(account_data: UpdateAccountData) {
    let manager: AccountManager = AccountManager::new();
    manager.edit_account_name(account_data)
}

#[tauri::command]
pub fn delete_account(account_data: DeleteAccountData) {
    let manager: AccountManager = AccountManager::new();
    manager.delete_account(account_data)
}
