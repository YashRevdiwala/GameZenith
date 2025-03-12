"use client"

import { Users } from "@prisma/client"

import { useSidebar } from "@/store/use-sidebar"
import { UserItem, UserItemSkeleton } from "./user-item"

interface RecommendedUsersProps {
  users: (Users & {
    stream: {
      isLive: boolean
    } | null
  })[]
}

export const Recommended = ({ users }: RecommendedUsersProps) => {
  const { collapsed } = useSidebar((state) => state)

  const showLabel = !collapsed && users.length > 0

  return (
    <div>
      {showLabel && (
        <div className="mb-4 pl-6">
          <p className="text-muted-foreground text-xs">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {users.map((user) => (
          <UserItem
            key={user.id}
            imageUrl={user.imageUrl}
            username={user.username}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  )
}

export function RecommendedSkeleton() {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}
