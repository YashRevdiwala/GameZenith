import { currentUser } from "@clerk/nextjs/server"

import { db } from "./db"

export const getSelf = async () => {
  const self = await currentUser()

  if (!self || !self.id) {
    throw new Error("Unauthorized")
  }

  const user = await db.users.findUnique({
    where: {
      externalUserId: self.id,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  return user
}

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser()

  if (!self || !self.id) throw new Error("Unauthorized")

  const user = await db.users.findUnique({
    where: {
      username,
    },
  })

  if (!user) throw new Error("User not found")

  if (self.username !== username) throw new Error("Unauthorized")

  return user
}
