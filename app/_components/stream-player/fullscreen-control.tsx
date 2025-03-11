"use client"

import { Maximize, Minimize } from "lucide-react"

interface FullScreenControlsProps {
  isFullScreen: boolean
  onToggle: () => void
}

export const FullScreenControls = ({
  isFullScreen,
  onToggle,
}: FullScreenControlsProps) => {
  const Icon = isFullScreen ? Minimize : Maximize

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onToggle}
        className="rounded-lg p-1.5 text-white hover:bg-white/10"
      >
        <Icon />
      </button>
    </div>
  )
}
