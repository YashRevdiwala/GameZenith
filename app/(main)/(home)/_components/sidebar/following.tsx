"use client"
import Link from "next/link"
import Image from "next/image"
import { Follow, Users } from "@prisma/client"

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

interface FollowingProps {
  data: (Follow & {
    following: Users & {
      stream: {
        isLive: boolean
      } | null
    }
  })[]
}

const Following = ({ data }: FollowingProps) => {
  const { open } = useSidebar()

  if (!data.length) return

  return (
    <TooltipProvider>
      <SidebarGroup>
        <SidebarGroupLabel className="text-muted-foreground font-bold">
          Following
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {data.map((user, i: number) => (
              <SidebarMenuItem className={cn(!open && "my-1 w-full")} key={i}>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger className="w-full">
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/${user.following.username}`}
                        className="flex items-center space-x-2"
                      >
                        <Image
                          className={cn(
                            user.following.stream?.isLive &&
                              "ring-opacity-50 ring-2 ring-rose-500 ring-offset-2 ring-offset-[#25272f]",
                            "w-5 rounded-full"
                          )}
                          src={user.following.imageUrl}
                          alt={user.following.username}
                          width={1000}
                          height={1000}
                        />

                        <span>{user.following.username}</span>

                        {user.following.stream?.isLive && open && (
                          <Badge variant="destructive">LIVE</Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>

                  {!open && (
                    <TooltipContent
                      side="right"
                      className="text-muted hidden w-fit rounded-lg px-5 text-lg font-semibold shadow-lg md:block"
                    >
                      {user.following.username}
                    </TooltipContent>
                  )}
                </Tooltip>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </TooltipProvider>
  )
}
export default Following
