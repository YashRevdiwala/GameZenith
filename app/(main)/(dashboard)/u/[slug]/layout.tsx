import { redirect } from "next/navigation"

import { getSelfByUsername } from "@/lib/auth-service"
import CreatorNavbar from "./_components/navbar"
import { CreatorSidebar } from "./_components/sidebar"
import { Container } from "./_components/container"

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
      <div className="flex h-full pt-20">
        <CreatorSidebar />
        <Container>{children}</Container>
      </div>
    </>
  )
}

export default CreatorLayout
