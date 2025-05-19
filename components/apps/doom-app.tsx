"use client"

import { useEffect, useRef } from "react"

export default function DoomApp() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  
  useEffect(() => {
    // Focus the iframe when the component mounts
    if (iframeRef.current) {
      iframeRef.current.focus()
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="flex justify-between items-center p-2 bg-gray-800">
        <h2 className="text-sm font-bold">DOOM (1993)</h2>
        <div className="text-xs text-gray-400">
          Move: Arrow Keys | Fire: Ctrl | Use: Space | Weapon: 1-9
        </div>
      </div>
      
      <div className="flex-1 w-full h-full overflow-hidden">
        <iframe
          ref={iframeRef}
          src="https://js-dos.com/DOOM/"
          className="w-full h-full border-0"
          allow="fullscreen"
          title="DOOM"
        />
      </div>
      
      <div className="p-2 bg-gray-800 text-xs text-center">
        <p>
          Pro tip: Click inside the game to capture keyboard input. 
          Press <kbd className="bg-gray-700 px-1 rounded">ESC</kbd> to access the menu.
        </p>
      </div>
    </div>
  )
} 