-- Your SQL goes here
-- diesel setup
-- diesel migration generate
-- diesel migration run
-- diesel database reset to solve error with no such table 


CREATE TABLE accounts (
    id TEXT PRIMARY KEY,
    balance DOUBLE PRECISION,
    account_address TEXT NOT NULL,
    account_name TEXT NOT NULL,
    chain TEXT NOT NULL
);