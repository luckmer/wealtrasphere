// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod modules;

use database::init_database;

use commands::index;
use modules::window;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![index::greet])
        .setup(move |app| {
            app.trigger_global("set-backend-ready", None);
            window::set_window_min_size(app);
            init_database();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
