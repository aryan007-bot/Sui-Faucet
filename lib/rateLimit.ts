// lib/rateLimit.ts

import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function checkRateLimit(ip: string, wallet: string) {
  const ipKey = `ratelimit:ip:${ip}`;
  const walletKey = `ratelimit:wallet:${wallet}`;
  const limit = 1;
  const duration = 60 * 60; // 1 hour in seconds

  const [ipCount, walletCount] = await Promise.all([
    redis.incr(ipKey),
    redis.incr(walletKey),
  ]);

  if (ipCount === 1) await redis.expire(ipKey, duration);
  if (walletCount === 1) await redis.expire(walletKey, duration);

  const ipExceeded = ipCount > limit;
  const walletExceeded = walletCount > limit;

  return {
    allowed: !ipExceeded && !walletExceeded,
    reason: ipExceeded ? "Too many requests from this IP." : walletExceeded ? "Wallet already requested recently." : null,
  };
}
