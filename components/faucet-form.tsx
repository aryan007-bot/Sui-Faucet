"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Droplets, CheckCircle } from "lucide-react"

export function FaucetForm() {
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [lastRequest, setLastRequest] = useState<string | null>(null)
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
        setAddress("")
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
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="w-full max-w-md mx-auto bg-gray-900/50 border-gray-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
            <Droplets className="w-6 h-6 text-blue-500" />
            <span>Get SUI Tokens</span>
          </CardTitle>
          <CardDescription>Enter your Sui address to receive testnet tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="0x... (Sui address)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading || !address.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending Tokens...
                </>
              ) : (
                <>
                  <Droplets className="w-4 h-4 mr-2" />
                  Request Tokens
                </>
              )}
            </Button>
          </form>

          {lastRequest && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 bg-green-900/20 border border-green-700 rounded-lg"
            >
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Transaction Hash:</span>
              </div>
              <p className="text-xs text-green-300 mt-1 font-mono break-all">{lastRequest}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
