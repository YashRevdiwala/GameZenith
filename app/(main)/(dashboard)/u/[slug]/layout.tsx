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
  const { slug } = params

  const self = await getSelfByUsername(slug)
  if (!self) redirect("/")

  return (
    <>
      <CreatorNavbar />
      <div className="flex h-screen w-screen overflow-hidden pt-20">
        <CreatorSidebar />

        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </>
  )
}

export default CreatorLayout
