"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { Heart } from "lucide-react"

import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"

interface ActionsProps {
  isFollowing: boolean
  userId: string
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition()

  const onClick = async () => {
    if (isFollowing) {
      startTransition(() => {
        onUnfollow(userId)
          .then((data) =>
            toast.success(`You unfollowed ${data.following.username}`)
          )
          .catch(() => toast.error("Failed to unfollow user"))
      })
    } else {
      startTransition(() => {
        onFollow(userId)
          .then((data) =>
            toast.success(`You are now following ${data.following.username}`)
          )
          .catch(() => toast.error("Failed to follow user"))
      })
    }
  }

  return (
    <Button
      disabled={isPending}
      variant="ghost"
      className="bg-muted-foreground hover:bg-muted cursor-pointer"
      onClick={onClick}
    >
      {isFollowing ? (
        <span className="flex items-center space-x-1">
          <Heart className="fill-muted" size={20} />
          <p>Following</p>
        </span>
      ) : (
        <span className="flex items-center space-x-1">
          <Heart size={20} />
          <p>Follow</p>
        </span>
      )}
    </Button>
  )
}
