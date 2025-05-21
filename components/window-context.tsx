"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface Window {
  id: string
  title: string
  content: ReactNode
}

interface WindowContextType {
  openWindows: Window[]
  focusedWindowId: string | null
  openWindow: (id: string, title: string, content: ReactNode) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
}

const WindowContext = createContext<WindowContextType | undefined>(undefined)

export function WindowProvider({ children }: { children: ReactNode }) {
  const [openWindows, setOpenWindows] = useState<Window[]>([])
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null)

  const openWindow = useCallback(
    (id: string, title: string, content: ReactNode) => {
      // Check if window is already open
      const existingWindow = openWindows.find((w) => w.id === id)

      if (existingWindow) {
        // Just focus the existing window
        setFocusedWindowId(id)
      } else {
        // Add new window
        setOpenWindows((prev) => [...prev, { id, title, content }])
        setFocusedWindowId(id)
      }
    },
    [openWindows],
  )

  const closeWindow = useCallback(
    (id: string) => {
      setOpenWindows((prev) => prev.filter((window) => window.id !== id))

      // If we're closing the focused window, focus the last window in the stack
      if (focusedWindowId === id) {
        setFocusedWindowId(() => {
          const remainingWindows = openWindows.filter((window) => window.id !== id)
          return remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null
        })
      }
    },
    [openWindows, focusedWindowId],
  )

  const focusWindow = useCallback((id: string) => {
    setFocusedWindowId(id)
  }, [])

  return (
    <WindowContext.Provider
      value={{
        openWindows,
        focusedWindowId,
        openWindow,
        closeWindow,
        focusWindow,
      }}
    >
      {children}
    </WindowContext.Provider>
  )
}

export function useWindowContext() {
  const context = useContext(WindowContext)

  if (context === undefined) {
    throw new Error("useWindowContext must be used within a WindowProvider")
  }

  return context
}
