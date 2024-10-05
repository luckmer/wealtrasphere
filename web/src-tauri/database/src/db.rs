use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

use dotenvy::dotenv;

use std::path::PathBuf;
use std::{env, fs};

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!();

pub struct DatabaseManager {
    db_path: PathBuf,
}

impl DatabaseManager {
    pub fn new() -> Self {
        let home_dir = dirs::home_dir().expect("Failed to get home directory");
        let db_path = home_dir
            .join(".config")
            .join("orion")
            .join("database.sqlite");
        DatabaseManager { db_path }
    }

    pub fn init(&self) {
        if !self.db_file_exists() {
            self.create_db_file();
        }

        self.run_migrations();
    }

    pub fn establish_connection(&self) -> SqliteConnection {
        dotenv().ok();

        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

        SqliteConnection::establish(&database_url)
            .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
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
        fs::File::create(&self.db_path).expect("Failed to create database file");
    }

    fn db_file_exists(&self) -> bool {
        self.db_path.exists()
    }
}
