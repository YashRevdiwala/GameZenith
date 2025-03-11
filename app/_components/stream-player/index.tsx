"use client"

import { Stream, Users } from "@prisma/client"
import { LiveKitRoom } from "@livekit/components-react"

import { useViewerToken } from "@/hooks/use-viewer-token"
import { Video } from "./video"

interface StreamPlayerProps {
  user: Users & { stream: Stream | null }
  stream: Stream
  isFollowing: boolean
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id)

  if (!token || !name || !identity) {
    return
  }

  return (
    <>
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className="relative h-[calc(100vh-4rem)] w-full overflow-hidden"
      >
        <div className="flex h-full w-full flex-col">
          <Video hostName={user.username} hostIdentity={user.id} />
        </div>
      </LiveKitRoom>
    </>
  )
}
