import Link from "next/link"
import { Home } from "lucide-react"

import { getRecommended } from "@/lib/recommended-service"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import RecommendedUsers from "./recommended_users"

const AppSidebar = async () => {
  const users = await getRecommended()

  return (
    <Sidebar collapsible="icon" className="border-r border-[#252730]">
      <SidebarContent className="text-muted bg-[#252730] py-20 font-semibold">
        <SidebarGroup>
          <SidebarMenuItem className="flex items-end justify-end">
            <SidebarMenuButton className="w-fit" asChild>
              <SidebarTrigger className="cursor-pointer" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-bold">
            Recommended
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {users.map((user, i: number) => (
                <RecommendedUsers
                  key={i}
                  username={user.username}
                  imageUrl={user.imageUrl}
                  isLive={true}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar
