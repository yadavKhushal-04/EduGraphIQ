"use client"

import { motion } from "framer-motion"

export const AnimatedGradientBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-background to-muted"
      animate={{
        background: [
          "linear-gradient(to bottom right, hsl(var(--background)), hsl(var(--muted)))",
          "linear-gradient(to bottom right, hsl(var(--muted)), hsl(var(--background)))",
        ],
      }}
      transition={{
        duration: 10,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      {children}
    </motion.div>
  )
}

