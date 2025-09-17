import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function UserProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <Avatar className="w-24 h-24 mx-auto">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-2xl font-bold">Alex Lee</h2>
        <p className="text-gray-500">Math Enthusiast</p>
        <div className="mt-6 space-y-2">
          <Button className="w-full">Edit Profile</Button>
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

