import { getFollowedUsers } from "@/lib/follow-service"
import { getRecommended } from "@/lib/recommended-service"
import { Following, FollowingSkeleton } from "./following"
import { Recommended, RecommendedSkeleton } from "./recommended"
import { Wrapper } from "./wrapper"
import { Toggle, ToggleSkeleton } from "./toggle"

export const AppSidebar = async () => {
  const recommended = await getRecommended()
  const following = await getFollowedUsers()

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended users={recommended} />
      </div>
    </Wrapper>
  )
}

export function SidebarSkeleton() {
  return (
    <aside className="bg-background border-[#2D2E35 z-50] fixed left-0 flex h-full w-[70px] flex-col border-r lg:w-60">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  )
}
