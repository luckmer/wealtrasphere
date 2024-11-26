use crate::price_api_service::PriceApiManager;
use database::Blockchain;

pub async fn get_tokens_price(chain: Blockchain, addresses: Vec<String>) {
    let price_api = PriceApiManager::new();

    price_api.get_token_prices(chain, addresses).await;

    price_api.get_prices();
}
