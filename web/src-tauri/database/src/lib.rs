pub mod db_commands;
pub mod db_service;
pub mod enums;
pub mod models;
pub mod schema;
pub mod types;

pub use db_commands::*;
pub use db_service::*;
pub use enums::*;
pub use models::*;
pub use schema::*;
pub use types::*;

pub fn init_database() {
    let db_manager = DatabaseManager::new();
    db_manager.init();
}
