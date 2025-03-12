import { currentUser } from "@clerk/nextjs/server"

import { StreamPlayer } from "@/app/_components/stream-player"
import { getUserByUsername } from "@/lib/user-service"

interface DashboardProps {
  params: {
    slug: string
  }
}

const Dashboard = async ({ params }: DashboardProps) => {
  const { slug } = await params

  const externalUser = await currentUser()
  const user = await getUserByUsername(slug)

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized")
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  )
}
export default Dashboard
