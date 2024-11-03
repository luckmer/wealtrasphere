import { PublicKey } from "@solana/web3.js";

export const isOnCurve = (address: string) => {
  const publickey = new PublicKey(address);
  return PublicKey.isOnCurve(publickey.toBytes());
};
