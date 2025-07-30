"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Zap, Shield, AlertTriangle } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Documentation</h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Complete guide to using the Sui Faucet API and web interface
            </p>
          </motion.div>

          <div className="space-y-6 sm:space-y-8">
            {/* Quick Start */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <span>Quick Start</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Get started with the Sui Faucet in minutes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">Web Interface</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm sm:text-base">
                      <li>Navigate to the homepage</li>
                      <li>Enter your Sui wallet address (0x...)</li>
                      <li>Click "Request Tokens"</li>
                      <li>Wait for confirmation (usually {"<30s"})</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">API Usage</h3>
                    <div className="bg-gray-800 rounded-lg p-3 sm:p-4 overflow-x-auto">
                      <code className="text-green-400 text-xs sm:text-sm">
                        {`curl -X POST https://sui-faucet.example.com/api/faucet \\
  -H "Content-Type: application/json" \\
  -d '{"address": "0x..."}'`}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* API Reference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <Code className="w-5 h-5 text-blue-500" />
                    <span>API Reference</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Complete API documentation for developers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary" className="bg-green-900 text-green-300 text-xs sm:text-sm">
                        POST
                      </Badge>
                      <code className="text-blue-400 text-sm sm:text-base">/api/faucet</code>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm sm:text-base">Request testnet tokens for a Sui address</p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm sm:text-base">Request Body</h4>
                        <div className="bg-gray-800 rounded-lg p-3 sm:p-4 overflow-x-auto">
                          <pre className="text-xs sm:text-sm text-gray-300">
                            {`{
  "address": "0x1234...abcd" // Valid Sui address
}`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm sm:text-base">Success Response (200)</h4>
                        <div className="bg-gray-800 rounded-lg p-3 sm:p-4 overflow-x-auto">
                          <pre className="text-xs sm:text-sm text-gray-300">
                            {`{
  "success": true,
  "txHash": "0xabcd...1234",
  "amount": 1.0,
  "address": "0x1234...abcd",
  "timestamp": "2024-01-01T00:00:00.000Z"
}`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm sm:text-base">Error Response (429)</h4>
                        <div className="bg-gray-800 rounded-lg p-3 sm:p-4 overflow-x-auto">
                          <pre className="text-xs sm:text-sm text-gray-300">
                            {`{
  "error": "Rate limit exceeded. Try again in 45 minutes.",
  "resetTime": 1704067200000
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary" className="bg-blue-900 text-blue-300 text-xs sm:text-sm">
                        GET
                      </Badge>
                      <code className="text-blue-400 text-sm sm:text-base">/api/faucet</code>
                    </div>
                    <p className="text-gray-300 mb-4 text-sm sm:text-base">Get faucet status and configuration</p>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm sm:text-base">Response (200)</h4>
                      <div className="bg-gray-800 rounded-lg p-3 sm:p-4 overflow-x-auto">
                        <pre className="text-xs sm:text-sm text-gray-300">
                          {`{
  "status": "online",
  "rateLimit": {
    "maxRequests": 1,
    "windowMs": 3600000
  },
  "faucetAmount": 1.0
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rate Limiting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <span>Rate Limiting</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Understanding our abuse prevention system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">Limits</h3>
                      <ul className="space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm">
                        <li>• 1 request per hour per IP address</li>
                        <li>• 1 request per hour per wallet address</li>
                        <li>• Maximum 1 SUI per request</li>
                        <li>• 30-second timeout per request</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 text-sm sm:text-base">Headers</h3>
                      <ul className="space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm">
                        <li>
                          • <code className="text-blue-400">X-RateLimit-Limit</code>: Request limit
                        </li>
                        <li>
                          • <code className="text-blue-400">X-RateLimit-Remaining</code>: Remaining requests
                        </li>
                        <li>
                          • <code className="text-blue-400">X-RateLimit-Reset</code>: Reset timestamp
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-semibold text-sm sm:text-base">Important</span>
                    </div>
                    <p className="text-yellow-300 text-xs sm:text-sm">
                      Rate limits are enforced per IP address AND per wallet address. This means you cannot bypass
                      limits by using different addresses from the same IP.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Error Codes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <AlertTriangle className="w-5 h-5 text-blue-500" />
                    <span>Error Codes</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Common error responses and how to handle them
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { code: 400, title: "Bad Request", desc: "Invalid address format or missing parameters" },
                      { code: 429, title: "Too Many Requests", desc: "Rate limit exceeded, wait before retrying" },
                      { code: 500, title: "Internal Server Error", desc: "Temporary server issue, try again later" },
                      {
                        code: 503,
                        title: "Service Unavailable",
                        desc: "Faucet is temporarily offline for maintenance",
                      },
                    ].map((error) => (
                      <div key={error.code} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                        <Badge variant="destructive" className="mt-0.5 text-xs">
                          {error.code}
                        </Badge>
                        <div>
                          <h4 className="font-semibold text-sm sm:text-base">{error.title}</h4>
                          <p className="text-gray-400 text-xs sm:text-sm">{error.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
