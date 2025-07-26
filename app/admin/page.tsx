"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Activity, Users, Droplets, AlertTriangle, TrendingUp, Clock, Shield, Settings } from "lucide-react"

interface AdminStats {
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  totalTokensSent: number
  activeUsers: number
  averageResponseTime: number
}

interface RecentRequest {
  id: string
  address: string
  ip: string
  timestamp: string
  status: "success" | "failed" | "rate_limited"
  amount?: number
  txHash?: string
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalRequests: 1247,
    successfulRequests: 1156,
    failedRequests: 91,
    totalTokensSent: 1156,
    activeUsers: 89,
    averageResponseTime: 2.3,
  })

  const [recentRequests] = useState<RecentRequest[]>([
    {
      id: "1",
      address: "0x1234...abcd",
      ip: "192.168.1.1",
      timestamp: "2024-01-01T12:00:00Z",
      status: "success",
      amount: 1,
      txHash: "0xabcd...1234",
    },
    {
      id: "2",
      address: "0x5678...efgh",
      ip: "192.168.1.2",
      timestamp: "2024-01-01T11:55:00Z",
      status: "rate_limited",
    },
    {
      id: "3",
      address: "0x9012...ijkl",
      ip: "192.168.1.3",
      timestamp: "2024-01-01T11:50:00Z",
      status: "success",
      amount: 1,
      txHash: "0xefgh...5678",
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-900 text-green-300 text-xs">Success</Badge>
      case "failed":
        return (
          <Badge variant="destructive" className="text-xs">
            Failed
          </Badge>
        )
      case "rate_limited":
        return <Badge className="bg-yellow-900 text-yellow-300 text-xs">Rate Limited</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            Unknown
          </Badge>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Admin Dashboard</h1>
            <p className="text-gray-400 text-base sm:text-lg">Monitor faucet performance and manage system settings</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Total Requests</CardTitle>
                  <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{stats.totalRequests.toLocaleString()}</div>
                  <p className="text-xs text-green-400">+12% from last hour</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">
                    {((stats.successfulRequests / stats.totalRequests) * 100).toFixed(1)}%
                  </div>
                  <p className="text-xs text-green-400">+2.1% from yesterday</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Tokens Distributed</CardTitle>
                  <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{stats.totalTokensSent.toLocaleString()} SUI</div>
                  <p className="text-xs text-blue-400">Last 24 hours</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{stats.activeUsers}</div>
                  <p className="text-xs text-purple-400">Last hour</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Avg Response Time</CardTitle>
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{stats.averageResponseTime}s</div>
                  <p className="text-xs text-yellow-400">-0.3s from yesterday</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium">Failed Requests</CardTitle>
                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{stats.failedRequests}</div>
                  <p className="text-xs text-red-400">
                    {((stats.failedRequests / stats.totalRequests) * 100).toFixed(1)}% failure rate
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Recent Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    <span>Recent Requests</span>
                  </CardTitle>
                  <CardDescription className="text-sm">Latest faucet requests and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {recentRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between p-2 sm:p-3 bg-gray-800/50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <code className="text-xs sm:text-sm text-blue-400 truncate">{request.address}</code>
                            {getStatusBadge(request.status)}
                          </div>
                          <div className="text-xs text-gray-400">
                            {request.ip} • {new Date(request.timestamp).toLocaleTimeString()}
                          </div>
                          {request.txHash && <div className="text-xs text-green-400 mt-1">TX: {request.txHash}</div>}
                        </div>
                        {request.amount && (
                          <div className="text-xs sm:text-sm font-semibold text-blue-400">{request.amount} SUI</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* System Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    <span>System Controls</span>
                  </CardTitle>
                  <CardDescription className="text-sm">Manage faucet settings and configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Faucet Amount (SUI)</label>
                    <Input type="number" defaultValue="1.0" className="bg-gray-800 border-gray-600 text-sm" />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Rate Limit (requests/hour)</label>
                    <Input type="number" defaultValue="1" className="bg-gray-800 border-gray-600 text-sm" />
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-sm">Update Settings</Button>
                    <Button variant="outline" className="border-gray-600 bg-transparent text-sm">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Security
                    </Button>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-xs sm:text-sm font-medium">Faucet Status</span>
                      <Badge className="bg-green-900 text-green-300 text-xs">Online</Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-yellow-600 text-yellow-400 bg-transparent text-xs"
                      >
                        Maintenance Mode
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 bg-transparent text-xs"
                      >
                        Emergency Stop
                      </Button>
                    </div>
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
