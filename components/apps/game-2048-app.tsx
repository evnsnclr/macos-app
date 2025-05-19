"use client"

import Game2048 from "@/components/ui/game-2048"

export default function Game2048App() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#faf8ef]">
      <Game2048 />
    </div>
  )
} 