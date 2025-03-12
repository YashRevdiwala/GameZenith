"use client"
import { Follow, Users } from "@prisma/client"

import { UserItem, UserItemSkeleton } from "./user-item"
import { useSidebar } from "@/store/use-sidebar"

interface FollowingProps {
  data: (Follow & {
    following: Users & {
      stream: {
        isLive: boolean
      } | null
    }
  })[]
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state)

  if (!data.length) return null

  return (
    <div>
      {!collapsed && (
        <div className="mb-4 pl-6">
          <p className="text-muted-foreground text-sm">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  )
}

export function FollowingSkeleton() {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}
