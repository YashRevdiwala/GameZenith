import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { LogOutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

const Actions = async () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground"
        asChild
      >
        <Link href="/">
          <LogOutIcon className="mr-2 h-5 w-5" />
          Exit
        </Link>
      </Button>
      <UserButton />
    </div>
  )
}
export default Actions
