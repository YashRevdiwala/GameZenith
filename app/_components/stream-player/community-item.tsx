"use client"

import { toast } from "sonner"
import { useTransition } from "react"
import { MinusCircle } from "lucide-react"

import { Hint } from "../hint"
import { onBlock } from "@/actions/block"
import { cn, stringToColor } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CommunityItemProps {
  hostName: string
  viewerName: string
  participantName?: string
  participantIdentity: string
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const [isPending, startTransition] = useTransition()

  const color = stringToColor(participantName || "")
  const isSelf = participantName === viewerName
  const isHost = viewerName === hostName

  const handleBlock = () => {
    if (!participantName || !isHost || isSelf) return

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => toast.success(`Blocked ${participantName}`))
        .catch(() => toast.error(`Failed to block ${participantName}`))
    })
  }

  return (
    <div
      className={cn(
        "group flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-white/5",
        isPending && "pointer-events-none opacity-50"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block User">
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 transition group-hover:opacity-100"
            asChild
          >
            <MinusCircle className="text-muted-foreground h-4 w-4" />
          </Button>
        </Hint>
      )}
    </div>
  )
}
