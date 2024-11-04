pub mod db_service;
pub mod enums;
pub mod models;

pub use db_service::*;
pub use enums::*;
pub use models::*;

pub fn init_database() {
    let db_manager = DatabaseManager::new();
    db_manager.init();
}
