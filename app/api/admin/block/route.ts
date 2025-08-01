import { NextResponse } from "next/server";
import { bannedIPs, bannedWallets } from "../../faucet/route";

export async function POST(request: Request) {
  const { wallet, ip } = await request.json();

  if (!process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  if (ip) bannedIPs.add(ip);
  if (wallet) bannedWallets.add(wallet);

  return NextResponse.json({ success: true, message: `Blocked ${wallet || ip}` });
}
