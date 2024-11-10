use crate::schema::accounts;
use crate::{AccountDetails, DatabaseManager};
use diesel::prelude::*;

pub fn insert_to_diesel(account: AccountDetails) -> Result<AccountDetails, String> {
    let db_manager = DatabaseManager::new();
    let connection = &mut db_manager.establish_connection();

    diesel::insert_into(accounts::table)
        .values(&account)
        .execute(connection)
        .map_err(|e| format!("failed to set accounts in diesel: {}", e))?;

    Ok(account)
}

pub fn get_accounts() -> Result<Vec<AccountDetails>, String> {
    let db_manager = DatabaseManager::new();
    let connection = &mut db_manager.establish_connection();

    let data = accounts::table
        .load::<AccountDetails>(connection)
        .map_err(|e| format!("failed to set accounts in diesel: {}", e))?;

    Ok(data)
}
