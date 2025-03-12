import { Suspense } from "react"
import Navbar from "./_components/navbar"
import { AppSidebar, SidebarSkeleton } from "./_components/sidebar"
import { Container } from "./_components/container"

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <AppSidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  )
}
export default HomeLayout
