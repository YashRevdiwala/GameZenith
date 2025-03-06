import { SignIn } from "@clerk/nextjs"

import { SkeletonCard } from "@/app/_components/skeleton"

export default function Page() {
  return <SignIn fallback={<SkeletonCard height={470} width={400} />} />
}
