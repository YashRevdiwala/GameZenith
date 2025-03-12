"use client"

import React from "react"
import { useIsClient } from "usehooks-ts"

import { useSidebar } from "@/store/use-sidebar"
import { cn } from "@/lib/utils"

import { ToggleSkeleton } from "./toggle"
import { RecommendedSkeleton } from "./recommended"
import { FollowingSkeleton } from "./following"

export function Wrapper({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar((state) => state)
  const isClient = useIsClient()

  if (!isClient)
    return (
      <aside className="bg-background fixed left-0 z-50 flex h-full w-60 flex-col border-r border-[#2D2E35]">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )

  return (
    <aside
      className={cn(
        "bg-background fixed left-0 z-50 flex h-full w-60 flex-col border-r border-[#2D2E35]",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  )
}
