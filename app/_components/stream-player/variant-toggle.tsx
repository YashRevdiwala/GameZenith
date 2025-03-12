"use client"

import { MessageSquare, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar"
import { Hint } from "../hint"

export const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar((state) => state)

  const isChat = variant === ChatVariant.CHAT

  const Icon = isChat ? Users : MessageSquare
  const label = isChat ? "Community" : "Switch to chat"

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
    onChangeVariant(newVariant)
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
