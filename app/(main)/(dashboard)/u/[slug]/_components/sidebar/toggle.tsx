"use client"

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

import { useCreatorSidebar } from "@/store/use-creator-sidebar"
import { Button } from "@/components/ui/button"
import { Hint } from "@/app/_components/hint"

export function Toggle() {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar(
    (state) => state
  )

  const label = collapsed ? "Expand" : "Collapse"

  return (
    <>
      {collapsed && (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint label={label} side="right" asChild>
            <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="mb-2 hidden w-full items-center p-3 pl-6 lg:flex">
          <p className="text-primary font-semibold">Dashboard</p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              variant="ghost"
              className="ml-auto h-auto p-2"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}
