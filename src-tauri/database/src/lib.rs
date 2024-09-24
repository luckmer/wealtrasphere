pub mod db;

pub use db::*;

pub fn init_database() {
    let db_manager = DatabaseManager::new();
    db_manager.init();
}
