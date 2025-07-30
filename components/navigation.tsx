"use client";

import { useWalletKit } from "@mysten/wallet-kit";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Loader2, Copy, Check } from "lucide-react";

export function Navigation() {
  const { currentAccount, isConnected, connect, disconnect, isConnecting } = useWalletKit();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const address = currentAccount?.address;
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const navItems = [
    { href: "/", label: "Getting started" },
    { href: "/faucet", label: "Faucet" },
    { href: "/docs", label: "Documentation" },
    { href: "/admin", label: "Admin" },
  ];

  const ConnectWalletButton = () => (
    <Button
      onClick={() => connect("Slush") // or "Sui Wallet", depending on your intended wallet
      }
      disabled={isConnecting}
      className={`text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 px-4 py-2 rounded-lg font-medium shadow-lg border border-white/10 ${
        isConnecting ? "animate-pulse" : "hover:scale-105 sui-glow"
      }`}
    >
      {isConnecting ? (
        <>
          <Loader2 className="animate-spin w-4 h-4 mr-2" />
          Connecting...
        </>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );

  const DisconnectWalletButton = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative group">
        <Button
          onClick={disconnect}
          className="text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-pink-600 hover:to-red-500 transition-all duration-300 px-4 py-2 rounded-lg font-medium shadow-lg border border-white/10 flex items-center space-x-2"
        >
          <span>{shortAddress}</span>
          <span
            onClick={(e) => {
              e.stopPropagation(); // prevent disconnect
              handleCopy();
            }}
            className="hover:text-white cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </span>
        </Button>
        <span className="absolute -bottom-8 left-0 w-max opacity-0 group-hover:opacity-100 transition text-xs text-white bg-black px-2 py-1 rounded shadow">
          Click to disconnect | Copy address
        </span>
      </div>
    </motion.div>
  );

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
            {/* Left Nav */}
            <div className="flex items-center">
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
              <div className="lg:hidden text-white font-semibold text-sm sm:text-base">
                Test Stream
              </div>
            </div>

            {/* Right Nav */}
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
              <div className="hidden sm:flex">
                {isConnected ? <DisconnectWalletButton /> : <ConnectWalletButton />}
              </div>

              {/* Mobile Toggle */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  className="hover:bg-white/10 p-1.5 sm:p-2"
                >
                  {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
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
              <div className="w-full text-center">
                {isConnected ? <DisconnectWalletButton /> : <ConnectWalletButton />}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
