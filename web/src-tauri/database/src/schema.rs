// @generated automatically by Diesel CLI.

diesel::table! {
  accounts (id) {
      id -> Text,
      balance -> Double,
      account_address -> Text,
      account_name -> Text,
      chain -> Text
  }
}
