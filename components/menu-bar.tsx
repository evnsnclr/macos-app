"use client"

import { useState, useEffect } from "react"
import { Wifi, Battery, Volume2 } from "lucide-react"

export default function MenuBar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeApp, setActiveApp] = useState("Evan Sinclair Smith")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-8 px-2 text-black bg-white/0 backdrop-blur-md">
      {/* Left side - Apple logo and menus */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-8 h-8">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M11.6734 8.20511C11.6734 6.51796 13.0405 5.80526 13.1095 5.76825C12.2615 4.55608 10.9635 4.38407 10.4945 4.36556C9.35246 4.25005 8.24841 5.03574 7.67041 5.03574C7.0739 5.03574 6.17688 4.38407 5.21686 4.40258C3.97768 4.42109 2.82263 5.12454 2.19762 6.22156C0.91044 8.43462 1.87046 11.7047 3.10964 13.3549C3.72539 14.1591 4.45659 15.0746 5.40735 15.0376C6.33961 14.9961 6.71262 14.4241 7.83917 14.4241C8.94747 14.4241 9.30197 15.0376 10.2897 15.0161C11.3055 14.9961 11.9397 14.1776 12.537 13.3734C13.2312 12.4579 13.5122 11.5609 13.5307 11.5239C13.5122 11.5054 11.6919 10.8167 11.6734 8.20511Z"
              fill="currentColor"
            />
            <path
              d="M10.3885 2.76825C10.8945 2.14324 11.2305 1.28322 11.1245 0.404694C10.3885 0.441704 9.48324 0.922208 8.95874 1.52872C8.48973 2.07172 8.08823 2.96874 8.21299 3.81026C9.03601 3.87576 9.86327 3.37526 10.3885 2.76825Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="font-semibold">{activeApp}</div>

        <div className="hidden md:flex items-center space-x-4 text-sm">
          <div className="cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded">File</div>
          <div className="cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded">Edit</div>
          <div className="cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded">View</div>
          <div className="cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded">Window</div>
          <div className="cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded">Help</div>
        </div>
      </div>

      {/* Right side - Status icons */}
      <div className="flex items-center space-x-2 text-sm">
        <div className="hidden sm:flex items-center space-x-2">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
        </div>
        <div className="flex items-center space-x-2">
          <div>{formatDate(currentTime)}</div>
          <div>{formatTime(currentTime)}</div>
        </div>
      </div>
    </div>
  )
}
