"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface DockIconProps {
  icon: string
  label: string
  onClick: () => void
}

export default function DockIcon({ icon, label, onClick }: DockIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative group flex flex-col items-center">
      <motion.div
        whileHover={{ y: -10, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-all cursor-pointer"
      >
        <Image src={icon || "/placeholder.svg"} alt={label} width={56} height={56} className="object-contain w-full h-full" />

        {/* Reflection effect */}
        <div className="absolute bottom-0 w-7 h-1.5 sm:w-9 sm:h-2 md:w-11 md:h-3 bg-white/20 rounded-full blur-sm transform scale-x-75" />
      </motion.div>

      {/* Label tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2.5 py-1 text-xs font-medium text-white bg-black/80 backdrop-blur-sm rounded-md whitespace-nowrap shadow-sm">
          {label}
        </div>
      )}
    </div>
  )
}
