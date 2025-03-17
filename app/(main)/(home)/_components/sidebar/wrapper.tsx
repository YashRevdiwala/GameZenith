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
      <aside className="fixed left-0 z-50 flex h-full w-60 flex-col border-r border-[#2D2E35] bg-[#252731]">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )

  return (
    <aside
      className={cn(
        "fixed left-0 z-50 flex h-full w-60 flex-col border-r border-[#2D2E35] bg-[#252731]",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  )
}
