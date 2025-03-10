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
              className="text-muted hover:text-primary cursor-pointer"
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
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link className="cursor-pointer" href={`/u/${user?.username}`}>
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
