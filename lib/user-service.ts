import { db } from "./db"

export const getUserByUsername = async (username: string) => {
  return await db.users.findUnique({
    where: {
      username,
    },
    include: {
      stream: true,
    },
  })
}

export const getUserById = async (id: string) => {
  return await db.users.findUnique({
    where: {
      id,
    },
    include: {
      stream: true,
    },
  })
}
