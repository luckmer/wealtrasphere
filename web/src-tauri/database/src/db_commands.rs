use crate::schema::accounts;
use crate::{
    AccountDetails, DatabaseManager, DatabaseStructure, DeleteAccountData, UpdateAccountData,
};
use diesel::dsl::delete;
use diesel::{prelude::*, update};

pub fn insert_to_diesel(
    account: AccountDetails,
    connection: &mut SqliteConnection,
) -> Result<AccountDetails, diesel::result::Error> {
    diesel::insert_into(accounts::table)
        .values(&account)
        .execute(connection)
        .map_err(|e| e)?;

    Ok(account)
}

pub fn find_account_by_address(
    address: &str,
    connection: &mut SqliteConnection,
) -> Result<AccountDetails, diesel::result::Error> {
    use crate::schema::accounts::dsl::*;

    let account = accounts
        .filter(account_address.eq(address))
        .first::<AccountDetails>(connection)
        .map_err(|e| e)?;

    Ok(account)
}

pub fn update_account_name(
    account_data: UpdateAccountData,
    connection: &mut SqliteConnection,
) -> Result<UpdateAccountData, diesel::result::Error> {
    use crate::schema::accounts::dsl::*;

    update(accounts.filter(id.eq(account_data.id.clone())))
        .set(account_name.eq(account_data.account_name.clone()))
        .execute(connection)
        .map_err(|e| e)?;

    Ok(account_data)
}

pub fn delete_account(
    account_data: DeleteAccountData,
    connection: &mut SqliteConnection,
) -> Result<Vec<AccountDetails>, diesel::result::Error> {
    use crate::schema::accounts::dsl::*;

    delete(accounts.filter(id.eq(&account_data.id)))
        .execute(connection)
        .map_err(|e| e)?;

    accounts.load::<AccountDetails>(connection).map_err(|e| e)
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
