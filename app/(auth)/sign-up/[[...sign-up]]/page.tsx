import { SignUp } from "@clerk/nextjs"

import { SkeletonCard } from "@/app/_components/skeleton"

export default function Page() {
  return <SignUp fallback={<SkeletonCard height={480} width={400} />} />
}
