"use client"
import Link from "next/link"
import Image from "next/image"
import { Users } from "@prisma/client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface RecommendedUsersProps {
  users: Users[]
}

const RecommendedUsers = ({ users }: RecommendedUsersProps) => {
  const isLive = true
  const { open } = useSidebar()

  if (!users.length) return

  return (
    <TooltipProvider>
      <SidebarGroup>
        <SidebarGroupLabel className="text-muted-foreground font-bold">
          Recommended For You
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {users.map((user, i: number) => (
              <SidebarMenuItem className={cn(!open && "w-full")} key={i}>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger className="w-full">
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/${user.username}`}
                        className="flex items-center space-x-2"
                      >
                        <Image
                          className={cn(
                            isLive &&
                              "ring-opacity-50 ring-2 ring-rose-500 ring-offset-2 ring-offset-[#25272f]",
                            "w-5 rounded-full"
                          )}
                          src={user.imageUrl}
                          alt={user.username}
                          width={1000}
                          height={1000}
                        />

                        <span>{user.username}</span>

                        {isLive && (
                          <Badge
                            className={cn(
                              open
                                ? ""
                                : "absolute right-0 -translate-x-1/2 transform md:right-full md:-bottom-3 md:left-1/2"
                            )}
                            variant="destructive"
                          >
                            LIVE
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className={cn(
                      "hidden md:block",
                      open
                        ? "hidden"
                        : "text-muted w-fit rounded-lg px-5 text-lg font-semibold shadow-lg"
                    )}
                  >
                    {user.username}
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </TooltipProvider>
  )
}
export default RecommendedUsers
