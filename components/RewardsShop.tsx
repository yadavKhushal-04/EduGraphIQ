import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RewardsShop() {
  const rewards = [
    { name: "Extra Hint", cost: 50, description: "Get an extra hint on a difficult problem" },
    { name: "Theme Unlock", cost: 200, description: "Unlock a new app theme" },
    { name: "Practice Test", cost: 500, description: "Access a full practice test" },
    { name: "One-on-One Tutoring", cost: 1000, description: "30-minute session with a tutor" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rewards Shop</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div key={reward.name} className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{reward.name}</h3>
                <p className="text-sm text-gray-600">{reward.description}</p>
              </div>
              <Button variant="outline">{reward.cost} pts</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

