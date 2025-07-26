import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

// In-memory storage for rate limiting (use Redis in production)
const requestLog = new Map<string, { count: number; lastRequest: number }>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS_PER_HOUR = 1
const FAUCET_AMOUNT = 1000000000 // 1 SUI in MIST

function isValidSuiAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(address)
}

function getRateLimitKey(ip: string, address: string): string {
  return `${ip}:${address}`
}

function checkRateLimit(key: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now()
  const record = requestLog.get(key)

  if (!record) {
    requestLog.set(key, { count: 1, lastRequest: now })
    return { allowed: true }
  }

  if (now - record.lastRequest > RATE_LIMIT_WINDOW) {
    requestLog.set(key, { count: 1, lastRequest: now })
    return { allowed: true }
  }

  if (record.count >= MAX_REQUESTS_PER_HOUR) {
    const resetTime = record.lastRequest + RATE_LIMIT_WINDOW
    return { allowed: false, resetTime }
  }

  record.count++
  record.lastRequest = now
  return { allowed: true }
}

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json()

    // Validate address
    if (!address || !isValidSuiAddress(address)) {
      return NextResponse.json({ error: "Invalid Sui address format" }, { status: 400 })
    }

    // Get client IP
    const headersList = await headers()
    const forwarded = headersList.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : "127.0.0.1"

    // Check rate limit
    const rateLimitKey = getRateLimitKey(ip, address)
    const rateLimit = checkRateLimit(rateLimitKey)

    if (!rateLimit.allowed) {
      const resetTime = rateLimit.resetTime!
      const waitTime = Math.ceil((resetTime - Date.now()) / 1000 / 60) // minutes

      return NextResponse.json(
        {
          error: `Rate limit exceeded. Try again in ${waitTime} minutes.`,
          resetTime,
        },
        { status: 429 },
      )
    }

    // Simulate token transfer (replace with actual Sui SDK calls)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network delay

    // Generate mock transaction hash
    const txHash = `0x${Math.random().toString(16).substr(2, 64)}`

    // Log the request
    console.log(`Faucet request: ${address} from ${ip} - TX: ${txHash}`)

    return NextResponse.json({
      success: true,
      txHash,
      amount: FAUCET_AMOUNT / 1000000000, // Convert back to SUI
      address,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Faucet error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    rateLimit: {
      maxRequests: MAX_REQUESTS_PER_HOUR,
      windowMs: RATE_LIMIT_WINDOW,
    },
    faucetAmount: FAUCET_AMOUNT / 1000000000,
  })
}
