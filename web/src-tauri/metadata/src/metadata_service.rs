use database::Blockchain;
use crate::index::JUPITER_TRADABLE_TOKENS;
use serde_json::Value;
use reqwest;

pub struct MetadataManager {}

impl MetadataManager {
    pub async fn get_metadata(&self,chain:Blockchain) {
        match chain {
            Blockchain::SOLANA => self.get_solana_metadata(),
        }
      }

    pub fn get_solana_metadata(&self) {
      let response = reqwest::get(JUPITER_TRADABLE_TOKENS.to_string()).unwrap();
      let tokens: Vec<Value> = serde_json::from_str(&response).unwrap_or(Vec::new());

      

    }
  }
