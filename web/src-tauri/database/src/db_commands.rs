use crate::schema::accounts;
use crate::{AccountDetails, DatabaseManager};
use diesel::prelude::*;

pub fn insert_to_diesel(account: AccountDetails) -> Result<AccountDetails, diesel::result::Error> {
    let db_manager = DatabaseManager::new();
    let connection = &mut db_manager.establish_connection();

    diesel::insert_into(accounts::table)
        .values(&account)
        .execute(connection)
        .map_err(|e| e)?;

    Ok(account)
}

pub fn get_accounts() -> Result<Vec<AccountDetails>, diesel::result::Error> {
    let db_manager = DatabaseManager::new();
    let connection = &mut db_manager.establish_connection();
    let data = accounts::table
        .load::<AccountDetails>(connection)
        .map_err(|e| e)?;

    Ok(data)
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
