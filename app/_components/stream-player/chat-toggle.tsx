"use client"

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

import { Hint } from "../hint"
import { Button } from "@/components/ui/button"
import { useChatSidebar } from "@/store/use-chat-sidebar"

export const ChatToggle = () => {
  const { collapsed, onCollapse, onExpand } = useChatSidebar((state) => state)

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine
  const label = collapsed ? "Expand chat" : "Collapse chat"

  const onToggle = () => {
    if (collapsed) {
      onExpand()
    } else {
      onCollapse()
    }
  }

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="hover:text-primary h-auto bg-transparent p-2 hover:bg-white/10"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  )
}
