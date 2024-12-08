use crate::AccountManager;
use database::models::AccountDetails;
use database::types::NewAccount;
use database::{DeleteAccountData, UpdateAccountData};
use state::AppState;
use tauri::State;

#[tauri::command]
pub fn create_account(
    new_account: NewAccount,
    state: State<AppState>,
) -> Result<AccountDetails, String> {
    let manager: AccountManager = AccountManager::new();

    manager
        .create_new_account(new_account, state)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn edit_account(
    account_data: UpdateAccountData,
    state: State<AppState>,
) -> Result<UpdateAccountData, String> {
    let mut connection = state.connection.lock().unwrap();
    let manager: AccountManager = AccountManager::new();
    manager.edit_account_name(account_data, &mut *connection)
}

#[tauri::command]
pub fn delete_account(
    account_data: DeleteAccountData,
    state: State<AppState>,
) -> Result<Vec<AccountDetails>, String> {
    let mut connection = state.connection.lock().unwrap();
    let manager: AccountManager = AccountManager::new();

    manager.delete_account(account_data, &mut *connection)
}
