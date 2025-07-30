// lib/sui/getSuiObjectId.ts
import { JsonRpcProvider } from "@mysten/sui";

const provider = new JsonRpcProvider(); // Optional: pass a Connection if needed

export async function getSuiObjectId(address: string): Promise<string> {
  const coins = await provider.getCoins({ owner: address });
  return coins.data[0]?.coinObjectId || "";
}
