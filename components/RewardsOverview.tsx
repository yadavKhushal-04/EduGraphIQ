import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function RewardsOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Current Points</span>
              <span className="text-sm font-medium">3,120</span>
            </div>
            <Progress value={62} />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Next Reward</span>
              <span className="text-sm font-medium">1,880 points away</span>
            </div>
            <Progress value={62} />
          </div>
          <div className="pt-4">
            <h3 className="font-semibold mb-2">Recent Earnings</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Completed Linear Equations</span>
                <span className="font-medium">+100 pts</span>
              </li>
              <li className="flex justify-between">
                <span>Daily Login Bonus</span>
                <span className="font-medium">+20 pts</span>
              </li>
              <li className="flex justify-between">
                <span>Quiz High Score</span>
                <span className="font-medium">+50 pts</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

