"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Getting started" },
    { href: "/faucet", label: "Faucet" },
    { href: "/docs", label: "Documentation" },
    { href: "/admin", label: "Admin" },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-2 sm:top-4 lg:top-6 left-4 sm:left-6 lg:left-12 z-50 w-[95%] sm:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[75%] px-2 sm:px-4"
    >
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Left side - Navigation Items */}
            <div className="flex items-center">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8 xl:space-x-12 2xl:space-x-16">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-all duration-300 text-sm xl:text-base font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div>

              {/* Mobile/Tablet Brand */}
              <div className="lg:hidden">
                <span className="text-white font-semibold text-sm sm:text-base">Test Stream</span>
              </div>
            </div>

            {/* Right side - Wallet Button & Mobile Menu */}
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
              {/* Desktop Wallet Button */}
              <Button className="hidden sm:flex bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-4 sm:px-5 lg:px-6 xl:px-8 py-2 lg:py-3 text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 rounded-lg sm:rounded-xl">
                <Wallet className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Wallet</span>
              </Button>

              {/* Mobile Wallet Button */}
              <Button className="sm:hidden bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-2 py-1.5 text-xs font-medium transition-all duration-300 rounded-lg">
                <Wallet className="w-3 h-3" />
              </Button>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  className="hover:bg-white/10 p-1.5 sm:p-2"
                >
                  {isOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10"
            >
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 sm:py-3 px-3 sm:px-4 text-gray-300 hover:text-white transition-colors text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 rounded-lg text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm rounded-lg py-2 sm:py-3 text-xs sm:text-sm">
                <Wallet className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Connect Wallet
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
