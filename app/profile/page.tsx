import { UserProfile } from "@/components/UserProfile"
import { UserStats } from "@/components/UserStats"
import { UserAchievements } from "@/components/UserAchievements"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UserProfile />
          <div className="md:col-span-2 space-y-8">
            <UserStats />
            <UserAchievements />
          </div>
        </div>
      </div>
    </main>
  )
}

