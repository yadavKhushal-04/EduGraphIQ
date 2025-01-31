import { HomeDashboard } from "@/components/HomeDashboard"
import { RecentActivity } from "@/components/RecentActivity"
import { RecommendedTopics } from "@/components/RecommendedTopics"
import { AIQandA } from "@/components/AIQandA"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <HomeDashboard />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <RecentActivity />
          <RecommendedTopics />
        </div>
        <div className="mt-8">
          <AIQandA />
        </div>
      </div>
    </main>
  )
}

