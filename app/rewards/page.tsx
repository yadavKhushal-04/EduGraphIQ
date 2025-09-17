import { RewardsOverview } from "@/components/RewardsOverview"
import { RewardsShop } from "@/components/RewardsShop"
import { Leaderboard } from "@/components/Leaderboard"

export default function RewardsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Rewards Center</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RewardsOverview />
          <RewardsShop />
          <Leaderboard />
        </div>
      </div>
    </main>
  )
}

