"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChatInfo } from "./chat-info"

interface ChatFormProps {
  value: string
  isHidden: boolean
  isFollowing: boolean
  isDelayed: boolean
  isFollowersOnly: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export const ChatForm = ({
  isDelayed,
  isFollowersOnly,
  isFollowing,
  isHidden,
  onChange,
  onSubmit,
  value,
}: ChatFormProps) => {
  const [isDelayedBlocked, setIsDelayedBlocked] = useState(false)

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing
  const isDisabled =
    isHidden || isFollowersOnlyAndNotFollowing || isDelayedBlocked

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!value || isDisabled) return

    if (isDelayed && !isDelayedBlocked) {
      setIsDelayedBlocked(true)

      setTimeout(() => {
        setIsDelayedBlocked(false)
        onSubmit()
      }, 5000)

      return
    } else {
      onSubmit()
    }
  }

  if (isHidden) return null

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <ChatInfo
          isDelayed={isDelayed}
          isFollowersOnly={isFollowersOnly}
          isFollowing={isFollowing}
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "rounded-t-none border-t-0 border-white/10",
            !isFollowing && "hidden"
          )}
        />
      </div>

      <div className="ml-auto">
        <Button
          type="submit"
          variant="ghost"
          className={cn(
            "text-muted-foreground hover:bg-primary hover:text-[#252731]",
            !isFollowing && "hidden"
          )}
          size="sm"
          disabled={isDisabled}
        >
          Chat
        </Button>
      </div>
    </form>
  )
}

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="h-10 w-full" />

      <div className="ml-auto flex items-center gap-x-2">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  )
}
