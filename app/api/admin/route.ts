import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

// === CONFIG ===
const LOG_FILE = path.join(process.cwd(), "faucet-logs.json");
const BAN_FILE = path.join(process.cwd(), "faucet-bans.json");

// Load logs from file
function loadLogs() {
  if (fs.existsSync(LOG_FILE)) {
    return JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
  }
  return [];
}

// Load bans from file
function loadBans() {
  if (fs.existsSync(BAN_FILE)) {
    return JSON.parse(fs.readFileSync(BAN_FILE, "utf8"));
  }
  return { ips: [], wallets: [] };
}

// Save bans to file
function saveBans(bans: any) {
  fs.writeFileSync(BAN_FILE, JSON.stringify(bans, null, 2));
}

// === GET: View logs and bans ===
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return NextResponse.json({
    logs: loadLogs(),
    bans: loadBans(),
  });
}

// === POST: Ban IP or Wallet ===
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { secret, ip, wallet, action } = body;

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const bans = loadBans();

  if (action === "ban") {
    if (ip && !bans.ips.includes(ip)) bans.ips.push(ip);
    if (wallet && !bans.wallets.includes(wallet)) bans.wallets.push(wallet);
  }

  if (action === "unban") {
    if (ip) bans.ips = bans.ips.filter((i: string) => i !== ip);
    if (wallet) bans.wallets = bans.wallets.filter((w: string) => w !== wallet);
  }

  saveBans(bans);

  return NextResponse.json({
    success: true,
    bans,
  });
}

// === DELETE: Reset faucet data ===
export async function DELETE(request: NextRequest) {
  const { secret } = await request.json();

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  fs.writeFileSync(LOG_FILE, JSON.stringify([]));
  fs.writeFileSync(BAN_FILE, JSON.stringify({ ips: [], wallets: [] }));

  return NextResponse.json({ success: true, message: "Faucet data reset" });
}
