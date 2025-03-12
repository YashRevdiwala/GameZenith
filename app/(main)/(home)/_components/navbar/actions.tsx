import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { Clapperboard } from "lucide-react"

import { Button } from "@/components/ui/button"

const Actions = async () => {
  const user = await currentUser()

  return (
    <div className="mr-3">
      <SignedOut>
        <div className="flex items-center">
          <SignInButton>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:bg-primary hover:text-[#252731]"
            >
              Login
            </Button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center space-x-5">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:bg-primary hover:text-[#252731]"
            asChild
          >
            <Link href={`/u/${user?.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>

          <UserButton />
        </div>
      </SignedIn>
    </div>
  )
}
export default Actions
