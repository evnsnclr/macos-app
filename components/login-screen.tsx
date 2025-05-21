"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface LoginScreenProps {
  onLogin: () => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username] = useState("Portfolio User")
  const [password, setPassword] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin()
  }

  useEffect(() => {
    // Auto-login after a brief delay
    const timer = setTimeout(() => {
      onLogin()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onLogin])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden"
      onClick={onLogin}
    >
      <Image src="/wallpaper.svg" alt="macOS Wallpaper" fill className="object-cover" priority />

      <div className="absolute inset-0 bg-black/20" />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="z-10 flex flex-col items-center mb-8 text-white"
      >
        <div className="text-5xl font-light">{formatTime(currentTime)}</div>
        <div className="mt-2 text-lg">{formatDate(currentTime)}</div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="z-10 flex flex-col items-center"
      >
        <div className="w-24 h-24 mb-4 overflow-hidden bg-gray-200 rounded-full">
          <div className="flex items-center justify-center w-full h-full text-4xl bg-gradient-to-br from-blue-500 to-purple-600">
            {username.charAt(0)}
          </div>
        </div>

        <div className="mb-4 text-xl font-medium text-white">{username}</div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Click anywhere to login"
            className="w-64 px-4 py-2 mb-4 text-black bg-white/80 backdrop-blur rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="px-6 py-2 text-white transition-colors bg-white/30 backdrop-blur rounded-md hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-sm text-white/70">Click anywhere or press any key to login</div>
      </motion.div>
    </motion.div>
  )
}
