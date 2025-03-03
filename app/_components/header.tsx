import { Button } from "@/components/ui/button"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { auth, currentUser } from "@clerk/nextjs/server"
import Link from "next/link"

const Header = async () => {
  const { userId } = await auth()

  if (!userId) return

  const user = await currentUser()

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-neutral-700 p-4 text-white shadow-md">
      <Link className="hover:cursor-pointer" href="/">
        <h1 className="text-3xl font-bold">ZYVE</h1>
      </Link>
      <SignedIn>
        <div className="flex items-center space-x-5">
          <Link className="hover:cursor-pointer" href="/dashboard">
            <Button className="bg-blue-950">Dashboard</Button>
          </Link>
          <p className="font-semibold">
            {user?.firstName + " " + user?.lastName}
          </p>
          <UserButton />
        </div>
      </SignedIn>
    </header>
  )
}
export default Header
