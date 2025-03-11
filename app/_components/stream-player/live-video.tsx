"use client"

import { useRef, useState } from "react"
import { Participant, Track } from "livekit-client"
import { useTracks } from "@livekit/components-react"

import { FullScreenControls } from "./fullscreen-control"
import { VolumeControl } from "./volume-control"

interface VideoProps {
  participant: Participant
}

export const LiveVideo = ({ participant }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [isFullscreen, setIsFullscreen] = useState(false)

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current)
      }
    })

  const toggleFullScreen = () => {
    if (isFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    } else if (wrapperRef.current) {
      wrapperRef.current.requestFullscreen()
      setIsFullscreen(true)
    }
  }

  return (
    <div
      ref={wrapperRef}
      onChange={(e) => console.log(e.type)}
      className="relative h-full w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute top-0 h-full w-full opacity-0 duration-300 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl onChange={() => {}} onToggle={() => {}} value={0} />
          <FullScreenControls
            isFullScreen={isFullscreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  )
}
