import { db } from "./db"

export const getRecommended = async () => {
  const users = await db.users.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return users
}
