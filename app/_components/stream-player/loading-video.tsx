import { Loader } from "lucide-react"

interface LoadingVideoProps {
  label: string
}

export const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      <Loader size={48} className="text-muted-foreground animate-spin" />
      <p className="text-muted-foreground text-center text-sm capitalize">
        {label}
      </p>
    </div>
  )
}
