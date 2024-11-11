use database::Blockchain;
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

pub struct BlockchainManager {}

impl BlockchainManager {
    pub fn new() -> Self {
        BlockchainManager {}
    }

    pub fn is_on_curve(&self, address: String, chain: Blockchain) -> Result<bool, String> {
        match chain {
            Blockchain::SOLANA => self.is_on_curve_solana(address),
        }
    }

    pub fn is_on_curve_solana(&self, address: String) -> Result<bool, String> {
        let pubkey = Pubkey::from_str(&address).map_err(|e| format!("{}", e))?;
        Ok(pubkey.is_on_curve())
    }
}
