use crate::metadata_service::MetadataManager;
use database::Blockchain;

pub async fn get_tokens_metadata(chain: Blockchain, addresses: Vec<String>) {
    let price_api = MetadataManager::new();

    price_api.get_token_metadata(chain, addresses).await;
    price_api.get_metadata();
}
