import dotenv from "dotenv";
dotenv.config(); // This loads variables from .env into process.env
import {
  RawSigner,
  Ed25519Keypair,
  JsonRpcProvider,
  Connection,
  TransactionBlock,
} from "@mysten/sui.js";

import { fromB64 } from "@mysten/bcs";

const connection = new Connection({
  fullnode: "https://fullnode.testnet.sui.io",
});

const provider = new JsonRpcProvider(connection);

// Private key must be stored securely (prefer env vars)
const PRIVATE_KEY = process.env.SUI_PRIVATE_KEY!;
if (!PRIVATE_KEY) {
  throw new Error("SUI_PRIVATE_KEY is not defined in environment variables");
}

export async function sendSuiToken(receiverAddress: string) {
  const secretKey = fromB64(PRIVATE_KEY).slice(1); // remove 0x00 prefix
  const keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(secretKey));

  const signer = new RawSigner(keypair, provider);

  const tx = new TransactionBlock();
  tx.transferObjects(
    [tx.gas],
    tx.pure(receiverAddress)
  );

  const result = await signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    options: { showEffects: true },
  });

  return result;
}
