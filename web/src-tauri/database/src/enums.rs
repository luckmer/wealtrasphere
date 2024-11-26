use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub enum Blockchain {
    SOLANA,
}

#[repr(u8)]
#[derive(Clone, Copy, Debug, Default, PartialEq, Serialize, Deserialize)]
pub enum AccountState {
    #[default]
    Uninitialized,
    Initialized,
    Frozen,
}
