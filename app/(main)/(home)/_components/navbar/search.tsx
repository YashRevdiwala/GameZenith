"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { SearchIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Search = () => {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSubmit = () => {
    if (!search) return

    router.push(`/?q=${search}`)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
      className="relative flex w-full items-center lg:w-[400px]"
    >
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Search"
        className="focus-visible:ring-opacity-50 text-muted rounded-r-none border-0 bg-[#1e1e1e] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
      />

      {search && (
        <X
          className="absolute top-2.5 right-14 h-5 w-5 cursor-pointer text-rose-600 transition hover:opacity-75"
          onClick={() => setSearch("")}
        />
      )}

      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none border-0 bg-[#252931] transition hover:bg-transparent hover:opacity-75"
      >
        <SearchIcon className="text-muted h-5 w-5" />
      </Button>
    </form>
  )
}
export default Search
