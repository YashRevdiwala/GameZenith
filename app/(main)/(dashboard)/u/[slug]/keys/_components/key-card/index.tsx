"use client"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"
import { CopyButton } from "../copy-button"
import { Button } from "@/components/ui/button"

interface KeyCardProps {
  value?: string | null
}

export const KeyCard = ({ value }: KeyCardProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const Icon = passwordVisible ? Eye : EyeOff

  return (
    <div className="rounded-xl bg-[#252731] p-6">
      <div className="flex items-center gap-x-10">
        <p className="shrink-0 font-semibold">Stream Key</p>
        <div className="w-full space-y-2">
          <div className="flex w-full items-center gap-x-2">
            <Input
              value={value || ""}
              type={passwordVisible ? "text" : "password"}
              disabled
              placeholder="Server Url"
              className="bg-[#fff] text-[#252731]"
            />
            <CopyButton value={value || ""} />
            <Button
              variant="ghost"
              disabled={!value}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <Icon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
