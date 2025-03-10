"use client"

import { updateStream } from "@/actions/stream"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { useTransition } from "react"
import { toast } from "sonner"

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

interface ToggleCardProps {
  field: FieldTypes
  label: string
  value: boolean
}

export const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition()

  const onChange = async () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => {
          toast.success(`${label} has been ${!value ? "enabled" : "disabled"}`)
        })
        .catch(() => {
          toast.error("Failed to update settings")
        })
    })
  }

  return (
    <div className="w-full rounded-xl bg-[#252731] p-6">
      <div className="flex w-full items-center justify-between space-x-2">
        <p className="shrink-0 font-semibold">{label}</p>

        <div className="flex items-center">
          <Switch disabled={isPending} checked={value} onClick={onChange}>
            {value ? "Enabled" : "Disabled"}
          </Switch>
        </div>
      </div>
    </div>
  )
}

export const ToggleCardSkeleton = () => {
  return <Skeleton className="w-full rounded-xl p-10" />
}
