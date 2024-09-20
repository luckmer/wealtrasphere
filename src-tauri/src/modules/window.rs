use tauri::{App, Manager, PhysicalSize};

pub fn set_window_min_size(app: &App) {
    if let Some(window) = app.get_window("main") {
        window
            .set_min_size(Some(PhysicalSize {
                width: 800,
                height: 800,
            }))
            .unwrap();
    }
}
