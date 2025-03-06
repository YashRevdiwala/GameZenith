import Image from "next/image"
import { PlayCircle } from "lucide-react"

interface VideoCardProps {
  /**
   * @type object
   * @description The details of the video
   * @property {string} title - The title of the video
   * @property {string} description - The description of the video
   * @property {boolean} live - Whether the video is live or not
   *
   */
  videoDetails: {
    title: string
    creator: string
    live: boolean
  }
}

const VideoCard = ({ videoDetails }: VideoCardProps) => {
  return (
    <div className="w-[350px] rounded-lg border border-gray-500 shadow-md">
      <div className="relative flex h-[200px] items-center justify-center rounded-t-lg bg-gray-200 hover:cursor-pointer">
        <Image
          src="/valo.jpg"
          alt="video-alt"
          width={1000}
          height={1000}
          className="h-full w-full rounded-t-lg"
        />

        <PlayCircle size={50} className="absolute text-white" />

        {videoDetails.live && (
          <p className="absolute bottom-2 left-2 rounded bg-rose-600 p-1 font-semibold text-white">
            LIVE
          </p>
        )}
      </div>
      <div className="flex w-full flex-col items-start justify-center rounded-b-lg bg-gray-500 p-5">
        <h1>
          {videoDetails.live && "🔴 Live: "}
          {videoDetails.title}
        </h1>
        <p className="text-xs">{videoDetails.creator}</p>
      </div>
    </div>
  )
}
export default VideoCard
