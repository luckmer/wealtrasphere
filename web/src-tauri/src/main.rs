// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod modules;

use account::account_commands;
use blockchain::blockchain_commands;
use modules::module_service;
use state::AppState;
use tauri::Manager;

fn main() {
    let state = AppState::new();

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            blockchain_commands::load_accounts,
            account_commands::create_account,
            account_commands::delete_account,
            account_commands::edit_account,
            blockchain_commands::is_on_curve,
            database::load_database
        ])
        .setup(move |app| {
            app.trigger_global("set-backend-ready", None);
            module_service::set_window_min_size(app);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
