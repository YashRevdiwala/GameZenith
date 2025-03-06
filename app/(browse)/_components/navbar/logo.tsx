import Link from "next/link"

const Logo = () => {
  return (
    <div className="mr-4 p-1 transition hover:opacity-75 lg:mr-0">
      <Link className="cursor-pointer" href="/">
        <h1 className="text-xl font-bold">GameZenith</h1>
        <p className="text-muted-foreground text-xs">Let&apos;s play</p>
      </Link>
    </div>
  )
}
export default Logo
