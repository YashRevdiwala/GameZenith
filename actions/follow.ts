"use server"

import { revalidatePath } from "next/cache"

import { followUser, unFollowUser } from "@/lib/follow-service"

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id)

    revalidatePath("/")

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`)
    }

    return followedUser
  } catch {
    throw new Error("Internal server error")
  }
}

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unFollowUser(id)

    revalidatePath("/")

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`)
    }

    return unfollowedUser
  } catch {
    throw new Error("Internal server error")
  }
}
