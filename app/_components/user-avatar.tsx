import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { LiveBadge } from "./live-badge"

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  imageUrl: string
  username: string
  isLive?: boolean
  showBadge?: boolean
}

type UserAvatarSkeletonProps = VariantProps<typeof avatarSizes>

export function UserAvatar({
  imageUrl,
  username,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) {
  const canShowBadge = showBadge && isLive

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "border-background border ring-2 ring-rose-500",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

export function UserAvatarSkeleton({ size }: UserAvatarSkeletonProps) {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />
}
