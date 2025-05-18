"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useDragControls, type PanInfo } from "framer-motion"
import { useWindowContext } from "@/components/window-context"

interface WindowProps {
  id: string
  title: string
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
}

export default function Window({ id, title, children, initialPosition = { x: 100, y: 50 } }: WindowProps) {
  const { closeWindow, focusWindow, focusedWindowId } = useWindowContext()
  const [isMaximized, setIsMaximized] = useState(false)
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState({
    width: Math.min(800, window.innerWidth * 0.9),
    height: Math.min(500, window.innerHeight * 0.8),
  })
  const [prevSize, setPrevSize] = useState({
    width: Math.min(800, window.innerWidth * 0.9),
    height: Math.min(500, window.innerHeight * 0.8),
  })
  const [prevPosition, setPrevPosition] = useState(initialPosition)

  const dragControls = useDragControls()
  const windowRef = useRef<HTMLDivElement>(null)

  const isFocused = focusedWindowId === id

  useEffect(() => {
    // Focus this window when it's created
    focusWindow(id)
  }, [id, focusWindow])

  useEffect(() => {
    const handleResize = () => {
      if (isMaximized) {
        setSize({ width: window.innerWidth, height: window.innerHeight - 40 })
      } else {
        // Adjust window size if it's larger than the screen
        if (size.width > window.innerWidth * 0.9 || size.height > window.innerHeight * 0.8) {
          setSize({
            width: Math.min(size.width, window.innerWidth * 0.9),
            height: Math.min(size.height, window.innerHeight * 0.8),
          })
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMaximized, size])

  const handleDragEnd = (event: MouseEvent, info: PanInfo) => {
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    })
  }

  const toggleMaximize = () => {
    if (isMaximized) {
      setSize(prevSize)
      setPosition(prevPosition)
    } else {
      setPrevSize(size)
      setPrevPosition(position)
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 })
      setPosition({ x: 0, y: 0 })
    }
    setIsMaximized(!isMaximized)
  }

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: position.x,
        y: position.y,
        width: isMaximized ? "100%" : size.width,
        height: isMaximized ? "calc(100% - 40px)" : size.height,
        zIndex: isFocused ? 50 : 10,
      }}
      transition={{ duration: 0.2 }}
      drag={!isMaximized}
      dragControls={dragControls}
      dragMomentum={false}
      dragListener={false}
      onDragEnd={handleDragEnd}
      onClick={() => focusWindow(id)}
      className={`absolute rounded-lg overflow-hidden shadow-2xl flex flex-col ${
        isFocused ? "ring-1 ring-white/20" : "ring-1 ring-black/10"
      }`}
    >
      {/* Window header */}
      <div
        className={`flex items-center px-3 py-2 ${isFocused ? "bg-gray-800/90" : "bg-gray-700/80"} backdrop-blur-md`}
        onPointerDown={(e) => {
          if (!isMaximized) {
            dragControls.start(e)
          }
        }}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(id)
            }}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600"
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              // Minimize functionality would go here
            }}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600"
          />
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleMaximize()
            }}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600"
          />
        </div>

        <div className="flex-1 text-sm font-medium text-center text-white truncate">{title}</div>

        <div className="w-16" />
      </div>

      {/* Window content */}
      <div className="flex-1 overflow-auto bg-white">{children}</div>
    </motion.div>
  )
}
