// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod modules;

use account::account_commands;
use blockchain::blockchain_commands;
use database::init_database;

use modules::module_service;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            account_commands::create_account,
            blockchain_commands::is_on_curve
        ])
        .setup(move |app| {
            app.trigger_global("set-backend-ready", None);
            module_service::set_window_min_size(app);
            init_database();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
