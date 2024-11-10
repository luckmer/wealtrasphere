use crate::enums::Blockchain;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NewAccount {
    pub account_address: String,
    pub chain: Blockchain,
    pub account_name: String,
    pub id: String,
}
