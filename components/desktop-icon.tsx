"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useDarkMode } from "@/components/dark-mode-context"

interface DesktopIconProps {
  icon: string
  label: string
  onClick: () => void
}

export default function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false)
  const { isDarkMode } = useDarkMode()

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        setIsSelected(true)
        onClick()
        setTimeout(() => setIsSelected(false), 500)
      }}
      className="flex flex-col items-center w-24 group"
    >
      <div className={`p-2 rounded-md ${
        isSelected 
          ? "bg-blue-500/30" 
          : isDarkMode
            ? "bg-transparent group-hover:bg-gray-300/10"
            : "bg-transparent group-hover:bg-white/10"
      }`}>
        <Image src={icon || "/placeholder.svg"} alt={label} width={48} height={48} className="object-contain" />
      </div>
      <div
        className={`mt-1 px-2 py-0.5 text-xs text-center text-white rounded ${
          isSelected 
            ? "bg-blue-500" 
            : isDarkMode
              ? "bg-transparent group-hover:bg-gray-300/10"
              : "bg-transparent group-hover:bg-white/10"
        }`}
      >
        {label}
      </div>
    </motion.div>
  )
}
