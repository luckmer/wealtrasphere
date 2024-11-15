use crate::{enums::Blockchain, AccountDetails};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NewAccount {
    pub account_address: String,
    pub chain: Blockchain,
    pub account_name: String,
    pub id: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct DatabaseStructure {
    pub accounts: Vec<AccountDetails>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UpdateAccountData {
    pub id: String,
    pub account_name: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct DeleteAccountData {
    pub id: String,
}
