"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from a backend
    const userAchievements = [
      { name: "Quick Learner", description: "Completed 5 concepts in one day", unlocked: true },
      { name: "Math Whiz", description: "Achieved 100% on 3 consecutive quizzes", unlocked: true },
      { name: "Consistent Contributor", description: "Logged in for 7 days in a row", unlocked: false },
      { name: "Problem Solver", description: "Solved 50 practice problems", unlocked: false },
      { name: "Quiz Master", description: "Completed 10 quizzes", unlocked: false },
    ]
    setAchievements(userAchievements)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Achievements</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <Card key={index} className={achievement.unlocked ? "border-green-500" : "opacity-50"}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {achievement.name}
                <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                  {achievement.unlocked ? "Unlocked" : "Locked"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{achievement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

