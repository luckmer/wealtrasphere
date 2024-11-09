// use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::enums::Blockchain;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NewAccount {
    pub account_address: String,
    pub chain: Blockchain,
    pub account_name: String,
    pub id: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Account {
    account_address: String,
    chain: Blockchain,
    account_name: String,
    id: String,
    balance: String,
    nonce: String,
}
