"use client"
import Image from "next/image"
import DesktopIcon from "@/components/desktop-icon"
import Window from "@/components/window"
import { useWindowContext } from "@/components/window-context"
import FolderApp from "@/components/apps/folder-app"

export default function Desktop() {
  const { openWindows, openWindow } = useWindowContext()

  return (
    <div className="relative w-full h-full pt-8">
      <Image src="/wallpaper.svg" alt="macOS Wallpaper" fill className="object-cover" priority />

      <div className="absolute grid grid-cols-1 gap-6 p-6 pt-10">
        <DesktopIcon
          icon="/folder.svg"
          label="Projects"
          onClick={() => openWindow("projects-folder", "Projects", <FolderApp folderType="projects" />)}
        />
        <DesktopIcon
          icon="/folder.svg"
          label="Resume"
          onClick={() => openWindow("resume-folder", "Resume", <FolderApp folderType="resume" />)}
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
