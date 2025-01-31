import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Leaderboard() {
  const leaders = [
    { name: "Sarah J.", points: 5240, avatar: "/avatar1.jpg" },
    { name: "Mike T.", points: 4980, avatar: "/avatar2.jpg" },
    { name: "Emma R.", points: 4750, avatar: "/avatar3.jpg" },
    { name: "Alex L.", points: 3120, avatar: "/avatar4.jpg" },
    { name: "Chris M.", points: 2890, avatar: "/avatar5.jpg" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaders.map((leader, index) => (
            <div key={leader.name} className="flex items-center space-x-4">
              <div className="font-bold w-6">{index + 1}</div>
              <Avatar>
                <AvatarImage src={leader.avatar} alt={leader.name} />
                <AvatarFallback>
                  {leader.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{leader.name}</div>
                <div className="text-sm text-gray-600">{leader.points} pts</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

