"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_logged");
    if (saved === "true") setLoggedIn(true);
  }, []);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setLoggedIn(true);
      localStorage.setItem("admin_logged", "true");
    } else {
      alert("❌ Wrong password");
    }
  };

  const { data, mutate } = useSWR(loggedIn ? "/api/admin/stats" : null, fetcher, {
    refreshInterval: 5000,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111827] to-black text-white overflow-hidden">
      <Navigation />

      {/* =============== Login Screen =============== */}
      {!loggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen pt-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 w-full max-w-sm shadow-[0_0_30px_rgba(0,0,0,0.3)]"
          >
            <CardHeader>
              <CardTitle className="text-2xl text-center text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                🔑 Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                className="bg-gray-900/50 border-gray-700 text-white focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-transform shadow-lg shadow-purple-500/30"
              >
                Login
              </Button>
            </CardContent>
          </motion.div>
        </div>
      ) : !data ? (
        // =============== Loading State ===============
        <div className="text-center mt-40 text-gray-400 animate-pulse text-lg">
          Loading dashboard...
        </div>
      ) : (
        // =============== Dashboard ===============
        <main className="pt-28 px-6 max-w-7xl mx-auto space-y-10">
          {/* ========== Stats Cards ========== */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: "Total Requests", value: data.totalRequests, color: "from-blue-500 to-cyan-400" },
              { title: "Successful", value: data.successfulRequests, color: "from-green-500 to-emerald-400" },
              { title: "Failed", value: data.failedRequests, color: "from-red-500 to-pink-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${stat.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-10 blur-2xl" />
                <p className="text-sm opacity-80">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* ========== Requests Graph ========== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 shadow-lg backdrop-blur-md"
          >
            <CardTitle className="mb-4 text-lg font-semibold text-blue-400 flex items-center gap-2">
              📈 Requests Over Time
            </CardTitle>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data.graphData}>
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "8px",
                    border: "1px solid #374151",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#60a5fa"
                  strokeWidth={3}
                  dot={{ fill: "#60a5fa" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* ========== Recent Requests Table ========== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 border border-gray-700 rounded-2xl shadow-lg overflow-hidden"
          >
            <CardHeader className="sticky top-0 bg-gray-800/70 backdrop-blur-lg border-b border-gray-700">
              <CardTitle className="text-purple-400">Recent Requests</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-600">
              <table className="min-w-full text-xs sm:text-sm">
                <thead className="bg-gray-800 text-gray-300 sticky top-0">
                  <tr>
                    <th className="p-2 text-left">Wallet</th>
                    <th className="p-2">IP</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Tx Hash</th>
                    <th className="p-2">Time</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentRequests.map((req: any, i: number) => (
                    <motion.tr
                      key={req.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="border-t border-gray-800 transition"
                    >
                      <td className="p-2">{req.wallet}</td>
                      <td className="p-2">{req.ip}</td>
                      <td className="p-2">
                        <Badge
                          className={
                            req.status === "success"
                              ? "bg-green-900 text-green-300"
                              : "bg-red-900 text-red-300"
                          }
                        >
                          {req.status}
                        </Badge>
                      </td>
                      <td className="p-2 text-blue-400 truncate max-w-[120px]">
                        {req.txHash || "-"}
                      </td>
                      <td className="p-2">{new Date(req.timestamp).toLocaleTimeString()}</td>
                      <td className="p-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-600/20 hover:scale-105 transition-transform"
                          onClick={async () => {
                            await fetch("/api/admin/block", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ wallet: req.wallet, ip: req.ip }),
                            });
                            mutate();
                          }}
                        >
                          Block
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </motion.div>
        </main>
      )}
    </div>
  );
}
