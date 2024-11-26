use crate::JUPITER_PRICE_TOKENS;
use database::Blockchain;

pub struct PriceApiManager {}

impl PriceApiManager {
    pub fn new() -> Self {
        PriceApiManager {}
    }

    pub async fn get_token_prices(
        &self,
        chain: Blockchain,
        addresses: Vec<String>,
    ) -> Result<(), String> {
        match chain {
            Blockchain::SOLANA => self.get_solana_prices(addresses).await,
        }
    }

    pub fn get_prices(&self) {
        println!("get prices");
    }

    pub async fn get_solana_prices(&self, addresses: Vec<String>) -> Result<(), String> {
        const BATCH_SIZE: usize = 100;

        // check database if price for specific token exist
        // if not make call for addresses that do not exist yet in cache
        // if exist remove from list to download

        // cache prices for specific tokens for 10minute, after that we can make another call
        for chunk in addresses.chunks(BATCH_SIZE) {
            let ids = chunk.join(",");
            let url = format!("{}{}", JUPITER_PRICE_TOKENS, ids);

            let response = reqwest::get(&url).await;

            println!("Response: {:?}", response);
        }

        Ok(())
    }
}
