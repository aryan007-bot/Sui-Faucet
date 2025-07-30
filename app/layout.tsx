<<<<<<< HEAD
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
=======
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })
>>>>>>> de55a8e1e48d97a85ed585ed88d2d132600c6d94

export const metadata: Metadata = {
  title: "Test Stream - Professional Sui Testnet Faucet",
  description:
    "Get SUI testnet tokens instantly with Test Stream. Professional, reliable, and developer-friendly faucet service.",
<<<<<<< HEAD
  generator: "v0.dev",
};
=======
    generator: 'v0.dev'
}
>>>>>>> de55a8e1e48d97a85ed585ed88d2d132600c6d94

export default function RootLayout({
  children,
}: {
<<<<<<< HEAD
  children: React.ReactNode;
=======
  children: React.ReactNode
>>>>>>> de55a8e1e48d97a85ed585ed88d2d132600c6d94
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
<<<<<<< HEAD
        <Providers> {/* ✅ WalletKitProvider at the top */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
=======
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
>>>>>>> de55a8e1e48d97a85ed585ed88d2d132600c6d94
}
