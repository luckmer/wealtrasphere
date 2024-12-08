use connection::solana::rpc_service::RpcManager;
use database::DatabaseManager;
use diesel::sqlite::SqliteConnection;
use std::sync::Mutex;

pub struct AppState {
    pub connection: Mutex<SqliteConnection>,
    pub solana_rpc: Mutex<RpcManager>,
}

impl AppState {
    pub fn establish_database_connection() -> Mutex<SqliteConnection> {
        let db_manager = DatabaseManager::new();
        db_manager.init();

        Mutex::new(db_manager.establish_connection())
    }

    pub fn establish_solana_connection() -> Mutex<RpcManager> {
        Mutex::new(RpcManager::new())
    }

    pub fn new() -> Self {
        AppState {
            connection: Self::establish_database_connection(),
            solana_rpc: Self::establish_solana_connection(),
        }
    }
}
