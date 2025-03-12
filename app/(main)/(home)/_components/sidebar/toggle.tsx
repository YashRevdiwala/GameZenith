"use client"

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

import { Hint } from "@/app/_components/hint"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useSidebar } from "@/store/use-sidebar"

export function Toggle() {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state)

  const label = collapsed ? "Expand" : "Collapse"

  return (
    <>
      {collapsed && (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint label={label} side="right" asChild>
            <Button variant="ghost" onClick={onExpand} className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="mb-2 flex w-full items-center p-3 pl-6">
          <p className="text-primary font-semibold">For you</p>
          <Hint label={label} side="right" asChild>
            <Button
              className="ml-auto h-auto p-2"
              variant="ghost"
              onClick={onCollapse}
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

export function ToggleSkeleton() {
  return (
    <div className="mb-2 hidden w-full items-center justify-between p-3 pl-6 lg:flex">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  )
}
