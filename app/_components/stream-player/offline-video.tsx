import { WifiOff } from "lucide-react"

interface OfflineVideoProps {
  username: string
}

export const OfflineVideo = ({ username }: OfflineVideoProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      <WifiOff size={48} className="text-muted-foreground" />
      <p className="text-muted-foreground text-center text-sm">
        {username} is offline. Check back later.
      </p>
    </div>
  )
}
