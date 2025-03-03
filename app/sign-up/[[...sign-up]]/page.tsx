import { SignUp } from "@clerk/nextjs"

import { SkeletonCard } from "@/app/_components/skeleton"

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp fallback={<SkeletonCard height={480} width={400} />} />
    </div>
  )
}
