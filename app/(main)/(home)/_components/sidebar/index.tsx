import React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { getFollowedUsers } from "@/lib/follow-service"
import { getRecommended } from "@/lib/recommended-service"
import Following from "./following"
import RecommendedUsers from "./recommended-users"
import { UsersSkeleton } from "./users-skeleton"

const AppSidebar = async () => {
  const recommended = await getRecommended()
  const follows = await getFollowedUsers()

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

        <React.Suspense fallback={<UsersSkeleton />}>
          <Following data={follows} />
          <RecommendedUsers users={recommended} />
        </React.Suspense>
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar
