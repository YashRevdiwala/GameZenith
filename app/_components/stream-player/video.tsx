"use client"

import { ConnectionState, Track } from "livekit-client"
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from "@livekit/components-react"

import { Skeleton } from "@/components/ui/skeleton"
import { LiveVideo } from "./live-video"
import { LoadingVideo } from "./loading-video"
import { OfflineVideo } from "./offline-video"

interface VideoProps {
  hostName: string
  hostIdentity: string
}

export const Video = ({ hostName, hostIdentity }: VideoProps) => {
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity)

  let content

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectionState} />
  } else {
    content = <LiveVideo participant={participant} />
  }

  return <div className="group relative aspect-video border-b">{content}</div>
}

export function VideoSkeleton() {
  return (
    <div className="border-background aspect-video border-x">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  )
}
