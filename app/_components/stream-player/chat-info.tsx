import { useMemo } from "react"
import { Info } from "lucide-react"

import { Hint } from "../hint"
import { cn } from "@/lib/utils"

interface ChatInfoProps {
  isDelayed: boolean
  isFollowersOnly: boolean
  isFollowing: boolean
}

export const ChatInfo = ({
  isDelayed,
  isFollowersOnly,
  isFollowing,
}: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers only chat"
    }

    if (!isFollowersOnly && isDelayed) {
      return "Message will be sent with a delay of 5 seconds"
    }

    if (isFollowersOnly && isDelayed) {
      return "Followers only chat. Message will be sent with a delay of 5 seconds"
    }

    return "Chat"
  }, [isDelayed, isFollowersOnly])

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers only"
    }

    if (!isFollowersOnly && isDelayed) {
      return "Slow mode"
    }

    if (isFollowersOnly && isDelayed) {
      return "Followers only and Slow mode"
    }

    if (!isFollowersOnly && !isDelayed) {
      return "Chat"
    }

    return ""
  }, [isDelayed, isFollowersOnly])

  return (
    <div
      className={cn(
        "text-muted-foreground flex w-full items-center gap-x-2 rounded-t-md border border-white/10 bg-white/5 p-2",
        !isFollowing && "rounded-b-md"
      )}
    >
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  )
}
