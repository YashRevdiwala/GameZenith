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
