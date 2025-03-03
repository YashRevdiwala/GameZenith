import { Skeleton } from "@/components/ui/skeleton"

interface SkeletonCardProps {
  /**
   * @type string | number
   * @description The height of the card
   * @default 470
   */
  height?: number

  /**
   * @type string | number
   * @description The width of the card
   * @default 400
   */
  width?: number
}

export function SkeletonCard({ height = 470, width = 400 }: SkeletonCardProps) {
  return (
    <div
      style={{
        height,
        width,
      }}
      className="flex flex-col space-y-3"
    >
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  )
}
