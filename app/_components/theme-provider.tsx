"use client"

import {
  ThemeProvider as NextThemeProvider,
  ThemeProviderProps,
} from "next-themes"
import { useEffect, useState } from "react"

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}
