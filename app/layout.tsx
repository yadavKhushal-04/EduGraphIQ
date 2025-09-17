import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import { MotionConfig } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Advanced Educational Platform",
  description: "Learn through interactive concept maps and personalized feedback",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionConfig reducedMotion="user">
            <AnimatedGradientBackground>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">{children}</main>
              </div>
              <Toaster />
            </AnimatedGradientBackground>
          </MotionConfig>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const apiKey = localStorage.getItem('OPENAI_API_KEY');
                  if (apiKey) {
                    window.OPENAI_API_KEY = apiKey;
                  }
                } catch (error) {
                  console.error('Error setting API key:', error);
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}



import './globals.css'