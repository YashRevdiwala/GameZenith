import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar from "./_components/navbar"
import AppSidebar from "./_components/sidebar"

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <Navbar />
        <div className="flex h-full pt-20">
          <AppSidebar />
          {children}
        </div>
      </SidebarProvider>
    </>
  )
}
export default BrowseLayout
