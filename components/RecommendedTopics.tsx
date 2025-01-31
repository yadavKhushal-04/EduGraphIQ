import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RecommendedTopics() {
  const topics = [
    { id: 1, name: "Trigonometry Basics", difficulty: "Intermediate" },
    { id: 2, name: "Calculus: Derivatives", difficulty: "Advanced" },
    { id: 3, name: "Statistics: Probability", difficulty: "Beginner" },
    { id: 4, name: "Algebra: Factoring", difficulty: "Intermediate" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {topics.map((topic) => (
            <li key={topic.id} className="flex items-center justify-between">
              <div>
                <span className="font-medium">{topic.name}</span>
                <p className="text-sm text-muted-foreground">{topic.difficulty}</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href={`/explore/${topic.id}`}>Start</Link>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

