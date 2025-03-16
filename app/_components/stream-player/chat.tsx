import { useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { ConnectionState } from "livekit-client"
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react"

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar"
import { ChatHeader } from "./chat-header"
import { ChatForm } from "./chat-form"
import { ChatList } from "./chat-list"
import { ChatCommunity } from "./chat-community"

interface ChatProps {
  hostName: string
  hostIdentity: string
  viewerName: string
  isFollowing: boolean
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
}

export const Chat = ({
  hostName,
  hostIdentity,
  viewerName,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const matches = useMediaQuery("(max-width: 1024px)")
  const { variant, onExpand } = useChatSidebar()
  const connectionState = useConnectionState()
  const participant = useRemoteParticipant(hostIdentity)

  const isOnline = participant && connectionState === ConnectionState.Connected
  const isHidden = !isChatEnabled || !isOnline

  const [value, setValue] = useState("")
  const { chatMessages: messages, send } = useChat()

  useEffect(() => {
    if (matches) {
      onExpand()
    }
  }, [matches, onExpand])

  const reverseMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp)
  }, [messages])

  const onSubmit = () => {
    if (!send) return

    send(value)
    setValue("")
  }

  const onChange = (value: string) => {
    setValue(value)
  }

  return (
    <div className="bg-background flex h-[calc(100vh-80px)] flex-col border-b border-l pt-0">
      <ChatHeader />

      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reverseMessages} isHidden={isHidden} />

          <ChatForm
            value={value}
            isHidden={isHidden}
            isFollowing={isFollowing}
            isDelayed={isChatDelayed}
            isFollowersOnly={isChatFollowersOnly}
            onSubmit={onSubmit}
            onChange={onChange}
          />
        </>
      )}

      {variant === ChatVariant.COMMUNITY && (
        <ChatCommunity
          viewerName={viewerName}
          hostName={hostName}
          isHidden={isHidden}
        />
      )}
    </div>
  )
}
