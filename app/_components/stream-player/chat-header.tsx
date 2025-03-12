"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { ChatToggle } from "./chat-toggle"
import { VariantToggle } from "./variant-toggle"

export const ChatHeader = () => {
  return (
    <div className="relative border-b p-3">
      <div className="absolute top-2 left-2 hidden lg:block">
        <ChatToggle />
      </div>
      <p className="text-primary text-center font-semibold">Stream Chat</p>
      <div className="absolute top-2 right-2">
        <VariantToggle />
      </div>
    </div>
  )
}

export const ChatHeaderSkeleton = () => {
  return (
    <div className="relative border-b p-3">
      <Skeleton className="absolute top-3 left-3 h-6 w-6" />
      <Skeleton className="mx-auto h-6 w-28" />
    </div>
  )
}
