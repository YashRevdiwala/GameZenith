"use client"

import { Maximize, Minimize } from "lucide-react"
import { Hint } from "../hint"

interface FullScreenControlsProps {
  isFullScreen: boolean
  onToggle: () => void
}

export const FullScreenControls = ({
  isFullScreen,
  onToggle,
}: FullScreenControlsProps) => {
  const Icon = isFullScreen ? Minimize : Maximize

  const label = isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-white hover:bg-white/10"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  )
}
