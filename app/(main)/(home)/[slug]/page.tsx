import { notFound } from "next/navigation"

import { Actions } from "./_components/actions"
import { isFollowingUser } from "@/lib/follow-service"
import { getRecommended } from "@/lib/recommended-service"
import { getUserByUsername } from "@/lib/user-service"
import { isBlockedByUser } from "@/lib/block-service"

export const generateStaticParams = async () => {
  const users = await getRecommended()

  return users.map((user) => ({
    slug: user.username,
  }))
}

interface UserPageProps {
  params: {
    slug: string
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const { slug } = await params

  const user = await getUserByUsername(slug)

  if (!user) notFound()

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)

  // if (isBlocked) notFound()

  return (
    <div>
      <h1>Username: {user.username}</h1>
      <p>UserId: {user.id}</p>
      <p>Is following: {isFollowing ? "Yes" : "No"}</p>
      <p>Is blocked: {isBlocked ? "Yes" : "No"}</p>
      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  )
}

export default UserPage
