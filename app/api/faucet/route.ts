import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

// === CONFIG ===
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_HOUR = 1;
const FAUCET_AMOUNT = 1_000_000_000; // 1 SUI in MIST
const LOG_FILE = path.join(process.cwd(), "faucet-logs.json");

// === Memory Stores (use Redis/DB in production) ===
export const requestLog = new Map<string, { count: number; lastRequest: number }>();
export const bannedIPs = new Set<string>();
export const bannedWallets = new Set<string>();

// === Helper: Logs ===
function loadLogs() {
  if (fs.existsSync(LOG_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
    } catch {
      return [];
    }
  }
  return [];
}

function saveLog(entry: any) {
  const logs = loadLogs();
  logs.unshift(entry); // add newest at top
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs.slice(0, 200), null, 2)); // keep 200 latest
}

// === Helper: Rate Limiting ===
function getRateLimitKey(ip: string, address: string): string {
  return `${ip}:${address}`;
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const record = requestLog.get(key);

  if (!record) {
    requestLog.set(key, { count: 1, lastRequest: now });
    return { allowed: true };
  }

  if (now - record.lastRequest > RATE_LIMIT_WINDOW) {
    requestLog.set(key, { count: 1, lastRequest: now });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS_PER_HOUR) {
    const resetTime = record.lastRequest + RATE_LIMIT_WINDOW;
    return { allowed: false, resetTime };
  }

  record.count++;
  record.lastRequest = now;
  return { allowed: true };
}

// === Helper: Validate Address ===
function isValidSuiAddress(address: string) {
  return /^0x[a-fA-F0-9]{64}$/.test(address);
}

// === Sui Client & Keypair ===
const client = new SuiClient({ url: getFullnodeUrl("testnet") });

if (!process.env.SUI_PRIVATE_KEY) {
  console.error("❌ Missing SUI_PRIVATE_KEY in environment");
}
const keypair = Ed25519Keypair.fromSecretKey(
  Uint8Array.from(Buffer.from(process.env.SUI_PRIVATE_KEY!.replace(/^0x/, ""), "hex"))
);

// === POST: Request Faucet ===
export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    // Validate Sui Address
    if (!address || !isValidSuiAddress(address)) {
      return NextResponse.json({ error: "Invalid Sui address format" }, { status: 400 });
    }

    // Detect IP
    const headersList = await Promise.resolve(headers());
    const forwarded = headersList.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // Check ban
    if (bannedIPs.has(ip) || bannedWallets.has(address)) {
      return NextResponse.json({ error: "You are banned from using the faucet." }, { status: 403 });
    }

    // Rate limit
    const rateKey = getRateLimitKey(ip, address);
    const rateLimit = checkRateLimit(rateKey);
    if (!rateLimit.allowed) {
      const waitMins = Math.ceil(((rateLimit.resetTime ?? 0) - Date.now()) / 60000);
      return NextResponse.json({ error: `Rate limit exceeded. Try again in ${waitMins} min.` }, { status: 429 });
    }

    // === Build & Execute Transaction ===
    const tx = new Transaction();
    const sender = keypair.getPublicKey().toSuiAddress();

    // Split 1 SUI from gas coin
    const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(FAUCET_AMOUNT)]);

    // Transfer the split coin to requested address
    tx.transferObjects([coin], tx.pure.address(address));

    // Set sender
    tx.setSender(sender);

    const result = await client.signAndExecuteTransaction({
      transaction: await tx.build({ client }),
      signer: keypair,
      options: { showEffects: true },
    });

    const txHash = result.digest;

    // Log success
    const logEntry = {
      id: Date.now().toString(),
      wallet: address,
      ip,
      timestamp: new Date().toISOString(),
      status: "success",
      amount: FAUCET_AMOUNT / 1_000_000_000,
      txHash,
    };
    saveLog(logEntry);

    return NextResponse.json({ success: true, ...logEntry });
  } catch (error: any) {
    console.error("Faucet error:", error);

    // Log failure
    const headersList = await Promise.resolve(headers());
    const forwarded = headersList.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const logEntry = {
      id: Date.now().toString(),
      wallet: "unknown",
      ip,
      timestamp: new Date().toISOString(),
      status: "failed",
      error: error.message ?? "Internal server error",
    };
    saveLog(logEntry);

    return NextResponse.json({ error: error.message ?? "Internal server error" }, { status: 500 });
  }
}

// === GET: Status ===
export async function GET() {
  return NextResponse.json({
    status: "online",
    rateLimit: {
      maxRequests: MAX_REQUESTS_PER_HOUR,
      windowMs: RATE_LIMIT_WINDOW,
    },
    faucetAmount: FAUCET_AMOUNT / 1_000_000_000,
    totalLogs: loadLogs().length,
  });
}

// === DELETE: Admin Reset ===
export async function DELETE(request: NextRequest) {
  try {
    const { secret } = await request.json();
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Clear logs and bans
    fs.writeFileSync(LOG_FILE, JSON.stringify([]));
    requestLog.clear();
    bannedIPs.clear();
    bannedWallets.clear();

    return NextResponse.json({ success: true, message: "Faucet data cleared." });
  } catch (error: any) {
    console.error("Error clearing faucet data:", error);
    return NextResponse.json({ error: error.message ?? "Internal server error" }, { status: 500 });
  }
}
