import VideoCard from "./_components/video-card"

export default async function Home() {
  const videos = [
    {
      title: "How to use Tailwind CSS",
      creator: "freeCodeCamp",
      live: true,
    },
    {
      title: "How to use Tailwind CSS",
      creator: "freeCodeCamp",
      live: false,
    },
    {
      title: "How to use Tailwind CSS",
      creator: "freeCodeCamp",
      live: false,
    },
    {
      title: "How to use Tailwind CSS",
      creator: "freeCodeCamp",
      live: true,
    },
    {
      title: "How to use Tailwind CSS",
      creator: "freeCodeCamp",
      live: false,
    },
  ]

  return (
    <div className="flex flex-wrap p-5">
      {videos
        .sort((a, b) => Number(b.live) - Number(a.live))
        .map((video, i) => (
          <div key={i} className="p-3">
            <VideoCard videoDetails={video} />
          </div>
        ))}
    </div>
  )
}
