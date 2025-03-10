"use client"

import { useState } from "react"
import { toast } from "sonner"
import { CheckCheck, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  value?: string
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState<boolean>()

  const copyToClipboard = () => {
    if (!value) return

    setIsCopied(true)
    navigator.clipboard.writeText(value)
    toast.success("Copied to clipboard")
    setTimeout(() => setIsCopied(false), 2000)
  }

  const Icon = isCopied ? CheckCheck : Copy

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        disabled={!value || isCopied}
        onClick={copyToClipboard}
      >
        <Icon />
      </Button>
    </div>
  )
}
