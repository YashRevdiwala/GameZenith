import { Users } from "@prisma/client"

import { getSelf } from "./auth-service"
import { db } from "./db"

export const getRecommended = async () => {
  let userId: string | null
  let users: Users[]

  try {
    const self = await getSelf()
    userId = self.id
  } catch {
    userId = null
  }

  if (userId) {
    users = await db.users.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockerId: userId,
                },
              },
            },
          },
        ],
      },

      orderBy: {
        createdAt: "desc",
      },
    })
  } else {
    users = await db.users.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  return users
}
