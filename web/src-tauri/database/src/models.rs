use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Insertable, Serialize, Deserialize, Debug, Clone)]
#[diesel(table_name = crate::schema::accounts)]
pub struct AccountDetails {
    pub id: String,
    pub balance: f64,
    pub account_address: String,
    pub account_name: String,
    pub chain: String,
}

#[derive(Queryable, Clone, Debug, Serialize, Deserialize, Default, PartialEq)]
pub struct Token {
    pub mint: String,
    pub owner: String,
    pub amount: u64,
    pub decimals: u64,
    pub is_native: Option<u64>,
}

#[derive(Queryable, Clone, Debug, Serialize, Deserialize, Default, PartialEq)]
pub struct SolanaAccount {
    pub address: String,
    pub chain: String,
    pub tokens: Vec<Token>,
}
