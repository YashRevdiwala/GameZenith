"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useSidebar } from "@/store/use-sidebar"
import { LiveBadge } from "@/app/_components/live-badge"
import { UserAvatar } from "@/app/_components/user-avatar"

export function UserItem({
  username,
  imageUrl,
  isLive,
}: {
  username: string
  imageUrl: string
  isLive?: boolean
}) {
  const pathname = usePathname()

  const { collapsed } = useSidebar((state) => state)

  const href = `/${username}`
  const isActive = pathname === href

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "h-12 w-full",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex w-full items-center gap-x-4",
            collapsed && "justify-center"
          )}
        >
          <UserAvatar imageUrl={imageUrl} username={username} isLive={isLive} />
          {!collapsed && <p className="truncate">{username}</p>}
          {!collapsed && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  )
}

export function UserItemSkeleton() {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  )
}
