import { getSelf } from "@/lib/auth-service"
import { getStreamByUserId } from "@/lib/stream-service"
import { ToggleCard } from "./_components/toggle-card"

const ChatPage = async () => {
  const self = await getSelf()
  const stream = await getStreamByUserId(self.id)

  if (!stream) throw new Error("Stream not found")

  return (
    <div className="w-full p-6">
      <div className="mx-auto w-full max-w-6xl">
        {" "}
        {/* Ensure max width but allow stretching */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Chat Settings</h1>
        </div>
        <div className="w-full space-y-4">
          <ToggleCard
            field="isChatEnabled"
            label="Chat"
            value={stream.isChatEnabled}
          />
          {stream.isChatEnabled && (
            <div
              className={`chat-settings-container ${stream.isChatEnabled ? "show" : "hide"} w-full space-y-4`}
            >
              <ToggleCard
                field="isChatDelayed"
                label="Delayed Chat"
                value={stream.isChatDelayed}
              />
              <ToggleCard
                field="isChatFollowersOnly"
                label="Followers only Chat"
                value={stream.isChatFollowersOnly}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ChatPage
