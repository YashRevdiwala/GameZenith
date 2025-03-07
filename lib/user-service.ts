import { db } from "./db"

export const getUserByUsername = async (username: string) => {
  return await db.users.findUnique({
    where: {
      username,
    },
  })
}
