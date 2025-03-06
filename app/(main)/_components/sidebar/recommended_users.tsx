"use client"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface RecommendedUsersProps {
  username: string
  imageUrl: string
  isLive?: boolean
  showBadge?: boolean
}

const RecommendedUsers = ({
  username,
  imageUrl,
  isLive,
}: RecommendedUsersProps) => {
  const { open } = useSidebar()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={`/${username}`} className="flex items-center space-x-2">
          <Image
            className={cn(
              isLive &&
                "ring-opacity-50 ring-2 ring-rose-500 ring-offset-2 ring-offset-[#25272f]",
              "w-5 rounded-full"
            )}
            src={imageUrl}
            alt={username}
            width={1000}
            height={1000}
          />

          <span>{username}</span>

          {isLive && (
            <Badge
              className={cn(
                open
                  ? ""
                  : "absolute -bottom-3 left-1/2 -translate-x-1/2 transform"
              )}
              variant="destructive"
            >
              LIVE
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
export default RecommendedUsers
