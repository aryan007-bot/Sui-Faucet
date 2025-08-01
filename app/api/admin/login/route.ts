import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  // Compare with server-side secret
  if (password === process.env.ADMIN_SECRET) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
