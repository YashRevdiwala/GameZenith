"use client"

import { format } from "date-fns"
import { ReceivedChatMessage } from "@livekit/components-react"

import { stringToColor } from "@/lib/utils"

interface ChatMessageProps {
  data: ReceivedChatMessage
}

export const ChatMessage = ({ data }: ChatMessageProps) => {
  const color = stringToColor(data.from?.name || "")
  return (
    <div className="flex gap-2 rounded-md p-2 hover:bg-white/5">
      <p className="text-sm text-white/40">{format(data.timestamp, "HH:mm")}</p>
      <div className="flex grow flex-wrap items-baseline gap-1">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color: color }}>
            {data.from?.name}
          </span>
          :
        </p>

        <p className="text-sm break-all">{data.message}</p>
      </div>
    </div>
  )
}
