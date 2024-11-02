 // use blockchain::solana::SolanaManager;

#[tauri::command]
pub fn greet(name: &str) -> String {
    // SolanaManager

    format!("Hello, {}! You've been greeted from Rust!", name)
}
