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
