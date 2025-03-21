"use client"

import { useMemo, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { LocalParticipant, RemoteParticipant } from "livekit-client"
import { useParticipants } from "@livekit/components-react"

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CommunityItem } from "./community-item"

interface ChatCommunityProps {
  hostName: string
  viewerName: string
  isHidden: boolean
}

export const ChatCommunity = ({
  hostName,
  viewerName,
  isHidden,
}: ChatCommunityProps) => {
  const [value, setValue] = useState("")
  const [debouncedValue] = useDebounceValue<string>(value, 500)

  const participants = useParticipants()

  const onChange = (newValue: string) => {
    setValue(newValue)
  }

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostViewer = `host-${participant.identity}`

        if (!acc.some((p) => p.identity === hostViewer)) {
          acc.push(participant)
        }

        return acc
      },
      [] as (RemoteParticipant | LocalParticipant)[]
    )

    return deduped.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase())
    })
  }, [participants, debouncedValue])

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground text-sm">Community is disabled</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Community"
        className="border-white/10"
      />

      <ScrollArea className="mt-4 gap-y-2">
        <p className="text-muted-foreground hidden p-2 text-center text-sm last:block">
          No resullts found
        </p>

        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  )
}
