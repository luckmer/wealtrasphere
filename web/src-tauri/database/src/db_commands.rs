use crate::schema::accounts;
use crate::{
    AccountDetails, DatabaseManager, DatabaseStructure, DeleteAccountData, UpdateAccountData,
};

use diesel::dsl::delete;
use diesel::{prelude::*, update};

pub fn insert_to_diesel(account: AccountDetails) -> Result<AccountDetails, diesel::result::Error> {
    let db_manager = DatabaseManager::new();
    let connection = &mut db_manager.establish_connection();

    diesel::insert_into(accounts::table)
        .values(&account)
        .execute(connection)
        .map_err(|e| e)?;

    Ok(account)
}

pub fn find_account_by_address(address: &str) -> Result<AccountDetails, diesel::result::Error> {
    use crate::schema::accounts::dsl::*;

    let db_manager = DatabaseManager::new();
    let connection = &mut db_manager.establish_connection();

    let account = accounts
        .filter(account_address.eq(address))
        .first::<AccountDetails>(connection)
        .map_err(|e| e)?;

    Ok(account)
}

pub fn update_account_name(account_data: UpdateAccountData) {
    use crate::schema::accounts::dsl::*;

    let db_manager = DatabaseManager::new();
    let connection = &mut db_manager.establish_connection();

    update(accounts.filter(id.eq(account_data.id)))
        .set(account_name.eq(account_data.account_name))
        .execute(connection)
        .unwrap();
}

pub fn delete_account(account_data: DeleteAccountData) {
    use crate::schema::accounts::dsl::*;

    let db_manager = DatabaseManager::new();
    let connection = &mut db_manager.establish_connection();

    delete(accounts.filter(id.eq(account_data.id)))
        .execute(connection)
        .unwrap();
}

pub fn get_accounts() -> Result<Vec<AccountDetails>, Vec<AccountDetails>> {
    let db_manager = DatabaseManager::new();
    let connection = &mut db_manager.establish_connection();
    let data = accounts::table
        .load::<AccountDetails>(connection)
        .unwrap_or(Vec::new());
    Ok(data)
}

#[tauri::command]
pub fn load_database() -> Result<DatabaseStructure, DatabaseStructure> {
    let accounts = get_accounts().unwrap();
    Ok(DatabaseStructure { accounts })
}
