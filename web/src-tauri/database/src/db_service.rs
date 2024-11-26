use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use std::fs;
use std::path::PathBuf;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!();

pub struct DatabaseManager {
    db_path: PathBuf,
}

impl DatabaseManager {
    pub fn new() -> Self {
        // if cfg!(debug_assertions) {
        //     // Development mode
        //     let db_path = PathBuf::from("database/database.sqlite");
        //     DatabaseManager { db_path }
        // } else {
        // Production mode
        let app_dir = tauri::api::path::app_data_dir(&tauri::Config::default())
            .expect("Failed to get app directory");
        let db_path = app_dir.join("database.sqlite");
        DatabaseManager { db_path }
        // }
    }

    pub fn init(&self) {
        if !self.db_file_exists() {
            self.create_db_file();
        }

        self.run_migrations();
    }

    pub fn establish_connection(&self) -> SqliteConnection {
        let database_url = self
            .db_path
            .to_str()
            .expect("Failed to convert database path to string");

        SqliteConnection::establish(database_url)
            .unwrap_or_else(|_| panic!("Error connecting to database at: {}", database_url))
    }

    fn run_migrations(&self) {
        let mut connection = self.establish_connection();
        connection.run_pending_migrations(MIGRATIONS).unwrap();
    }

    fn create_db_file(&self) {
        let db_dir = self
            .db_path
            .parent()
            .expect("Failed to get parent directory");

        if !db_dir.exists() {
            fs::create_dir_all(db_dir).expect("Failed to create directory");
        }

        if !db_dir.exists() {
            fs::create_dir_all(db_dir).expect("Failed to create database directory");
        }

        fs::File::create(&self.db_path).expect("Failed to create database file");
    }

    fn db_file_exists(&self) -> bool {
        self.db_path.exists()
    }
}
