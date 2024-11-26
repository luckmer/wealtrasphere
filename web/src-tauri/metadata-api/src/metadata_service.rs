use crate::JUPITER_TRADABLE_TOKENS;
use database::Blockchain;
pub struct MetadataManager {}

impl MetadataManager {
    pub fn new() -> Self {
        MetadataManager {}
    }

    pub fn get_metadata(&self) {
        println!("get metadata")
    }

    pub async fn get_token_metadata(
        &self,
        chain: Blockchain,
        addresses: Vec<String>,
    ) -> Result<(), String> {
        match chain {
            Blockchain::SOLANA => self.get_solana_metadata(addresses).await,
        }
    }

    pub async fn get_solana_metadata(&self, addresses: Vec<String>) -> Result<(), String> {
        let response = reqwest::get(JUPITER_TRADABLE_TOKENS.to_string()).await;

        println!("response {:?}", response);

        Ok(())
        // let tokens: Vec<Value> = serde_json::from_str(&response).unwrap_or(Vec::new());
    }
}
