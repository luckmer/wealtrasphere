use borsh::BorshDeserialize;
use database::{AccountDetails,  NewAccount, SolanaAccount, Token};
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

pub struct SolanaManager {}

impl SolanaManager {
    pub fn new() -> Self {
        SolanaManager {}
    }

    pub fn create_new_account(
        &self,
        new_account: NewAccount,
        client: &mut RpcClient,
    ) -> Result<AccountDetails, String> {
        let address = new_account.account_address.to_string();
        let pubkey = Pubkey::from_str(&address).unwrap();

        Ok(AccountDetails {
            balance: self.get_balance(&pubkey, client).unwrap(),
            id: new_account.id,
            account_address: new_account.account_address,
            account_name: new_account.account_name,
            chain: "SOLANA".to_string(),
        })
    }

    pub fn load_accounts(
        &self,
        addresses: Vec<String>,
        client: &mut RpcClient,
    ) -> Result<Vec<SolanaAccount>, Vec<SolanaAccount>> {
        let mut accounts = Vec::new();

        for address in addresses {
            let pubkey = Pubkey::from_str(&address).unwrap();
            let response = self.get_tokens(pubkey, client).unwrap_or_default();

            accounts.push(SolanaAccount {
                address,
                chain: "SOLANA".to_string(),
                tokens: response,
            })
        }

        Ok(accounts)
    }

    pub fn get_tokens(
        &self,
        pubkey: Pubkey,
        client: &mut RpcClient,
    ) -> Result<Vec<Token>, Vec<Token>> {
        let token_program_ids = [
            Pubkey::from_str("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA").unwrap(),
            Pubkey::from_str("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb").unwrap(),
        ];

        // Pre-allocate with a reasonable capacity to reduce reallocations
        let mut all_token_accounts = Vec::with_capacity(10);

        for program_id in token_program_ids {
            // Use early continue for empty or error cases
            let accounts = match self.retrieve_token_accounts_by_owner(pubkey, program_id, client) {
                Ok(accs) if !accs.is_empty() => accs,
                _ => continue,
            };

            // Directly extend with filtered accounts
            all_token_accounts.extend(accounts.into_iter().filter(|account| account.decimals > 1));
        }

        Ok(all_token_accounts)
    }

    fn retrieve_token_accounts_by_owner(
        &self,
        pubkey: Pubkey,
        program_id: Pubkey,
        client: &mut RpcClient,
    ) -> Result<Vec<Token>, String> {
        println!("make response to rpc");
        let token_accounts = match client
            .get_token_accounts_by_owner(&pubkey, TokenAccountsFilter::ProgramId(program_id))
        {
            Ok(accounts) => accounts,
            Err(e) => return Err(format!("Failed to retrieve token accounts: {}", e)),
        };

        println!("yes get all that data {:?}", token_accounts.len());

        let result = token_accounts
            .iter()
            .filter_map(|account| self.parse_token_account(account))
            .collect::<Vec<Token>>();

        println!("yes get all that data 2 {:?}", result.len());

        Ok(result)
    }

    fn parse_token_account(&self, account: &RpcKeyedAccount) -> Option<Token> {
        match &account.account.data {
            UiAccountData::Json(parsed_data) => {
                let info = parsed_data.parsed.get("info")?;

                Some(Token {
                    mint: self.extract_pubkey(info, "mint")?,
                    owner: self.extract_pubkey(info, "owner")?,
                    amount: self.extract_u64(info, "tokenAmount", "amount")?,
                    decimals: info
                        .get("tokenAmount")
                        .and_then(|token_amount| token_amount.get("decimals"))
                        .and_then(|decimals| decimals.as_u64())
                        .unwrap_or(0),
                    is_native: self.extract_optional_u64(info, "is_native"),
                })
            }
            _ => None,
        }
    }

    fn extract_pubkey(&self, info: &Value, key: &str) -> Option<String> {
        info.get(key)?.as_str()?.parse().ok()
    }

    fn extract_u64(&self, info: &Value, parent: &str, key: &str) -> Option<u64> {
        info.get(parent)?.get(key)?.as_str()?.parse().ok()
    }

    fn extract_optional_u64(&self, info: &Value, key: &str) -> Option<u64> {
        info.get(key)
            .and_then(|d| d.as_str())
            .and_then(|s| s.parse().ok())
    }

    pub fn get_balance(&self, public_key: &Pubkey, client: &mut RpcClient) -> Result<f64, f64> {
        match client.get_balance(public_key) {
            Ok(balance) => Ok(lamports_to_sol(balance)),
            Err(err) => {
                println!("Failed to get balance: {}", err);
                Ok(0.0)
            }
        }
    }
}
