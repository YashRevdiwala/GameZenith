"use client"
import { ComponentRef, useRef, useState, useTransition } from "react"
import { IngressInput } from "livekit-server-sdk"
import { toast } from "sonner"
import { AlertTriangle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createIngress } from "@/actions/ingress"

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

export const ConnectModal = () => {
  const closeRef = useRef<ComponentRef<"button">>(null)

  const [ingressType, setIngressType] = useState<IngressType>(RTMP)
  const [isPending, startTransition] = useTransition()

  const onSubmit = async () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Keys have been generated")
          closeRef.current?.click()
        })
        .catch((err) => {
          console.log(err)

          toast.error("Failed to generate keys")
          closeRef.current?.click()
        })
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:bg-primary hover:text-[#252731]"
        >
          Generate new Keys
        </Button>
      </DialogTrigger>

      <DialogContent className="border-0 bg-[#252731]">
        <DialogHeader>
          <DialogTitle>Generate new Keys</DialogTitle>
        </DialogHeader>

        <Alert className="border-0 bg-[#3b3e4c]">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            Generating new keys will invalidate the existing keys. Are you sure
            you want to continue?
          </AlertDescription>
        </Alert>

        <Select
          value={ingressType}
          disabled={isPending}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="border-muted-foreground w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>

          <SelectContent className="border-muted-foreground cursor-pointer bg-[#252731] text-gray-500">
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>

        <div className="mt-4 flex justify-end space-x-2">
          <DialogClose ref={closeRef} asChild>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:bg-primary hover:text-[#252731]"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant="ghost"
            className="text-muted-foreground hover:bg-primary hover:text-[#252731]"
            onClick={onSubmit}
            disabled={isPending}
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
