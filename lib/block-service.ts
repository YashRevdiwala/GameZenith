import { getSelf } from "./auth-service"
import { db } from "./db"

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf()

    if (self.id === id) return false

    const otherUser = await db.users.findUnique({
      where: { id },
    })

    if (!otherUser) throw new Error("User not found")

    const blocked = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    })

    return !!blocked
  } catch {
    return false
  }
}

export const blockUser = async (id: string) => {
  const self = await getSelf()

  if (self.id === id) throw new Error("You cannot block yourself")

  const otherUser = await db.users.findUnique({
    where: { id },
  })

  if (!otherUser) throw new Error("User not found")

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  })

  if (existingBlock) throw new Error("User is already blocked")

  return await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  })
}

export const unblockUser = async (id: string) => {
  const self = await getSelf()

  if (self.id === id) throw new Error("You cannot unblock yourself")

  const otherUser = await db.users.findUnique({
    where: { id },
  })

  if (!otherUser) throw new Error("User not found")

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    },
  })

  if (!existingBlock) throw new Error("User is already unblocked")

  return await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  })
}
