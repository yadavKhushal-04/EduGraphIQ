"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Book, User, Award, Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const links = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/explore", icon: Book, label: "Explore" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/rewards", icon: Award, label: "Rewards" },
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-primary dark:text-white">
            EduPlatform
          </Link>
          <div className="flex items-center space-x-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative ${
                    pathname === link.href
                      ? "text-primary dark:text-white"
                      : "text-muted-foreground hover:text-primary dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="sr-only">{link.label}</span>
                  {pathname === link.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-primary dark:bg-white"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Button>
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative text-muted-foreground hover:text-primary dark:text-gray-300 dark:hover:text-white"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

