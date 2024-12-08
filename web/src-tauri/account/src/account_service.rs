use blockchain::SolanaManager;
use database::{AccountDetails, Blockchain, DeleteAccountData, NewAccount, UpdateAccountData};
use diesel::SqliteConnection;
use state::AppState;
use tauri::State;

pub struct AccountManager {}

impl AccountManager {
    pub fn new() -> Self {
        AccountManager {}
    }

    pub fn create_new_account(
        &self,
        new_account: NewAccount,
        state: State<AppState>,
    ) -> Result<AccountDetails, String> {
        let chain = new_account.chain.clone();

        match chain {
            Blockchain::SOLANA => self.create_solana_account(new_account, state),
        }
    }

    pub fn edit_account_name(
        &self,
        account_data: UpdateAccountData,
        connection: &mut SqliteConnection,
    ) -> Result<UpdateAccountData, String> {
        match database::db_commands::update_account_name(account_data.clone(), connection) {
            Ok(_) => Ok(account_data),
            Err(_) => Err("Failed to update account".to_string()),
        }
    }

    pub fn delete_account(
        &self,
        account_data: DeleteAccountData,
        connection: &mut SqliteConnection,
    ) -> Result<Vec<AccountDetails>, String> {
        match database::db_commands::delete_account(account_data, connection) {
            Ok(data) => Ok(data),
            Err(_) => Err("Failed to delete account".to_string()),
        }
    }

    pub fn create_solana_account(
        &self,
        new_account: NewAccount,
        state: State<AppState>,
    ) -> Result<AccountDetails, String> {
        let mut connection = state.connection.lock().unwrap();
        let address = &new_account.account_address;

        if database::find_account_by_address(address, &mut *connection).is_ok() {
            return Err("Account already exists".to_string());
        }

        let mut rpc_manager = state.solana_rpc.lock().unwrap();

        if !rpc_manager.validate_rpc_connection() {
            return Err("RPC connection is not valid, please try again later.".to_string());
        }

        let account_manager = SolanaManager::new();
        let account = account_manager
            .create_new_account(new_account.clone(), &mut rpc_manager.client)
            .map_err(|e| format!("Failed to get new account: {}", e))?;

        let result = database::db_commands::insert_to_diesel(account, &mut *connection)
            .map_err(|e| format!("failed to save account to database: {}", e))?;

        Ok(result)
    }
}
