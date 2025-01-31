import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function UserAchievements() {
  const achievements = [
    { name: "Quick Learner", description: "Completed 5 concepts in one day" },
    { name: "Math Whiz", description: "Achieved 100% on 3 consecutive quizzes" },
    { name: "Consistent Contributor", description: "Logged in for 7 days in a row" },
    { name: "Problem Solver", description: "Solved 50 practice problems" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.name} className="flex items-start space-x-2">
              <Badge variant="secondary" className="mt-1">
                {achievement.name}
              </Badge>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

