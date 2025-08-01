import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const LOG_FILE = path.join(process.cwd(), "faucet-logs.json");

export async function GET() {
  let logs: any[] = [];
  try {
    if (fs.existsSync(LOG_FILE)) {
      logs = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
    }
  } catch (err) {
    console.error("Error reading logs:", err);
  }

  const totalRequests = logs.length;
  const successfulRequests = logs.filter((l) => l.status === "success").length;
  const failedRequests = totalRequests - successfulRequests;

  // Prepare graph data (last 10 requests)
  const graphData = logs.slice(-10).map((l) => ({
    time: new Date(l.timestamp).toLocaleTimeString(),
    requests: 1,
  }));

  return NextResponse.json({
    totalRequests,
    successfulRequests,
    failedRequests,
    recentRequests: logs.slice(0, 10),
    graphData,
  });
}
