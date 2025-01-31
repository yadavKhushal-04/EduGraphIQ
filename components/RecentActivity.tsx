import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentActivity() {
  const activities = [
    { id: 1, type: "Completed", topic: "Linear Equations", date: "2 hours ago" },
    { id: 2, type: "Started", topic: "Quadratic Functions", date: "Yesterday" },
    { id: 3, type: "Achieved", topic: "Math Whiz Badge", date: "2 days ago" },
    { id: 4, type: "Completed", topic: "Geometry Basics", date: "3 days ago" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-center justify-between">
              <div>
                <Badge variant={activity.type === "Completed" ? "default" : "secondary"}>{activity.type}</Badge>
                <span className="ml-2 font-medium">{activity.topic}</span>
              </div>
              <span className="text-sm text-muted-foreground">{activity.date}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

