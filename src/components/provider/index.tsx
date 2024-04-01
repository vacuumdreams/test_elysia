"use client"

import { ReactNode } from "react"
import { QueryProvider } from "./query"
import { ThemeProvider } from "./theme"

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  )
}
