// use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::enums::Blockchain;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NewAccount {
    account_address: String,
    chain: Blockchain,
    account_name: String,
    id: String,
}
