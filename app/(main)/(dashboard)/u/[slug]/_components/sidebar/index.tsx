import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import SidebarRoutes from "./sidebar-routes"

const CreatorSidebar = () => {
  return (
    <Sidebar collapsible="icon" className="border-r border-[#252730]">
      <SidebarContent className="text-muted bg-[#252730] font-semibold md:py-20">
        <SidebarGroup>
          <SidebarMenuItem className="flex items-end justify-end">
            <SidebarMenuButton className="w-fit" asChild>
              <SidebarTrigger className="hidden cursor-pointer md:block" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>

        <SidebarRoutes />
      </SidebarContent>
    </Sidebar>
  )
}
export default CreatorSidebar
