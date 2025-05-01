import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProsprAI",
  description: "AI Powered Career and Job Guidance Platform",
  icons: {
    icon: {
      url: "/favicon.ico",
      sizes: "256x256",
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [shadesOfPurple],
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-muted/50 py-8">
              <div className="container mx-auto px-4 flex flex-col items-center text-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-semibold text-primary">
                    Made with
                  </span>
                  <span className="text-red-500 text-2xl">❤️</span>
                  <span className="text-xl font-semibold text-primary">
                    by ProsprAI
                  </span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">
                  © {new Date().getFullYear()} ProsprAI. All rights reserved.
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
