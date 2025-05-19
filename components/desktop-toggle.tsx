"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useDarkMode } from "@/components/dark-mode-context"

export default function DesktopToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    setIsSelected(true)
    toggleDarkMode()
    setTimeout(() => setIsSelected(false), 500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.3 }}
      className="flex flex-col items-center w-24 group cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`p-2 rounded-md ${
        isSelected ? "bg-blue-500/30" : 
        isDarkMode ? "bg-transparent group-hover:bg-white/10" : 
        "bg-transparent group-hover:bg-white/20"
      }`}>
        <div className="w-12 h-12 flex items-center justify-center">
          {isDarkMode ? (
            <Sun className="w-10 h-10 text-yellow-300 drop-shadow" />
          ) : (
            <Moon className="w-10 h-10 text-blue-400 drop-shadow" />
          )}
        </div>
      </div>
      <div className={`mt-1 px-2 py-0.5 text-xs text-center text-white rounded ${
        isSelected ? "bg-blue-500" : "bg-transparent group-hover:bg-white/10"
      }`}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </div>
    </motion.div>
  )
} 