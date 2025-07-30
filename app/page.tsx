"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Shield, Clock, Github, Twitter, Droplets, Code, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get your testnet tokens in under 30 seconds",
    },
    {
      icon: Shield,
      title: "Abuse Protection",
      description: "Smart rate limiting prevents spam and abuse",
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Always online and ready to serve developers",
    },
  ]

  const stats = [
    { label: "Tokens Distributed", value: "1.2M+", icon: Droplets },
    { label: "Active Developers", value: "5K+", icon: Users },
    { label: "Success Rate", value: "99.9%", icon: Zap },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm"
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Professional Sui Testnet Faucet
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                  <span className="block">Test Stream</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    Faucet
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                  The most reliable and developer-friendly Sui testnet faucet. Get SUI tokens instantly with our
                  professional-grade infrastructure.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0">
                <Link href="/faucet" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto"
                  >
                    Get Tokens Now
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/docs" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-white/10 bg-transparent text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto"
                  >
                    <Code className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    View Documentation
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 px-4 sm:px-0"
              >
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mr-2" />
                      <span className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Why Choose Test Stream?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg px-4 sm:px-0">
                Built by developers, for developers. We understand the pain points and created a solution that just
                works.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50 backdrop-blur-sm h-full hover:border-blue-500/50 transition-all duration-300 group-hover:transform group-hover:scale-105">
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                        <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">{feature.title}</h3>
                      <p className="text-gray-400 text-base sm:text-lg">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Building?</h2>
              <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join thousands of developers who trust Test Stream for their Sui testnet token needs.
              </p>
              <Link href="/faucet">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto"
                >
                  Get Started Now
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">Test Stream</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-4 sm:space-x-6">
                  <Link href="/docs" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                    Documentation
                  </Link>
                  <Link href="/admin" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                    Admin
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="hover:bg-white/10 p-2">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-white/10 p-2">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800/50 text-center text-gray-400 text-sm sm:text-base">
              <p>&copy; 2024 Test Stream. Built for the Sui developer community.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
