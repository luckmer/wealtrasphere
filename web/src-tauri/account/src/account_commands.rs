use database::models::NewAccount;

#[tauri::command]
pub fn create_account(newAccount: NewAccount) {
    println!("Creating new account... {:?}", newAccount);
}
