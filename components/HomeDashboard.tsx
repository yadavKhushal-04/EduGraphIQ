"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TrendingUp, Award, BookOpen, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Mock data for concepts
const concepts = [
  "Linear Equations",
  "Quadratic Equations",
  "Trigonometry",
  "Calculus",
  "Statistics",
  "Geometry",
  "Algebra",
  "Probability",
  "Vectors",
  "Matrices",
]

export function HomeDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])

  useEffect(() => {
    // Generate initial recommendations
    setRecommendations(getRandomConcepts(3))
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    const results = concepts.filter((concept) => concept.toLowerCase().includes(searchQuery.toLowerCase()))
    setSearchResults(results)

    // Update recommendations based on search query
    if (results.length > 0) {
      setRecommendations(getRandomConcepts(3, results))
    } else {
      setRecommendations(getRandomConcepts(3))
    }
  }, [searchQuery])

  const getRandomConcepts = (count: number, fromList: string[] = concepts) => {
    const shuffled = [...fromList].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  return (
    <motion.div initial="initial" animate="animate" variants={staggerChildren} className="space-y-6">
      <motion.h1 className="text-3xl font-bold text-foreground" variants={fadeInUp}>
        Welcome back, Alex!
      </motion.h1>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" variants={staggerChildren}>
        <motion.div variants={fadeInUp}>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">78%</div>
              <Progress value={78} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Concepts Mastered</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">42/100</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Points Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">3,120</div>
              <p className="text-xs text-muted-foreground">+280 this week</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Current Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">7 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div className="relative" variants={fadeInUp}>
        <Input
          type="text"
          placeholder="Search concepts, questions, or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-gray-800 text-foreground"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </motion.div>

      {searchResults.length > 0 && (
        <motion.div variants={fadeInUp}>
          <h2 className="text-xl font-semibold mb-3 text-foreground">Search Results</h2>
          <ul className="space-y-2">
            {searchResults.map((result, index) => (
              <li key={index}>
                <Link
                  href={`/explore/${result.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-primary hover:underline"
                >
                  {result}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div variants={fadeInUp}>
        <h2 className="text-xl font-semibold mb-3 text-foreground">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/explore">Continue Learning</Link>
          </Button>
          <Button asChild variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
            <Link href="/quiz">Take a Quiz</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Link href="/achievements">View Achievements</Link>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

