"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Triangle, Copy, Wallet, ArrowDown, CheckCircle, AlertCircle, Droplets, Zap } from "lucide-react"

export default function FaucetPage() {
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [lastRequest, setLastRequest] = useState<string | null>(null)
  const [network, setNetwork] = useState("testnet")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!address.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Sui address",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)

    // Simulate verification delay
    setTimeout(async () => {
      setIsVerifying(false)
      setIsLoading(true)

      try {
        const response = await fetch("/api/faucet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address }),
        })

        const data = await response.json()

        if (response.ok) {
          setLastRequest(data.txHash)
          toast({
            title: "Success!",
            description: `Sent ${data.amount} SUI to your address`,
          })
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to send tokens",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Network error. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }, 2000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Address copied to clipboard",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10 pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-4"
              >
                <Triangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Testnet Token Request
                </span>
              </h1>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              Get SUI testnet tokens instantly with our professional-grade faucet infrastructure
            </p>
          </motion.div>

          {/* Main Faucet Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-700/50">
                <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl text-white">Request Tokens</CardTitle>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <Select value={network} onValueChange={setNetwork}>
                      <SelectTrigger className="w-full sm:w-36 bg-gray-800/50 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="testnet">Testnet</SelectItem>
                        <SelectItem value="devnet">Devnet</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 text-sm sm:text-base">
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 sm:mb-3">Your Wallet Address</label>
                    <Input
                      type="text"
                      placeholder="0x... (Enter your Sui wallet address)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-12 sm:h-14 text-sm sm:text-base bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg sm:rounded-xl"
                      disabled={isLoading || isVerifying}
                    />
                  </div>

                  {/* Verification Widget */}
                  {isVerifying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center p-6 sm:p-8 bg-gray-800/30 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-600"
                    >
                      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-300 text-base sm:text-lg">Verifying...</span>
                        <div className="text-xs sm:text-sm text-gray-400">
                          <div className="flex items-center justify-center sm:justify-start space-x-2">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-md flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                              C
                            </span>
                            <span>CLOUDFLARE</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Privacy • Terms</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-14 lg:h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-base sm:text-lg font-medium rounded-xl sm:rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading || isVerifying || !address.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 animate-spin" />
                        Sending Tokens...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                        Request Testnet SUI
                      </>
                    )}
                  </Button>
                </form>

                {lastRequest && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 sm:mt-8 p-4 sm:p-6 bg-green-500/10 border border-green-500/30 rounded-xl sm:rounded-2xl"
                  >
                    <div className="flex items-center space-x-3 text-green-400 mb-3 sm:mb-4">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="font-semibold text-base sm:text-lg">Transaction Successful!</span>
                    </div>
                    <p className="text-xs sm:text-sm text-green-300 mb-2 sm:mb-3">Transaction Hash:</p>
                    <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-600">
                      <code className="text-xs sm:text-sm text-gray-300 flex-1 font-mono break-all">{lastRequest}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(lastRequest)}
                        className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-gray-700 flex-shrink-0"
                      >
                        <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Return Tokens Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 sm:mb-8"
          >
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-white flex items-center">
                  <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-400" />
                  Unused Testnet SUI?
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm sm:text-base">
                  Return your unused tokens to help other developers in the community!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 sm:mb-3">
                      Return tokens to address:
                    </label>
                    <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-600">
                      <code className="text-xs sm:text-sm text-gray-300 flex-1 font-mono break-all">
                        0x7a9d19d4c210663926eb549da59a54e25777fef63161bfccda08277b58b4212e
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard("0x7a9d19d4c210663926eb549da59a54e25777fef63161bfccda08277b58b4212e")
                        }
                        className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-gray-700 flex-shrink-0"
                      >
                        <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
          >
            <Card className="bg-blue-500/10 border-blue-500/30 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                  <h3 className="font-semibold text-blue-300 text-base sm:text-lg">Rate Limits</h3>
                </div>
                <ul className="text-xs sm:text-sm text-blue-200 space-y-1 sm:space-y-2">
                  <li>• 1 request per hour per address</li>
                  <li>• Maximum 1 SUI per request</li>
                  <li>• Automatic spam protection</li>
                  <li>• Fair distribution system</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-purple-500/10 border-purple-500/30 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                  <h3 className="font-semibold text-purple-300 text-base sm:text-lg">Important</h3>
                </div>
                <ul className="text-xs sm:text-sm text-purple-200 space-y-1 sm:space-y-2">
                  <li>• Only for testnet development</li>
                  <li>• Tokens have no real value</li>
                  <li>• Please return unused tokens</li>
                  <li>• Help the developer community</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
