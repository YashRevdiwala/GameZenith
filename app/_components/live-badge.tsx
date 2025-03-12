import React from "react"

import { cn } from "@/lib/utils"

export function LiveBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-background rounded-md border bg-rose-500 p-0.5 px-1.5 text-center text-[10px] font-semibold tracking-wide uppercase",
        className
      )}
    >
      Live
    </div>
  )
}
