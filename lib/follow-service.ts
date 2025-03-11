import { getSelf } from "./auth-service"
import { db } from "./db"

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf()

    return await db.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockerId: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    })
  } catch {
    return []
  }
}

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf()

    if (self.id === id) return true

    const otherUser = await db.users.findUnique({
      where: {
        id,
      },
    })

    if (!otherUser) throw new Error("User not found")

    const following = await db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: self.id,
          followingId: otherUser.id,
        },
      },
    })

    return !!following
  } catch {
    return false
  }
}

export const followUser = async (id: string) => {
  const self = await getSelf()

  if (self.id === id) throw new Error("Cannot follow yourself")

  const otherUser = await db.users.findUnique({
    where: {
      id,
    },
  })

  if (!otherUser) throw new Error("User not found")

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  })

  if (existingFollow) throw new Error("Already following user")

  return await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      following: true,
      follower: true,
    },
  })
}

export const unFollowUser = async (id: string) => {
  const self = await getSelf()

  if (self.id === id) throw new Error("Cannot unfollow yourself")

  const otherUser = await db.users.findUnique({
    where: {
      id,
    },
  })

  if (!otherUser) throw new Error("User not found")

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  })

  if (!existingFollow) throw new Error("Not following user")

  return await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  })
}
