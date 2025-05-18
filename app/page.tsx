"use client"

import { useState, useEffect } from "react"
import Desktop from "@/components/desktop"
import Dock from "@/components/dock"
import LoginScreen from "@/components/login-screen"
import { WindowProvider } from "@/components/window-context"
import MenuBar from "@/components/menu-bar"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black">
        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <WindowProvider>
      <div className="relative w-screen h-screen overflow-hidden">
        <MenuBar />
        <Desktop />
        <Dock />
      </div>
    </WindowProvider>
  )
}
