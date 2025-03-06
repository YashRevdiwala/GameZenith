import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "GameZenith",
  description: "Generated by create next app",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  )
}
