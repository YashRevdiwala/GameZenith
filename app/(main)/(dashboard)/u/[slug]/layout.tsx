import { redirect } from "next/navigation"

import { getSelfByUsername } from "@/lib/auth-service"
import CreatorNavbar from "./_components/navbar"
import CreatorSidebar from "./_components/sidebar"

interface CreatorLayoutProps {
  params: {
    slug: string
  }
  children: React.ReactNode
}

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const { slug } = await params

  const self = await getSelfByUsername(slug)

  if (!self) redirect("/")

  return (
    <>
      <CreatorNavbar />
      <div className="flex h-full w-screen pt-20">
        <CreatorSidebar />
        <div className="w-full flex-1">{children}</div>
      </div>
    </>
  )
}
export default CreatorLayout
