"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function UserStats() {
  const [stats, setStats] = useState([
    { name: "Total Progress", value: 0, max: 100 },
    { name: "Concepts Mastered", value: 0, max: 100 },
    { name: "Quizzes Completed", value: 0, max: 20 },
    { name: "Average Quiz Score", value: 0, max: 100 },
  ])

  useEffect(() => {
    const progress = Number.parseInt(localStorage.getItem("userProgress") || "0")
    const conceptsMastered = Number.parseInt(localStorage.getItem("conceptsMastered") || "0")
    const quizzesCompleted = Number.parseInt(localStorage.getItem("quizzesCompleted") || "0")
    const averageQuizScore = Number.parseInt(localStorage.getItem("averageQuizScore") || "0")

    setStats([
      { name: "Total Progress", value: progress, max: 100 },
      { name: "Concepts Mastered", value: conceptsMastered, max: 100 },
      { name: "Quizzes Completed", value: quizzesCompleted, max: 20 },
      { name: "Average Quiz Score", value: averageQuizScore, max: 100 },
    ])
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{stat.name}</span>
                <span className="text-sm font-medium">
                  {stat.value}/{stat.max}
                </span>
              </div>
              <Progress value={(stat.value / stat.max) * 100} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

