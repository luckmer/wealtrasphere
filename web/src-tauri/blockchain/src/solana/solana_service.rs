use borsh::BorshDeserialize;
use database::{Account, AccountDetails, AccountState, NewAccount, SolanaAccount};
use serde_json::Value;
use solana_account_decoder::UiAccountData;
use solana_client::rpc_client::RpcClient;
use solana_client::rpc_request::TokenAccountsFilter;
use solana_client::rpc_response::RpcKeyedAccount;
use solana_sdk::native_token::lamports_to_sol;
use solana_sdk::pubkey::Pubkey;
use std::str::FromStr;

#[derive(Debug, BorshDeserialize)]
pub struct Creator {
    pub address: Pubkey,
    pub verified: bool,
    pub share: u8,
}

#[derive(Debug, BorshDeserialize)]
pub struct Data {
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub seller_fee_basis_points: u16,
    pub creators: Option<Vec<Creator>>,
}

#[derive(Debug, BorshDeserialize)]
pub struct Metadata {
    pub key: u8,
    pub update_authority: Pubkey,
    pub mint: Pubkey,
    pub data: Data,
    pub primary_sale_happened: bool,
    pub is_mutable: bool,
}

pub struct SolanaManager {
    client: RpcClient,
}

impl SolanaManager {
    pub fn new(rpc_client: RpcClient) -> Self {
        SolanaManager { client: rpc_client }
    }

    pub fn create_new_account(&self, new_account: NewAccount) -> Result<AccountDetails, String> {
        let address = new_account.account_address.to_string();
        let pubkey = Pubkey::from_str(&address).unwrap();

        Ok(AccountDetails {
            balance: self.get_balance(&pubkey).unwrap(),
            id: new_account.id,
            account_address: new_account.account_address,
            account_name: new_account.account_name,
            chain: "SOLANA".to_string(),
        })
    }

    pub fn load_account(&self, address: String) -> Result<SolanaAccount, SolanaAccount> {
        let pubkey = Pubkey::from_str(&address).unwrap();

        let tokens = self.get_tokens(pubkey).unwrap_or_default();
        let balance = self.get_balance(&pubkey).unwrap_or(0.00);

        Ok(SolanaAccount { balance, tokens })
    }

    pub fn get_tokens(&self, pubkey: Pubkey) -> Result<Vec<Account>, Vec<Account>> {
        let token_program_ids = vec![
            Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap(),
            Pubkey::from_str("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb").unwrap(),
        ];

        let mut all_token_accounts: Vec<Account> = Vec::new();
        for program_id in token_program_ids {
            match self.retrieve_token_accounts_by_owner(pubkey, program_id) {
                Ok(accounts) if !accounts.is_empty() => {
                    let tokens: Vec<Account> = accounts
                        .iter()
                        .filter(|account| account.decimals > 1)
                        .cloned()
                        .collect();

                    all_token_accounts.extend(tokens);
                }
                Ok(_) => {
                    continue;
                }
                Err(_) => {}
            }
        }

        Ok(all_token_accounts)
    }

    fn retrieve_token_accounts_by_owner(
        &self,
        pubkey: Pubkey,
        program_id: Pubkey,
    ) -> Result<Vec<Account>, String> {
        let token_accounts = self
            .client
            .get_token_accounts_by_owner(&pubkey, TokenAccountsFilter::ProgramId(program_id))
            .unwrap();

        let result = token_accounts
            .iter()
            .filter_map(|account| self.parse_token_account(account))
            .collect::<Vec<Account>>();

        Ok(result)
    }

    fn parse_token_account(&self, account: &RpcKeyedAccount) -> Option<Account> {
        match &account.account.data {
            UiAccountData::Json(parsed_data) => {
                let info = parsed_data.parsed.get("info")?;

                Some(Account {
                    mint: self.extract_pubkey(info, "mint")?,
                    owner: self.extract_pubkey(info, "owner")?,
                    amount: self.extract_u64(info, "tokenAmount", "amount")?,
                    decimals: info
                        .get("tokenAmount")
                        .and_then(|token_amount| token_amount.get("decimals"))
                        .and_then(|decimals| decimals.as_u64())
                        .unwrap_or(0),
                    delegate: self.extract_optional_pubkey(info, "delegate"),
                    state: self.extract_account_state(info)?,
                    is_native: self.extract_optional_u64(info, "is_native"),
                    delegated_amount: info
                        .get("delegated_amount")
                        .and_then(|d| d.as_str()?.parse().ok())
                        .unwrap_or(0),
                    close_authority: self.extract_optional_pubkey(info, "close_authority"),
                })
            }
            _ => None,
        }
    }

    fn extract_pubkey(&self, info: &Value, key: &str) -> Option<String> {
        info.get(key)?.as_str()?.parse().ok()
    }

    fn extract_optional_pubkey(&self, info: &Value, key: &str) -> Option<String> {
        info.get(key)
            .and_then(|d| d.as_str())
            .and_then(|s| s.parse().ok())
    }

    fn extract_u64(&self, info: &Value, parent: &str, key: &str) -> Option<u64> {
        info.get(parent)?.get(key)?.as_str()?.parse().ok()
    }

    fn extract_optional_u64(&self, info: &Value, key: &str) -> Option<u64> {
        info.get(key)
            .and_then(|d| d.as_str())
            .and_then(|s| s.parse().ok())
    }

    fn extract_account_state(&self, info: &Value) -> Option<AccountState> {
        match info.get("state")?.as_str()? {
            "initialized" => Some(AccountState::Initialized),
            _ => Some(AccountState::Uninitialized),
        }
    }

    pub fn get_balance(&self, public_key: &Pubkey) -> Result<f64, f64> {
        match self.client.get_balance(public_key) {
            Ok(balance) => Ok(lamports_to_sol(balance)),
            Err(err) => {
                println!("Failed to get balance: {}", err);
                Ok(0.0)
            }
        }
    }
}
