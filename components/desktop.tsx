"use client"
import Image from "next/image"
import DesktopIcon from "@/components/desktop-icon"
import Window from "@/components/window"
import { useWindowContext } from "@/components/window-context"
import FinderApp from "@/components/apps/finder-app"
import DoomApp from "@/components/apps/doom-app"
import Game2048App from "@/components/apps/game-2048-app"

export default function Desktop() {
  const { openWindows, openWindow } = useWindowContext()

  return (
    <div className="relative w-full h-full pt-8">
      <Image src="/wallpaper.svg" alt="macOS Wallpaper" fill className="object-cover" priority />

      {/* Left side folders */}
      <div className="absolute grid grid-cols-1 gap-6 p-6 pt-10">
        <DesktopIcon
          icon="/folder.svg"
          label="Projects"
          onClick={() => openWindow("projects-finder", "Projects", <FinderApp initialFolder="projects" />)}
        />
        <DesktopIcon
          icon="/folder.svg"
          label="Resume"
          onClick={() => openWindow("resume-finder", "Resume", <FinderApp initialFolder="resume" />)}
        />
        <DesktopIcon
          icon="/folder.svg"
          label="Papers"
          onClick={() => openWindow("papers-finder", "Papers", <FinderApp initialFolder="papers" />)}
        />
        <DesktopIcon
          icon="/folder.svg"
          label="Reading List"
          onClick={() => openWindow("reading-finder", "Publications to Read", <FinderApp initialFolder="reading" />)}
        />
      </div>

      {/* Right side - Games */}
      <div className="absolute top-16 right-6 flex flex-col space-y-6">
        <DesktopIcon
          icon="/doom.svg"
          label="DOOM"
          onClick={() => openWindow("doom", "DOOM (1993)", <DoomApp />)}
        />
        <DesktopIcon
          icon="/2048.svg"
          label="2048"
          onClick={() => openWindow("2048", "2048", <Game2048App />)}
        />
      </div>

      {openWindows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          initialPosition={{ x: 100 + Math.random() * 100, y: 50 + Math.random() * 100 }}
        >
          {window.content}
        </Window>
      ))}
    </div>
  )
}
