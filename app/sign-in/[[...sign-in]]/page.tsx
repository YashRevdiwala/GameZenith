import { SignIn } from "@clerk/nextjs"

import { SkeletonCard } from "@/app/_components/skeleton"

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn fallback={<SkeletonCard height={470} width={400} />} />
    </div>
  )
}
