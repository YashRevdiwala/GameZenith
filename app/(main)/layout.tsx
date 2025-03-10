import { SidebarProvider } from "@/components/ui/sidebar"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <div>{children}</div>
    </SidebarProvider>
  )
}
export default MainLayout
