"use client"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react"

import { cn } from "@/lib/utils"
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

interface Routes {
  label: string
  href: string
  icon: React.ReactNode
}

const SidebarRoutes = () => {
  const { user } = useUser()
  const { open } = useSidebar()

  const routes: Routes[] = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: <Fullscreen />,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: <KeyRound />,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: <MessageSquare />,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: <Users />,
    },
  ]

  return (
    <TooltipProvider>
      <SidebarGroup>
        <SidebarGroupLabel className="text-muted-foreground font-bold">
          Dashboard Settings
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {routes.map((route, i: number) => (
              <SidebarMenuItem className={cn(!open && "w-full")} key={i}>
                <Tooltip delayDuration={200}>
                  <TooltipTrigger className="w-full">
                    <SidebarMenuButton asChild>
                      <Link
                        href={`${route.href}`}
                        className="flex items-center space-x-2"
                      >
                        {route.icon}
                        <span>{route.label}</span>
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
                    {route.label}
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
export default SidebarRoutes
